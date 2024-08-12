import { useEffect, useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ForgetPass3 = () => {
  const [shoPass, setShowPass] = useState(false);
  const [shoPass2, setShowPass2] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactInfo, setContactInfo] = useState(''); // assume contactInfo is stored in state or props
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { contactInfo: stateContactInfo } = location.state || {};
    setContactInfo(stateContactInfo || localStorage.getItem("contactInfo") || "");
  }, [location]);


  const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      let response;
      if (isEmail(contactInfo)) {
        response = await axios.post("https://keek-server.vercel.app/api/user/reset-email-password", {
          mobileNumber: contactInfo,
          password,
          confirmPassword,
        });
      } else {
        response = await axios.post("https://keek-server.vercel.app/api/user/reset-mobile-password", {
          mobileNumber: contactInfo,
          password,
          confirmPassword,
        });
      }
      if (response.data === 'Your password has been successfully reset. Please log in with your new credentials.') {
        navigate('/', { replace: true });
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while resetting password');
    }
  };

  return (
    <div className="ml-8">
      <div className="btn mt-[50px]">
        <Link to={"/forgotpass2"}>
          <button className="flex items-center">
            <FiChevronLeft />
            <span className="ml-1">Back</span>
          </button>
        </Link>
      </div>
      <div className="text mt-20">
        <div className="text-black text-[34px] font-normal font-['Open Sans']">
          Set your new password
        </div>
        <div className="self-stretch">
          <span className="text-[#8e9090] text-base font-normal font-['Open Sans'] whitespace-nowrap">
            Reset password and access your account again
          </span>
        </div>
      </div>
      <div>
        <div className="relative mt-5">
          <label htmlFor="" className="text-lg block">
            Password<span className="text-[#06F]">*</span>
          </label>
          <input
            className="border border-[#363939] px-5 py-3 w-[500px] rounded-lg"
            type={`${shoPass ? "text" : "password"}`}
            name=""
            id=""
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            onClick={() => {
              setShowPass(!shoPass);
            }}
            className="absolute top-11 right-6 pl-3 flex items-center"
          >
            {shoPass ? (
              <IoEyeOutline className="text-2xl opacity-50" />
            ) : (
              <BsEyeSlash className="text-2xl opacity-50" />
            )}
          </div>
        </div>
        <div className="mb-[26px] mt-1.5 text-[#8E9090] text-sm">
          Must be at least 8 characters.
        </div>
        <div className="relative">
          <label htmlFor="" className="text-lg block">
            Confirm Password<span className="text-[#06F]">*</span>
          </label>
          <input
            className="border border-[#363939] px-5 py-3 w-[500px] rounded-lg"
            type={`${shoPass2 ? "text" : "password"}`}
            name=""
            id=""
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            onClick={() => {
              setShowPass2(!shoPass2);
            }}
            className="absolute top-11 right-6 pl-3 flex items-center"
          >
            {shoPass2 ? (
              <IoEyeOutline className="text-2xl opacity-50" />
            ) : (
              <BsEyeSlash className="text-2xl opacity-50" />
            )}
          </div>
        </div>
      </div>
      <div className="self-stretch h-[50px] mt-6 px-4 bg-[#0066ff] rounded-[10px] justify-center items-center gap-2 inline-flex">
        <button
          className="items-center mx-40 text-center text-white text-lg leading-[18px]"
          onClick={handleSubmit}
        >
          Set new password
        </button>
      </div>
    </div>
  );
};

export default ForgetPass3;
