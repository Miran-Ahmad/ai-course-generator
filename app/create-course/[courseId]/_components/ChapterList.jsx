import React from "react";
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi";
import EditChapter from "./EditChapter";

const ChapterList = ({ course, refreshData, edit = true }) => {
  return (
    <div className="mt-6">
      <h2 className="font-semibold text-xl md:text-2xl text-foreground mb-4">Chapters</h2>
      <div className="space-y-3">
        {(course?.courseOutput?.course?.chapters || course?.courseOutput?.course?.Chapters)?.map((chapter, index) => (
          <div key={index} className="p-5 md:p-6 border border-border rounded-lg bg-card hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-4 md:gap-5 items-start flex-1">
                <div className="bg-primary/10 text-primary flex-none h-12 w-12 rounded-full flex items-center justify-center font-semibold text-base">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-base md:text-lg text-foreground mb-2 flex items-center gap-2">
                    {chapter?.name}
                    {edit && (
                      <EditChapter
                        index={index}
                        course={course}
                        refreshData={() => refreshData(true)}
                      />
                    )}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-2 leading-relaxed">{chapter?.about}</p>
                  <p className="flex gap-2 text-primary items-center text-sm md:text-base font-medium">
                    <HiOutlineClock className="w-4 h-4" /> {chapter?.duration}
                  </p>
                </div>
              </div>
              <HiOutlineCheckCircle className="text-3xl md:text-4xl flex-none text-muted-foreground/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
