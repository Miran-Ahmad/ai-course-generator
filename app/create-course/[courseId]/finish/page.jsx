"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function FinishScreen({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const router = useRouter();
  useEffect(() => {
    console.log(params);
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
  };

  return (
    <div className="px-6 md:px-10 lg:px-20 xl:px-44 my-7 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 mb-8">
        <h2 className="text-center font-bold text-2xl md:text-3xl text-foreground">
          Congratulations! Your course is ready
        </h2>
        <Link href={"/dashboard"}>
          <Button className="bg-gradient-to-r from-[#4F46E5] to-[#9333EA] text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-all">
            Go to Dashboard
          </Button>
        </Link>
      </div>
      <CourseBasicInfo course={course} refreshData={() => console.log()} edit={false} />
      <div className="mt-6 space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Course URL</h2>
        <div className="text-center text-muted-foreground border border-border p-4 rounded-lg flex flex-col sm:flex-row gap-3 items-center justify-center bg-card">
          <span className="font-mono text-sm md:text-base">
            {process.env.NEXT_PUBLIC_HOST_NAME || window.location.origin}/course/{course?.courseId}
          </span>
          <HiOutlineClipboardDocumentCheck
            className="h-5 w-5 cursor-pointer text-primary hover:text-primary/80 transition-colors"
            onClick={async () =>
              await navigator.clipboard.writeText(
                (process.env.NEXT_PUBLIC_HOST_NAME || window.location.origin) + "/course/" + course?.courseId
              )
            }
          />
          <p className="text-sm text-muted-foreground">(Click icon to copy and start learning.)</p>
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;
