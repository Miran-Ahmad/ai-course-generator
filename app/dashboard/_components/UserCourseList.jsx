"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import CourseCard from "./CourseCard";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );

  const { user } = useUser();

  const getUserCourses = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setCourseList(result);
    setUserCourseList(result);
  };

  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  return (
    <div className="mt-10 px-4 md:px-6">
      <h2 className="font-semibold text-xl md:text-2xl text-foreground mb-6">My AI Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {courseList?.length > 0
          ? courseList?.map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                refreshData={() => getUserCourses()}
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full mt-5 bg-muted animate-pulse rounded-lg h-[320px] border border-border"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default UserCourseList;
