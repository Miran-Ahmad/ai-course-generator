import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleInputChange = (fieldname, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldname]: value,
    }));
  };

  return (
    <div className="mx-4 md:mx-10 lg:mx-20 xl:mx-44 max-w-3xl">
      {/* Input  Topic */}
      <div className="mt-5 space-y-2">
        <label className="text-base md:text-lg font-medium text-foreground block">
          💡 Write a topic for which you want to generate a course (e.g., Python Course, Yoga, etc.)
        </label>
        <Input
          className="h-12 md:h-14 text-base md:text-lg"
          placeholder="Enter course topic"
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>
      {/* TextArea  */}
      <div className="mt-6 space-y-2">
        <label htmlFor="course-description" className="text-base md:text-lg font-medium text-foreground block">
          🔥 Tell us more about your course. What do you want to include in the course? (Optional)
        </label>
        <Textarea
          id="course-description"
          placeholder="Describe your course..."
          className="h-32 md:h-40 text-base md:text-lg"
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TopicDescription;
