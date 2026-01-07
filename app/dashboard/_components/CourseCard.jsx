import Image from "next/image";
import React from "react";
import { HiMiniEllipsisVertical, HiOutlineBookOpen } from "react-icons/hi2";
import DropdownOption from "./DropdownOption";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/configs/db";

function CourseCard({ course, refreshData, displayUser = false }) {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      refreshData();
    }
  };
  return (
    <div
      className="shadow-sm rounded-lg border border-border bg-card p-3 md:p-4 cursor-pointer mt-4 hover:shadow-md transition-all"
    >
      <Link href={"/course/" + course?.courseId}>
        <Image
          src={course?.courseBanner}
          width={300}
          height={200}
          alt="Course banner"
          className="w-full h-[200px] object-cover rounded-lg mb-3"
        />
      </Link>
      <div className="p-2">
        <h2 className="text-base md:text-lg font-semibold flex justify-between items-start gap-2 text-foreground mb-2 leading-tight">
          <span className="flex-1">{course?.courseOutput?.course?.name}</span>
          {!displayUser && (
            <DropdownOption handleOnDelete={() => handleOnDelete()}>
              <HiMiniEllipsisVertical className="text-muted-foreground hover:text-foreground" />
            </DropdownOption>
          )}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground my-2 font-medium">{course?.category}</p>

        <div className="flex items-center justify-between mt-3">
          <h2 className="flex gap-2 items-center px-2 py-1 bg-primary/10 text-primary text-sm rounded-md font-medium">
            <HiOutlineBookOpen className="w-4 h-4" />
            {course?.courseOutput?.course?.chapters?.length || 0} Chapters
          </h2>
          <h2 className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
            {course?.level}
          </h2>
        </div>
        {displayUser && (
          <div className="flex gap-2 items-center mt-3 pt-3 border-t border-border">
            <Image
              src={course?.userProfileImage}
              width={35}
              height={35}
              alt="User profile"
              className="rounded-full"
            />
            <h2 className="text-sm text-foreground font-medium">{course?.userName}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
