import { useState } from "react";
import { FiChevronLeft, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const MobileSignUpPage = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+91");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const countryCodes = [
    { code: "+1", country: "US" },
    { code: "+91", country: "IND" },
    { code: "+44", country: "UK" },
    // Add more countries as needed
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCodeSelect = (code) => {
    setSelectedCode(code);
    setIsDropdownOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobileNumber(value);
    }
  };

  const handleMobileNumberKeyDown = (e) => {
    // Allow navigation keys and Ctrl+A
    if (
      !/^\d$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      !(e.ctrlKey && e.key === "a")
    ) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
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
    <div className="hero ml-10">
      <Link to={"/"}>
        <div className="flex items-center mt-8">
          <button>
            <FiChevronLeft className="mr-1" />
          </button>
          <button className="text-black text-base font-normal font-['Open Sans']">
            Back
          </button>
        </div>
      </Link>
      <div className="text-wrapper pt-14">
        <div className="text-black text-[34px] font-normal font-['Open Sans']">
          Enter your Mobile Number
        </div>
        <div className="self-stretch">
          <span className="text-[#8e9090] text-base font-normal font-['Open Sans'] whitespace-nowrap">
            Please confirm your country code, name, and mobile number.
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="tex-wrapper mt-5">
          <div className="h-[25px] flex items-center gap-2">
            <div className="text-black text-lg font-normal font-['Open Sans']">
              Name
            </div>
            <div className="text-[#0066ff] text-xs font-normal font-['Open Sans']">
              *
            </div>
          </div>
          <div className="text-box mt-3">
            <div className="h-[50px] px-3.5 py-4 rounded-lg border border-[#363939] flex items-center">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                className="w-full text-base font-normal font-['Open Sans'] outline-none bg-transparent text-[#000000]"
                style={{ color: name ? "#000000" : "#b1b2b2" }} // Change color based on input value
              />
            </div>
            <div className="text-wrap2 mt-3 flex items-center gap-4">
              <div className="text-black text-lg font-normal font-['Open Sans']">
                Country code
              </div>
              <div className="h-[25px] flex items-center gap-1">
                <div className="text-black text-lg font-normal font-['Open Sans']">
                  Mobile Number
                </div>
                <div className="text-[#0066ff] text-xs font-normal font-['Open Sans']">
                  *
                </div>
              </div>
            </div>
            <div className="input-box mt-3 flex items-center gap-2">
              <div className="relative h-[50px] w-[120px] rounded-lg border border-[#363939] flex items-center">
                <div
                  className="flex-1 flex items-center px-3 cursor-pointer"
                  onClick={handleDropdownToggle}
                >
                  <div className="text-[#0066ff] text-base font-normal font-['Open Sans']">
                    {selectedCode}
                  </div>
                  <FiChevronDown className="ml-10 text-[#0066ff]" />
                </div>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#363939] rounded-lg shadow-lg z-10">
                    {countryCodes.map(({ code, country }) => (
                      <div
                        key={code}
                        onClick={() => handleCodeSelect(code)}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {code} {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1 h-[50px] px-3.5 py-4 rounded-lg border border-[#363939] flex items-center">
                <input
                  type="text"
                  placeholder="Mobile number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  onKeyDown={handleMobileNumberKeyDown}
                  className="w-full text-base font-normal font-['Open Sans'] outline-none bg-transparent text-[#000000]"
                  style={{ color: mobileNumber ? "#000000" : "#b1b2b2" }} // Change color based on input value
                />
              </div>
            </div>
            <div className="self-stretch h-[50px] mt-5 px-4 bg-[#0066ff] rounded-[10px] justify-center items-center gap-2 inline-flex">
              {/* <Link to={"/verifynumber"}> */}
                <button className="items-center mx-40 text-center text-white text-lg font-normal font-['Open Sans'] leading-[18px]">
                  Send 4-digit code
                </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default MobileSignUpPage;
