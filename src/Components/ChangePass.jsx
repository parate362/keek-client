import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginCarousel from "./LoginSignUpPage/LoginCarousel/LoginCarousel";
// import { FaMobileAlt } from "react-icons/fa";
import { Key } from "@mui/icons-material";
import { BsEyeSlash } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";

const ChangePass = () => {
  let slides = [
    "https://www.searchenginejournal.com/wp-content/uploads/2022/09/influencer-marketing2-631aeb9e3273a-sej.png",
    "https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2Finfluencer+india.jpg&h=570&w=855&q=100&v=20170226&c=1",
    "https://agencynetwork.org/assets/upload/article/835112326202038253232_6393005ccc516923b883acee_Influencer-Marketing.jpg",
  ];

  // let passChanged = "";

  const [passChanged, setPassChanged] = useState("");
  const [shoPass, setShowPass] = useState(false);
  const [ConShoPass, setConShowPass] = useState(false);
  return (
    <>
      <div className="flex flex-row h-[100vh] justify-center items-center">
        {/* carousel panel */}
        <div className="h-screen w-[100%] relative">
          <LoginCarousel slides={slides} autoSlide={true} />
        </div>
        {/* login panel */}
        <div className="mx-16 w-1/2 text-start items-center">
          <h1>{passChanged}</h1>

          <h1 className="text-5xl font-bold text-blue-600 font-serif mt-8">
            Keek
          </h1>
          <h2 className="my-4 font-bold">Create New Password? 🔒</h2>
          <div className="mb-2">
            <div>Password</div>
            <div className="relative mb-3">
              <input
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                type={`${shoPass ? "text" : "password"}`}
                placeholder="Your New Password"
              />
              <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
                <Key className="inline-block mx-2 text-lg opacity-50 rotate-90" />
              </div>
              <div
                onClick={() => {
                  setShowPass(!shoPass);
                }}
                className="absolute inset-y-0 right-2 pl-3 flex items-center"
              >
                {shoPass ? (
                  <BsEyeSlash className="text-2xl opacity-50" />
                ) : (
                  <IoEyeOutline className="text-2xl opacity-50" />
                )}
              </div>
            </div>

            <div>Confirm Password</div>
            <div className="relative mb-3">
              <input
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                type={`${ConShoPass ? "text" : "password"}`}
                placeholder="Confirm Your Password"
              />
              <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
                <Key className="inline-block mx-2 text-lg opacity-50 rotate-90" />
              </div>
              <div
                onClick={() => {
                  setConShowPass(!ConShoPass);
                }}
                className="absolute inset-y-0 right-2 pl-3 flex items-center"
              >
                {ConShoPass ? (
                  <BsEyeSlash className="text-2xl opacity-50" />
                ) : (
                  <IoEyeOutline className="text-2xl opacity-50" />
                )}
              </div>
            </div>

            <div>
              <Link to="/change_pass">
                <button
                  className="w-full border text-white rounded-md my-2 py-2 bg-blue-600 active:bg-transparent active:border active:text-black"
                  onClick={() => {
                    setPassChanged("Password changed successfully");
                  }}
                >
                  Reset Password
                </button>
              </Link>
            </div>

            <div>
              <Link to={"/"}>
                <button className="w-full border rounded-md my-2 py-2 active:bg-blue-600 active:border active:text-white">
                  Back To Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePass;
