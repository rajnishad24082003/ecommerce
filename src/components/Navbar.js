import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { database } from "../misc/firebase";
import { getAuth, signOut } from "firebase/auth";
import AdminIcon from "@rsuite/icons/Admin";
import { ref, serverTimestamp, onDisconnect, set } from "firebase/database";
import { Link, Navigate } from "react-router-dom";
import { useProfile } from "../context/profile.context";
import eagle from "../assets/img/eagle.jpg";

function Navbar() {
  let { profile } = useProfile();
  let onsignout = () => {
    const auth = getAuth();
    let isOfflineForDatabase = {
      state: "offline",
      last_changed: serverTimestamp(),
    };
    let userStatusDatabaseRef = ref(
      database,
      `/status/${auth.currentUser.uid}`
    );
    let disconnectRef = onDisconnect(userStatusDatabaseRef);
    set(disconnectRef, isOfflineForDatabase).then(() => {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          Navigate("/signinup", { replace: true });
        })
        .catch((error) => {
          // An error happened.
        });
    });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <Disclosure as="nav" className="bg-slate-800 bg-opacity-80 relative z-10">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-14 w-14 bg-white p-2 rounded-full shadow-4xl"
                      src={eagle}
                      alt="Your Company"
                    />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
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
                              alt="not visible"
                              className="w-10 mx-auto rounded-full"
                            />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Link to="/profilePage">
                            <p
                              className={classNames(
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              profile
                            </p>
                          </Link>
                          <Menu.Item>
                            <p
                              onClick={onsignout}
                              className={classNames(
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign Out
                            </p>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5 text-center border-2 border-slate-700 py-2 rounded m-1 bg-black text-slate-100 justify-center">
                  <div className="flex-shrink-0">
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
                        alt="not visible"
                        className="w-10 mx-auto rounded-full"
                      />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {profile.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {profile.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3  px-2">
                  <Link
                    to={"/profilepage"}
                    className={classNames(
                      "block px-4 py-2 mx-4 text-sm text-center border-2 border-slate-700 hover:bg-slate-400 rounded m-1 bg-slate-800 text-slate-100"
                    )}
                  >
                    Profile
                  </Link>
                  <p
                    onClick={onsignout}
                    className={classNames(
                      "block px-4 py-2 text-sm m-1 mx-4 text-center bg-slate-800 text-slate-100 border-2 rounded border-slate-700 hover:bg-slate-400"
                    )}
                  >
                    Sign Out
                  </p>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default Navbar;
