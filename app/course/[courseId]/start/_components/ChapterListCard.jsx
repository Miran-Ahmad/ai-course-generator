import React from "react";
import { HiOutlineClock } from "react-icons/hi2";

function ChapterListCard({ chapter, index }) {
  return (
    <div className="grid grid-cols-5 p-4 md:p-5 items-center border-b border-border hover:bg-muted/50 transition-colors">
      <div>
        <h2 className="p-1 bg-primary text-primary-foreground rounded-full w-8 h-8 md:w-10 md:h-10 text-center flex items-center justify-center font-semibold text-sm md:text-base">
          {index + 1}
        </h2>
      </div>
      <div className="col-span-4">
        <h2 className="font-semibold text-base md:text-lg text-foreground mb-1">{chapter?.name}</h2>
        <h2 className="flex items-center gap-2 text-sm md:text-base text-primary font-medium">
          <HiOutlineClock className="w-4 h-4" />
          {chapter?.duration}
        </h2>
      </div>
    </div>
  );
}

export default ChapterListCard;
