import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { FaMobileAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const LoginPage = () => {
  const [shoPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");  // Initialized with an empty string
  const [password, setPassword] = useState("");  // Initialized with an empty string
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`https://keek-server.vercel.app/api/user/signin-email`, { email, password })
    .then((result) => {
      console.log('Sign in successful:', result);
      setSuccess('Sign in successful!');
      setError('');
      navigate("/home");  // navigate to the home page
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      setError('Sign in failed. Please try again.');
      setSuccess('');
    });
};
  return (
    <div>
      <div className="ml-11 mt-[19px]">
        <h1 className="mb-[35px]">
          <span className="font-semibold text-[31px] text-[#384EDD]">
            KEEK |
          </span>
          <span className="text-[21px]">Brands</span>
        </h1>
        <div className="mb-[22px]">
          <h2 className="text-[29px]">Welcome back!</h2>
          <p className="text-[#8E9090]">
            Glad to see you again!, please enter your details.
          </p>
        </div>
        <div className="flex items-center gap-5 mb-[29px]">
          <button className="border relative h-[43px] py-[12px] px-[122px] rounded-lg flex items-center">
            <FcGoogle className="text-2xl mr-3 absolute left-1/3" />{" "}
            <span className="absolute left-1/2">Google</span>
          </button>
          <Link to={"/mobilesignup"}>
            <button className="border relative h-[43px] py-[12px] px-[122px] rounded-lg flex items-center">
              <FaMobileAlt className="text-2xl mr-3 absolute left-10 opacity-50" />
              <span className="absolute left-[80px]">Mobile number</span>
            </button>
          </Link>
        </div>
        <div className="flex items-center mb-[17.5px]">
          <hr className="w-1/2 text-[#B1B2B2] " />
          <span className="px-6 text-sm text-[#B1B2B2]">OR</span>
          <hr className="w-1/2 text-[#B1B2B2]" />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-[17.5px]">
              <label htmlFor="" className="block">
                Email<span className="text-[#06F]">*</span>
              </label>
              <input
                className="border h-[44px] border-[#363939] px-5 py-3 w-[500px] rounded-lg"
                type="email"
                name="email"
                id="email"
                placeholder="John.doe@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="" className="block">
                Password<span className="text-[#06F]">*</span>
              </label>
              <input
                className="border h-[44px] border-[#363939] px-5 py-3 w-[500px] rounded-lg"
                type={`${shoPass ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => {
                  setShowPass(!shoPass);
                }}
                className="absolute top-1/2 right-6 pl-3 flex items-center"
              >
                {shoPass ? (
                  <IoEyeOutline className="text-2xl opacity-50" />
                ) : (
                  <BsEyeSlash className="text-2xl opacity-50" />
                )}
              </div>
            </div>
            <div className="text-[#06F] text-end mt-2 mb-[29px]">
              <Link to="/forgotpass">Forget password?</Link>
            </div>
            <div className="mb-[35px]">
              <button
                type="submit"
                className="w-full flex items-center justify-center text-white h-[44px] py-4 rounded-[10px] bg-[#0066FF]"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mb-[22px]">
            <hr className="text-[#B1B2B2]" />
          </div>
          <div className="text-center mb-[21px]">
            Don’t have an account?&nbsp;
            <Link to={"/signup"}>
              <span className="text-[#06F]">Sign up</span>
            </Link>
          </div>
          <div className="text-center pb-[21px]">
            Don’t have an account?&nbsp;
            <a href="https://keek-influencer-login.vercel.app">
              <span className="text-[#06F]">
                Influencers page
                <RiArrowRightUpLine className="inline-block text-lg text-[#06F]" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
