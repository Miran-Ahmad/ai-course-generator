"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState, useCallback } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const { user, isLoaded } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const router = useRouter();

  const courseId = params?.courseId;

  const GetCourse = useCallback(async () => {
    console.log("GetCourse called with:", {
      courseId,
      isLoaded,
      hasUser: !!user,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      params: params
    });

    if (!courseId) {
      console.warn("No courseId available");
      setDataLoading(false);
      return;
    }

    if (!isLoaded) {
      console.log("Waiting for user to load...");
      return;
    }

    if (!user?.primaryEmailAddress?.emailAddress) {
      console.warn("User email not available");
      setDataLoading(false);
      return;
    }

    try {
      setDataLoading(true);
      console.log("Fetching course with:", {
        courseId: courseId,
        userEmail: user.primaryEmailAddress.emailAddress
      });
      
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, courseId),
            eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress)
          )
        );
      
      console.log("Course query result:", result);
      console.log("Full course data structure:", JSON.stringify(result, null, 2));
      
      if (result && result.length > 0) {
        const courseData = result[0];
        console.log("Course data details:", {
          id: courseData.id,
          courseId: courseData.courseId,
          name: courseData.name,
          category: courseData.category,
          level: courseData.level,
          courseOutput: courseData.courseOutput,
          courseOutputType: typeof courseData.courseOutput,
          courseOutputKeys: courseData.courseOutput ? Object.keys(courseData.courseOutput) : null,
          hasCourseOutput: !!courseData.courseOutput,
          courseOutputCourse: courseData.courseOutput?.course
        });
        
        // Ensure courseOutput is properly parsed if it's a string
        if (typeof courseData.courseOutput === 'string') {
          try {
            courseData.courseOutput = JSON.parse(courseData.courseOutput);
            console.log("Parsed courseOutput:", courseData.courseOutput);
          } catch (e) {
            console.error("Error parsing courseOutput:", e);
          }
        }
        
        // Normalize the data structure - fix case sensitivity issues
        if (courseData.courseOutput?.course) {
          // Fix Chapters vs chapters case mismatch
          if (courseData.courseOutput.course.Chapters && !courseData.courseOutput.course.chapters) {
            courseData.courseOutput.course.chapters = courseData.courseOutput.course.Chapters;
            delete courseData.courseOutput.course.Chapters; // Remove the old key
            console.log("Normalized Chapters to chapters, count:", courseData.courseOutput.course.chapters?.length);
          }
          // Also ensure chapters exists (fallback)
          if (!courseData.courseOutput.course.chapters && courseData.courseOutput.course.Chapters) {
            courseData.courseOutput.course.chapters = courseData.courseOutput.course.Chapters;
          }
        }
        
        console.log("Setting course with data:", courseData);
        setCourse(courseData);
        console.log("Course set successfully, course state:", courseData);
      } else {
        console.warn("No course found with the given criteria");
        // Try querying without user filter to see if course exists
        try {
          const courseWithoutUserFilter = await db
            .select()
            .from(CourseList)
            .where(eq(CourseList.courseId, courseId));
          console.log("Course without user filter:", courseWithoutUserFilter);
          if (courseWithoutUserFilter && courseWithoutUserFilter.length > 0) {
            console.warn("Course exists but belongs to different user:", {
              courseCreatedBy: courseWithoutUserFilter[0].createdBy,
              currentUser: user.primaryEmailAddress.emailAddress
            });
          }
        } catch (e) {
          console.error("Error checking course without user filter:", e);
        }
        setCourse(null);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      setCourse(null);
    } finally {
      setDataLoading(false);
    }
  }, [courseId, isLoaded, user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    GetCourse();
  }, [GetCourse]);

  // Debug: Log when course state changes
  useEffect(() => {
    console.log("Course state changed:", course);
    if (course) {
      console.log("Course is available, should render content");
    }
  }, [course]);

  const GenerateChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.course?.chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT =
        "Explain the concept in Detail on Topic: " +
        course?.name +
        ", Chapter: " +
        chapter?.name +
        ", in JSON Format with list of array with field as title, explaination on given chapter in detail, Code Example(Code field in <predoce> format) if applicable";
      console.log(PROMPT);
      // if (index < 3) {
      try {
        let videoId = "";
        //Generate video url
        service.getVideos(course?.name + ":" + chapter?.name).then((resp) => {
          console.log(resp);
          videoId = resp[0]?.id?.videoId;
        });
        //generate content
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        console.log(result?.response?.text());

        const content = JSON.parse(result?.response?.text());

        //save chapter contet+url
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
      await db.update(CourseList).set({
        publish: true,
      });
      router.replace("/create-course/" + course?.courseId + "/finish");
      // }
    });
  };

  console.log("Render check - dataLoading:", dataLoading, "course:", course);

  if (dataLoading) {
    return (
      <div className="min-h-screen w-full mt-10 px-7 md:px-20 lg:px-44 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-bold text-2xl mb-4 text-foreground">Loading course data...</h2>
          <p className="text-muted-foreground text-base leading-relaxed">Please wait while we fetch your course information.</p>
        </div>
      </div>
    );
  }

  if (!course) {
    console.log("No course found, showing error message");
    return (
      <div className="min-h-screen w-full mt-10 px-7 md:px-20 lg:px-44 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="font-bold text-2xl mb-4 text-foreground">Course not found</h2>
          <p className="text-muted-foreground mb-4 text-base leading-relaxed">
            The course with ID {params?.courseId} could not be found or you don't have access to it.
          </p>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Check the browser console for detailed error information.
          </p>
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  console.log("Rendering with course:", course);
  console.log("Course output check:", {
    hasCourse: !!course,
    hasCourseOutput: !!course?.courseOutput,
    hasCourseOutputCourse: !!course?.courseOutput?.course,
    courseName: course?.courseOutput?.course?.name,
    chapters: course?.courseOutput?.course?.chapters || course?.courseOutput?.course?.Chapters,
    dataLoading: dataLoading
  });

  // If we have course data, render it
  if (course) {
    return (
      <div className="min-h-screen w-full py-10 px-7 md:px-20 lg:px-44 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-center text-3xl mb-8 text-foreground">Course Layout</h2>
          <LoadingDialog loading={loading} />
          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-muted rounded-lg text-sm border border-border">
              <strong className="font-semibold text-foreground">Debug:</strong> 
              <span className="text-muted-foreground ml-2">
                Course loaded: {course?.courseId} | 
                Name: {course?.courseOutput?.course?.name || 'N/A'} |
                Chapters: {(course?.courseOutput?.course?.chapters || course?.courseOutput?.course?.Chapters)?.length || 0}
              </span>
            </div>
          )}
          {/* basic info  */}
          <CourseBasicInfo course={course} refreshData={GetCourse} />

          {/* course details  */}
          <CourseDetail course={course} />

          {/* list pf lession  */}
          <ChapterList course={course} refreshData={GetCourse} />

          <div className="flex justify-center my-12">
            <Button onClick={GenerateChapterContent} size="lg" className="px-8 py-6 text-base">
              Generate Course Content
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // This shouldn't be reached if course is set, but just in case
  return null;
}

export default CourseLayout;
