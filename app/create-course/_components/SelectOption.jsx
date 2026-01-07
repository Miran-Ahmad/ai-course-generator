import React, { useContext } from "react";
import { UserInputContext } from "@/app/_context/UserInputContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleInputChange = (fieldname, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldname]: value,
    }));
  };
  return (
    <div className="px-4 md:px-10 lg:px-20 xl:px-44 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-2">
          <label className="text-sm md:text-base font-medium text-foreground block">Difficulty Level</label>
          <Select
            onValueChange={(value) => handleInputChange("level", value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger className="h-11 md:h-12">
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm md:text-base font-medium text-foreground block">Course Duration</label>
          <Select
            onValueChange={(value) => handleInputChange("duration", value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger className="h-11 md:h-12">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 hour">1 hour</SelectItem>
              <SelectItem value="2 hours">2 hours</SelectItem>
              <SelectItem value="More than 3 hours">More than 3 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm md:text-base font-medium text-foreground block">Include Video</label>
          <Select
            onValueChange={(value) => handleInputChange("displayVideo", value)}
            defaultValue={userCourseInput?.displayVideo}
          >
            <SelectTrigger className="h-11 md:h-12">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm md:text-base font-medium text-foreground block">No. of Chapters</label>
          <Input
            onChange={(e) => handleInputChange("noOfChapter", e.target.value)}
            defaultValue={userCourseInput?.noOfChapter}
            type="number"
            placeholder="Enter number of chapters"
            className="h-11 md:h-12 text-base"
            min="1"
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
