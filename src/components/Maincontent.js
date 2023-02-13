import React from "react";
import "../assets/css/maincontent.css";
import { useProfile } from "../context/profile.context";
import Cards from "./Cards";

function Maincontent() {
  let coursedata = [
    { name: "html", progress: "64%", scope: "basics" },
    { name: "html", progress: "32%", scope: "intermediate" },
    { name: "html", progress: "10%", scope: "advanced" },
    { name: "css", progress: "64%", scope: "basics" },
    { name: "css", progress: "30%", scope: "intermediate" },
    { name: "css", progress: "78%", scope: "advance" },
    { name: "javascript", progress: "32%", scope: "basics" },
    { name: "javascript", progress: "64%", scope: "intermediate" },
    { name: "javascript", progress: "11%", scope: "advance" },
    { name: "react", progress: "62%", scope: "advance" },
  ];
  let { profile } = useProfile();
  console.log(profile);
  return (
    <>
      <aside className="bg-white rounded-lg shadow-lg p-5 mt-10">
        <h2 className="text-2xl font-medium mb-5">Profile</h2>
        <div className="flex">
          {profile.avatar !== "noavatar" ? (
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full mr-5"
              loading="lazy"
            />
          ) : (
            <img
              src={profile.image}
              alt="Profile"
              className="w-24 h-24 rounded-full mr-5"
              loading="lazy"
            />
          )}

          <div>
            <h3 className="font-medium text-3xl mb-2 capitalize">
              {profile.name}
            </h3>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-gray-600 font-bold">Student</p>
            <p className="text-gray-800">{profile.discription}</p>
          </div>
        </div>
      </aside>
      <main className="px-10 py-20">
        <h2 className="text-2xl font-medium mb-5">Courses</h2>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <table className="w-full text-left table-collapse">
            <thead>
              <tr>
                <th className="text-sm font-medium text-gray-700 p-2 bg-gray-200">
                  Name
                </th>
                <th className="text-sm font-medium text-gray-700 p-2 bg-gray-200">
                  Description
                </th>
                <th className="text-sm font-medium text-gray-700 p-2 bg-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {coursedata.map((val, index) => {
                return (
                  <tr className="hover:bg-gray-100">
                    <td className="p-2">
                      {val.scope} {val.name}
                    </td>
                    <td className="p-2">
                      Learn the {val.scope} of {val.name}
                    </td>
                    <td className="p-2">progress {val.progress}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
      <hr></hr>
      <h4 className="text-center mb-12">Other Courses</h4>
      <section className="overflow-hidden text-gray-700 ">
        <div className="">
          <div className="flex justify-center flex-wrap mb-10">
            <Cards></Cards>
          </div>
        </div>
      </section>
      <footer className="bg-slate-800 py-10">
        <div className="container mx-auto text-gray-600">
          <div className="flex flex-wrap justify-evenly mx-5">
            <div className="w-full md:w-1/3 mb-10 md:mb-0 text-slate-200 text-center">
              &copy; 2022 Education Website
            </div>
            <div className="w-full md:w-1/3 mb-10 md:mb-0 text-center text-slate-200">
              <h3 className="text-xl font-medium mb-3">Contact Us</h3>
              <p className="mb-3">123 Main St</p>
              <p className="mb-3">City, State 12345</p>
              <p className="mb-3">Phone: (123) 456-7890</p>
              <p className="mb-3">Email: info@educationwebsite.com</p>
            </div>
            <div className="w-full md:w-1/3 text-center text-slate-200">
              <h3 className="text-xl font-medium mb-3">Follow Us</h3>
              <ul className="list-reset inline-flex">
                <li className="mr-3">
                  <a href="#">
                    <i className="bi bi-facebook fa-2x"></i>
                  </a>
                </li>
                <li className="mr-3">
                  <a href="#">
                    <i className="bi bi-twitter fa-2x"></i>
                  </a>
                </li>
                <li className="mr-3">
                  <a href="#">
                    <i className="bi bi-instagram fa-2x"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Maincontent;
