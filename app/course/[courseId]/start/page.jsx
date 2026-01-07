"use client";

import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import Header from "./_components/Header";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();
  const [chaptersList, setChaptersList] = useState([]);

  useEffect(() => {
    GetCourse();
  }, []);

  //use to get course info by course id
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    console.log("Course data:", result);
    const courseData = result[0];
    setCourse(courseData);
    
    if (courseData) {
      // Fetch all chapters from the database
      await GetAllChapters(courseData.courseId, courseData);
    }
  };

  // Fetch all chapters from database and merge with metadata
  const GetAllChapters = async (courseId, courseData) => {
    try {
      // Get chapters from database
      const dbChapters = await db
        .select()
        .from(Chapters)
        .where(eq(Chapters.courseId, courseId));
      
      // Sort by chapterId
      dbChapters.sort((a, b) => a.chapterId - b.chapterId);
      
      console.log("DB Chapters:", dbChapters);
      
      // Get chapter metadata from courseOutput JSON
      const chaptersMetadata = courseData?.courseOutput?.course?.chapters || 
                               courseData?.courseOutput?.course?.Chapters || 
                               [];
      
      console.log("Chapters metadata:", chaptersMetadata);
      
      // Merge database chapters with metadata
      const mergedChapters = dbChapters.map((dbChapter) => {
        const metadata = chaptersMetadata[dbChapter.chapterId] || {};
        return {
          ...metadata,
          chapterId: dbChapter.chapterId,
          content: dbChapter.content,
          videoId: dbChapter.videoId,
        };
      });
      
      // If no DB chapters but we have metadata, use metadata
      const finalChapters = mergedChapters.length > 0 
        ? mergedChapters 
        : chaptersMetadata.map((meta, index) => ({
            ...meta,
            chapterId: index,
          }));
      
      console.log("Final chapters list:", finalChapters);
      setChaptersList(finalChapters);
      
      // Set first chapter if available
      if (finalChapters.length > 0) {
        const firstChapter = finalChapters[0];
        setSelectedChapter(firstChapter);
        // Load first chapter content
        GetSelectedChapterContent(firstChapter.chapterId ?? 0, courseId);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
      // Fallback to JSON chapters if DB fetch fails
      const chaptersMetadata = courseData?.courseOutput?.course?.chapters || 
                               courseData?.courseOutput?.course?.Chapters || 
                               [];
      setChaptersList(chaptersMetadata);
      if (chaptersMetadata.length > 0) {
        const firstChapter = chaptersMetadata[0];
        setSelectedChapter(firstChapter);
        // Load first chapter content
        GetSelectedChapterContent(firstChapter.chapterId ?? 0, courseId);
      }
    }
  };

  const GetSelectedChapterContent = async (chapterId, courseIdParam) => {
    const courseIdToUse = courseIdParam || course?.courseId;
    if (!courseIdToUse) return;
    
    console.log("Fetching chapter content:", { chapterId, courseId: courseIdToUse });
    
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.chapterId, chapterId),
          eq(Chapters.courseId, courseIdToUse)
        )
      );
    
    console.log("Chapter content result:", result);
    console.log("VideoId for this chapter:", result[0]?.videoId);
    
    setChapterContent(result[0]);
  };

  return (
    <div>
      <Header/>
      {/* Chapter List Sidebar */}
      <div className="fixed md:w-64 hidden md:block top-0 left-0 h-full border-r border-border shadow-sm bg-card">
        <h2 className="font-semibold text-base md:text-lg bg-muted p-4 border-b border-border sticky top-0 z-10 text-foreground">
          {course?.courseOutput?.course?.name}
        </h2>
        <div className="h-[calc(100vh-73px)] overflow-y-auto overflow-x-hidden">
          {chaptersList.length > 0 ? (
            chaptersList.map((chapter, index) => (
              <div
                key={chapter?.chapterId ?? index}
                className={`cursor-pointer hover:bg-muted transition-colors ${
                  selectedChapter?.name == chapter?.name && "bg-primary/10 border-l-2 border-l-primary"
                } `}
                onClick={() => {
                  console.log("Chapter clicked:", { chapter, chapterId: chapter?.chapterId, index });
                  // Clear previous content to prevent showing stale video
                  setChapterContent(null);
                  setSelectedChapter(chapter);
                  // Use chapterId from the merged chapter data, fallback to index
                  const chapterIdToFetch = chapter?.chapterId !== undefined ? chapter.chapterId : index;
                  GetSelectedChapterContent(chapterIdToFetch, course?.courseId);
                }}
              >
                <ChapterListCard chapter={chapter} index={index} />
              </div>
            ))
          ) : (
            <div className="p-4 text-muted-foreground text-sm">No chapters available</div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
