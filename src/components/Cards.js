import { arrow } from "@popperjs/core";
import React from "react";
import { Link } from "react-router-dom";

function Cards() {
  var courses = [
    {
      image:
        "https://via.placeholder.com/300x200/1abc9c/ffffff?text=Full-Stack+Web+Development",
      name: "Full-Stack Web Development",
      description:
        "Learn how to build complete web applications from front to back using HTML, CSS, JavaScript, and popular frameworks such as React and Node.js.",
    },
    {
      image:
        "https://via.placeholder.com/300x200/2ecc71/ffffff?text=JavaScript+Fundamentals",
      name: "JavaScript Fundamentals",
      description:
        "Develop a strong understanding of JavaScript, including its syntax, data types, and functional programming concepts, to create dynamic and interactive web pages.",
    },
    {
      image:
        "https://via.placeholder.com/300x200/3498db/ffffff?text=CSS+and+Design",
      name: "CSS and Design",
      description:
        "Explore the power of CSS to create beautiful and responsive web designs. Learn how to use CSS selectors, properties, and animations to enhance the user experience.",
    },
    {
      image:
        "https://via.placeholder.com/300x200/9b59b6/ffffff?text=React+Native",
      name: "React Native",
      description:
        "Build native mobile apps for iOS and Android using React Native. Learn how to use React components, hooks, and the Redux state management library to create a seamless user experience.",
    },
    {
      image:
        "https://via.placeholder.com/300x200/f1c40f/ffffff?text=Responsive+Web+Design",
      name: "Responsive Web Design",
      description:
        "Discover how to design and build websites that look great on any device, from desktops to mobile phones. Learn about responsive frameworks and techniques for creating mobile-friendly layouts.",
    },
    {
      image: "https://via.placeholder.com/300x200/e67e22/ffffff?text=Vue.js",
      name: "Vue.js",
      description:
        "Learn how to build modern web applications using the progressive Vue.js JavaScript framework. Explore the component-based architecture, directives, and reactive data bindings.",
    },
  ];
  return (
    <>
      {courses.map((val, index) => {
        return (
          <div className="m-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href={val.image}>
              <img className="rounded-t-lg w-full" src={val.image} alt="" />
            </a>
            <div className="p-5">
              <p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {val.name}
                </h5>
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {val.description}
              </p>
              <Link
                to="/empty"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Cards;
