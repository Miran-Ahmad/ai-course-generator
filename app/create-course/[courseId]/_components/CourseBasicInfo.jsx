import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

const CourseBasicInfo = ({ course, refreshData, edit = true }) => {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "aicoursegenerator");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx3vqbb9r/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImageData = await res.json();
    // console.log(uploadedImageData);
    setSelectedFile(uploadedImageData.secure_url);
    const imgUrl = uploadedImageData.secure_url;
    await db
      .update(CourseList)
      .set({ courseBanner: imgUrl })
      .where(eq(CourseList.id, course?.id));
    // console.log("Course banner updated successfully!");
  };

  return (
    <div className="p-8 md:p-10 border border-border rounded-xl shadow-sm bg-card mt-5 hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl text-foreground leading-tight mb-4">
              {course?.courseOutput?.course?.name}{" "}
              {edit && (
                <EditCourseBasicInfo
                  course={course}
                  refreshData={() => refreshData(true)}
                />
              )}
            </h2>
            <p className="text-base text-muted-foreground mt-3 leading-relaxed">
              {course?.courseOutput?.course?.description}
            </p>
            <h2 className="font-medium mt-4 flex gap-2 items-center text-primary text-lg">
              <HiOutlinePuzzlePiece className="w-5 h-5" /> {course?.category}
            </h2>
          </div>
          {!edit && (
            <Link href={"/course/" + course?.courseId + "/start"} className="mt-6">
              <Button className="w-full md:w-auto cursor-pointer" size="lg">Start Course</Button>
            </Link>
          )}
        </div>
        <div>
          <label htmlFor="upload-image" className="block">
            <Image
              src={selectedFile ? selectedFile : "/course-cover.svg"}
              width={600}
              height={300}
              alt="Course Banner"
              className="w-full rounded-xl h-[250px] md:h-[300px] object-cover cursor-pointer hover:opacity-90 transition-opacity border border-border"
            />
            {edit && (
              <input
                type="file"
                id="upload-image"
                className="hidden"
                onChange={onFileSelected}
                accept="image/*"
              />
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
