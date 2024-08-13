import { useState, useRef, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const VerifyNumber = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Retrieve name and mobileNumber from location state or localStorage
    const { name: stateName, mobileNumber: stateMobileNumber } = location.state || {};
    setName(stateName || localStorage.getItem("name") || "");
    setMobileNumber(stateMobileNumber || localStorage.getItem("mobileNumber") || "");
  }, [location]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    setError("");
    const otpString = otp.join("");
    
    if (otpString.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      const response = await axios.post("https://keek-server.vercel.app/api/user/verify-and-signup", {
        name,
        mobileNumber,
        otp: otpString
      });

      if (response.data.status) {
        localStorage.removeItem("name");
        localStorage.removeItem("mobileNumber");
        
        navigate("/home"); 
      } else {
        setError(response.data.message || "Verification failed");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      setError(error.response?.data?.message || "An error occurred during verification");
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !mobileNumber) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("https://keek-server.vercel.app/api/user/send-otp", {
        name,
        mobileNumber: selectedCode + mobileNumber,
      });

      if (response.data.status) {
        setSuccess("OTP sent successfully");
        // Navigate to OTP verification page or handle it as needed
        navigate("/verifynumber", { state: { mobileNumber: selectedCode + mobileNumber } });
      } else {
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.response?.data?.message || "An error occurred while sending OTP");
    }
  };

  return (
    <div className="Hero ml-10">
      <div className="flex items-center mt-8">
        <Link to={"/mobilesignup"}>
          <button>
            <FiChevronLeft className="mr-1" />
          </button>
          <button className=" text-base font-normal ">
            Back
          </button>
        </Link>
      </div>
      <div className="text-wrapper pt-14">
        <div className=" text-[34px] font-normal ">
          Verify Mobile Number
        </div>
        <div className="self-stretch">
          <span className="text-[#8e9090] text-base font-normal  whitespace-nowrap">
            Check your mobile for SMS message. We’ve sent you otp
          </span>
          <div className="text-[#8e9090] text-base font-normal ">
            <span>at </span>
            <span className="text-[#0066ff] text-base font-semibold  underline">
            {mobileNumber}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 h-[55px] w-[280px] justify-start items-center gap-5 inline-flex">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength="1"
            className="w-[50px] h-[50px]  rounded-[14px] border border-[#363939] text-center text-[24px] font-semibold focus:outline-none"
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}
      </div>
      <div className="mt-5">
        <div className="h-[22px] justify-start items-start gap-2 inline-flex">
          <div className="text-center  text-base font-normal ">
            Didn’t receive the SMS?
          </div>
          <button 
            onClick={handleResendOtp} 
            className="text-[#0066ff] text-base font-normal "
            >
            Resend Otp
          </button>
        </div>
      </div>
      <div 
       onClick={handleVerify}
      className="self-stretch h-[50px] mt-5 px-4 bg-[#0066ff] rounded-[10px] justify-center items-center gap-2 inline-flex">
        <button className="items-center mx-40 text-center text-white text-lg font-normal  leading-[18px]">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default VerifyNumber;
