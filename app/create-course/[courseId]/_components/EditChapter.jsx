import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
const EditChapter = ({ course, index, refreshData }) => {
  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const chapters = course?.courseOutput?.course?.chapters;

  useEffect(() => {
    setName(chapters[index].name);
    setAbout(chapters[index].about);
  }, [course]);
  const onUpdateHandler = async () => {
    course.courseOutput.course.chapters[index].name = name;
    course.courseOutput.course.chapters[index].about = about;

    // console.log(course);
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });

    //   console.log(result);
    refreshData(true);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Course Chapter</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            <div className="mt-4 space-y-2">
              <label htmlFor="chapter-title" className="text-sm font-medium text-foreground block">Chapter Title</label>
              <Input
                id="chapter-title"
                defaultValue={chapters[index].name}
                onChange={(e) => setName(e?.target.value)}
                className="text-base"
              />
            </div>
            <div className="mt-4 space-y-2">
              <label htmlFor="chapter-description" className="text-sm font-medium text-foreground block">Chapter Description</label>
              <Textarea
                id="chapter-description"
                className="h-40 text-base"
                defaultValue={chapters[index].about}
                onChange={(e) => setAbout(e?.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChapter;
