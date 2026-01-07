import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlinePlay,
} from "react-icons/hi";

const CourseDetail = ({ course }) => {
  return (
    <div className="p-6 md:p-8 border border-border rounded-xl shadow-sm bg-card mt-5 hover:shadow-md transition-shadow">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div className="flex gap-3 items-start">
          <HiOutlineChartBar className="text-4xl md:text-5xl text-primary flex-shrink-0" />
          <div>
            <h2 className="text-xs md:text-sm text-muted-foreground font-medium mb-1">Skill Level</h2>
            <h2 className="font-semibold text-base md:text-lg text-foreground">{course?.level}</h2>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <HiOutlineClock className="text-4xl md:text-5xl text-primary flex-shrink-0" />
          <div>
            <h2 className="text-xs md:text-sm text-muted-foreground font-medium mb-1">Duration</h2>
            <h2 className="font-semibold text-base md:text-lg text-foreground">
              {course?.courseOutput?.course?.duration}
            </h2>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <HiOutlineBookOpen className="text-4xl md:text-5xl text-primary flex-shrink-0" />
          <div>
            <h2 className="text-xs md:text-sm text-muted-foreground font-medium mb-1">Chapters</h2>
            <h2 className="font-semibold text-base md:text-lg text-foreground">
              {(course?.courseOutput?.course?.chapters || course?.courseOutput?.course?.Chapters)?.length || 0}
            </h2>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <HiOutlinePlay className="text-4xl md:text-5xl text-primary flex-shrink-0" />
          <div>
            <h2 className="text-xs md:text-sm text-muted-foreground font-medium mb-1">Include Video</h2>
            <h2 className="font-semibold text-base md:text-lg text-foreground">{course?.includeVideo ? 'Yes' : 'No'}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
