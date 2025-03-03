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
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.course?.name}{" "}
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />
            )}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.course?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            {" "}
            <HiOutlinePuzzlePiece /> {course?.category}
          </h2>
          {!edit &&<Link href={"/course/" + course?.courseId + "/start"}>
            <Button className="w-full mt-5 cursor-pointer">Start</Button>
          </Link>}
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : "/course-cover.svg"}
              width={600}
              height={300}
              alt="Course Banner"
              className="w-ful rounded-xl h-[250px] object-cover cursor-pointer"
            />
            {edit && (
              <input
                type="file"
                id="upload-image"
                className="opacity-0"
                onChange={onFileSelected}
              />
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
