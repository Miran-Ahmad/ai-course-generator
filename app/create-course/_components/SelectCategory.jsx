import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };
  return (
    <div className="px-4 md:px-10 lg:px-20">
      <h2 className="my-5 text-xl md:text-2xl font-semibold text-foreground">Select the course category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
        {CategoryList.map((item, index) => (
          <div key={item.id}
            className={`flex flex-col p-5 md:p-6 border border-border items-center rounded-xl hover:border-primary hover:bg-primary/5 cursor-pointer transition-all ${
              userCourseInput?.category == item.name &&
              "border-primary bg-primary/10 shadow-md"
            } `}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} rel={"category"} width={50} height={50} alt={item.name} className="mb-3" />
            <h2 className="font-medium text-base md:text-lg text-foreground text-center">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
