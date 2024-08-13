import { useRef, useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPass2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const { contactInfo: stateContactInfo } = location.state || {};
    setContactInfo(stateContactInfo || localStorage.getItem("contactInfo") || "");
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

  const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEmail(contactInfo)) {
        response = await axios.post("https://keek-server.vercel.app/api/user/verify-email-otp", {
          email: contactInfo,
          otp: otp.join(""),
        });
      } else {
        response = await axios.post("https://keek-server.vercel.app/api/user/verify-otp", {
          mobileNumber: contactInfo,
          otp: otp.join(""),
        });
      }

      if (response.data.status) {
        navigate("/forgotpass3", { state: { contactInfo } }); 
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred while verifying OTP");
      console.error("Error:", error);
    }
  };

  return (
    <div className="px-[35px]">
      <Link to={"/forgotpass"}>
        <div className="flex item-center mt-[50px]">
          <h2 className="text-[#000000] text-[16px]">
            <FiChevronLeft className="inline-block mb-0.5" /> Back
          </h2>
        </div>
      </Link>
      <div className="w-[500px] h-[400px] text-black flex flex-col space-y-9 pt-[111px]">
        <p className="text-[#000000] text-[34px]">
          Enter Your Code
          <div className="flex flex-row space-x-2">
            <h4 className="text-lg text-[#8E9090] text-[16px]">
              We’ve sent you a code at
            </h4>
            <h1 className="text-lg text-[#0066FF] text-[16px]">
              {contactInfo}
            </h1>
          </div>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-5 mb-4 size-[55px]">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                className="w-[50px] h-[50px] rounded-[14px] border border-[#363939] text-center text-[24px] font-semibold focus:outline-none"
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-row space-x-2">
            <h4 className="text-lg text-[#000000] text-[16px]">
              Didn’t receive the Message?
            </h4>
            <h1 className="text-lg text-[#0066FF]">Resend</h1>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col bg-[#0066FF] text-center rounded-[10px] border-[#363939] my-[16px]">
              <button
                type="submit"
                className="text-[#FFFFFF] text-[18px] text-center w-full px-[16px] h-[50px] rounded-md gap-[8px]"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass2;
