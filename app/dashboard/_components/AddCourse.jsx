"use client";

import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useContext } from "react";

function AddCourse() {
  const { user } = useUser();
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 md:px-6 py-6">
      <div>
        <h2 className="text-2xl md:text-3xl text-foreground">
          Hello <span className="font-bold">{user?.fullName}</span>
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          Create new Course with AI and learn.
        </p>
      </div>
      <Link
        href={
          userCourseList?.length > 2 ? "/dashboard/upgrade" : "/create-course"
        }
      >
        <Button className="bg-gradient-to-r from-[#4F46E5] to-[#9333EA] text-white font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-all">
          + Create AI Course
        </Button>
      </Link>
    </div>
  );
}

export default AddCourse;
