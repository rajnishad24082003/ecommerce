import React, { useState } from "react";
import bgimggreece from "../assets/img/bgimg.jpg";
import AvatarUpload from "../components/AvatarUpload";
import { useProfile } from "../context/profile.context";
import AdminIcon from "@rsuite/icons/Admin";
import { ref, set } from "firebase/database";
import { database } from "../misc/firebase";
import { Link, redirect } from "react-router-dom";

function ProfilePage() {
  const { profile } = useProfile();
  let [displayIcon, setdisplayIcon] = useState("hidden");
  let [isEditable, setisEditable] = useState(false);
  let [displaywriteIcon, setdisplaywriteIcon] = useState("");
  let pencilIconclick = () => {
    setisEditable(true);
    setdisplayIcon("");
    setdisplaywriteIcon("hidden");
  };
  let discardfun = () => {
    setisEditable(false);
    setdisplayIcon("hidden");
    setdisplaywriteIcon("");
  };
  let [inputtextnikevalue, setinputtextnikevalue] = useState("");
  let inputtextnike = (e) => {
    if (isEditable) {
      setinputtextnikevalue(e.target.value);
    }
  };
  let savefun = async () => {
    const starCountRef = ref(database, `/profile/${profile.uid}/name`);
    await set(starCountRef, inputtextnikevalue);
    setisEditable(false);
    setdisplayIcon("hidden");
    setdisplaywriteIcon("");
  };

  let [displayIcondisc, setdisplayIcondisc] = useState("hidden");
  let [isEditabledisc, setisEditabledisc] = useState(false);
  let [displaywriteIcondisc, setdisplaywriteIcondisc] = useState("");
  let pencilIconclickdisc = () => {
    setisEditabledisc(true);
    setdisplayIcondisc("");
    setdisplaywriteIcondisc("hidden");
  };
  let discardfundisc = () => {
    setisEditabledisc(false);
    setdisplayIcondisc("hidden");
    setdisplaywriteIcondisc("");
  };
  let [inputtextnikevaluedisc, setinputtextnikevaluedisc] = useState("");
  let inputtextnikedisc = (e) => {
    if (isEditabledisc) {
      setinputtextnikevaluedisc(e.target.value);
    }
  };
  let savefundisc = async () => {
    const starCountRef = ref(database, `/profile/${profile.uid}/discription`);
    await set(starCountRef, inputtextnikevaluedisc);
    setisEditabledisc(false);
    setdisplayIcondisc("hidden");
    setdisplaywriteIcondisc("");
  };
  return (
    <>
      <main className="profile-page ">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full  bg-center bg-cover"
            style={{
              backgroundImage: `url(${bgimggreece})`,
              height: "50vh",
            }}
          ></div>
          <div
            className="top-auto bottom-0 left-0  right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-8 ">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="relative w-fit mx-auto  mt-6">
                      {profile.avatar === "noavatar" &&
                      profile.image === "noimage" ? (
                        <AdminIcon></AdminIcon>
                      ) : (
                        <img
                          src={
                            profile.avatar !== "noavatar"
                              ? `${profile.avatar}`
                              : `${profile.image}`
                          }
                          alt="userimage not able to load"
                          style={{
                            borderRadius: "200px",
                          }}
                          className="border mx-auto w-60"
                        />
                      )}

                      <AvatarUpload></AvatarUpload>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2">
                    {profile.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                    {profile.email}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <div className="mx-auto p-1 rounded-md w-fit border border-slate-600">
                      <input
                        type="text"
                        className="p-2 nikenameinput"
                        placeholder={profile.name}
                        onChange={inputtextnike}
                        value={inputtextnikevalue}
                      />
                      <i
                        className={`bi bi-pencil-square text-lg ${displaywriteIcon}`}
                        onClick={pencilIconclick}
                      ></i>
                      <i
                        className={`bi text-lg bi-check ${displayIcon}`}
                        onClick={savefun}
                      ></i>
                      <i
                        className={`bi text-lg bi-x  ${displayIcon}`}
                        onClick={discardfun}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <div className="mx-auto p-1 rounded-md w-full lg:w-3/4  border border-slate-600">
                        <textarea
                          type="text"
                          className="p-2 nikenameinput w-full"
                          placeholder={profile.discription}
                          onChange={inputtextnikedisc}
                          value={inputtextnikevaluedisc}
                        />
                        <i
                          className={`bi bi-pencil-square text-2xl ${displaywriteIcondisc}`}
                          onClick={pencilIconclickdisc}
                        ></i>
                        <i
                          className={`bi bi-check text-2xl ${displayIcondisc}`}
                          onClick={savefundisc}
                        ></i>
                        <i
                          className={`bi bi-x text-2xl  ${displayIcondisc}`}
                          onClick={discardfundisc}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
                    Made by{" "}
                    <p className="text-blueGray-500 hover:text-gray-800"></p>
                    <p className="text-blueGray-500 hover:text-blueGray-800">
                      {" "}
                      Raj Nishad
                    </p>
                    .
                  </div>
                  <Link to={"/"}>
                    <div className="bg-slate-900 rounded">
                      <i className="bi bi-arrow-left text-3xl p-2 text-slate-400 z-10 hover:text-blue-400">
                        back
                      </i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}

export default ProfilePage;
