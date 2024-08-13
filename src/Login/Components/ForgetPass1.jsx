import { useState } from 'react';
import { FiChevronLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const ForgetPass1 = () => {
  const [contactInfo, setContactInfo] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!contactInfo) {
      setError('Please enter a mobile number or email');
      return;
    }

    const isEmail = (input) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const result = emailRegex.test(input);
      console.log("Is email:", result); // Debugging: Log the result
      return result;
    };

    try {
      let response;
      if (isEmail(contactInfo)) {
        response = await axios.post('https://keek-server.vercel.app/api/user/send-email-otp', {
          email: contactInfo
        });
        console.log("Email API response:", response.data);
        navigate("/forgotpass2", { state: { contactInfo: contactInfo } }); // Navigate regardless of API response // Debugging: Log the API response
      } else {
        response = await axios.post('https://keek-server.vercel.app/api/user/send-mobile-otp', {
          mobileNumber: contactInfo
        });
        console.log("Mobile API response:", response.data); // Debugging: Log the API response
      }
    
      console.log("API Response:", response.data); // Debugging: Log the API response
    
      if (response.data.status) {
        setSuccess(response.data.message);
        console.log("Navigation to /forgotpass2"); // Debugging: Log navigation attempt
    
        // Try to navigate to a dummy page
        navigate("/forgotpass2", { state: { contactInfo: contactInfo } });
    
        // If the above navigation works, then the issue is with the "/forgotpass2" route
        // navigate("/forgotpass2", { state: { contactInfo: contactInfo } });
      } else {
        setError(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'An error occurred while sending OTP');
    }
  };

  return (
    <div>
      <div className="px-[35px]">
        <Link to={"/"}>
          <div className=" flex item-center mt-[50px] ">
            <h2 className="text-[#000000] text-[16px]">
              <FiChevronLeft className="inline-block mb-0.5 mr-1" />
              Back
            </h2>
          </div>
        </Link>

        <div className="w-[500px] h-[400px] text-black flex flex-col space-y-9 pt-[111px]">
          <p className="text-[#000000] text-[34px]">
            Forgot Password?
            <p className="text-[#8E9090] text-base ">
              No worries, We’ll send you reset instructions
            </p>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h4 className="text-lg text-[#000000] pb-[8px]">
              Enter Email or Mobile Number
            </h4>
            <input
              type="text"
              className="w-full bg-transparent rounded-md border py-[16px] px-[14px] border-[#000000]"
              placeholder="Enter Email or Mobile Number"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
         
          <div className="flex flex-col ">
            <div className="flex flex-col bg-[#0066FF] text-center rounded-[10px] border-[#363939] my-[16px]">
              
                <button 
                type='submit'
                className="text-[#FFFFFF] text-center w-full px-[16px] h-[50px] rounded-md gap-[8px] ">
                  Send 4-digit code
                
                </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass1;
