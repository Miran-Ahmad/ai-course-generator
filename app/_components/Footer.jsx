"use client";
import { FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";
import { SignUp } from "@clerk/nextjs";

const Footer = () => {
  const path = usePathname();
  const menu = [
    { id: 1, name: "About Us", path: "/about" },
    { id: 2, name: "Terms & Conditions", path: "/terms" },
  ];

  const words = [
    { text: "Build" },
    { text: "\u00A0" }, // Non-breaking space
    { text: "awesome" },
    { text: "\u00A0" },
    { text: "courses" },
    { text: "\u00A0" },
    { text: "with" },
    { text: "\u00A0" },
    { text: "Edvance", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <footer className="mt-0 bg-white dark:bg-gray-900 p-10">
      <div>
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
            The road to freedom starts from here
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-1 md:space-x-4">
            <Link href={"/create-course"}>
              <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                Create Course
              </button>
            </Link>
            <Link href={"/dashboard"}>
              <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <div className="pt-16 border-t border-gray-100 sm:flex sm:items-center sm:justify-between dark:border-gray-800">
          <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
            {menu.map((item, index) => (
              <Link href={item.path} key={item.id}>
                <li className="text-muted-foreground text-sm transition hover:text-foreground font-medium">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
            {/* <li></li>
            <li></li> */}
            <li>
              <a
                href="https://github.com/sauravney"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">GitHub</span>

                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/mdmiranahmad/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 text-2xl transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
