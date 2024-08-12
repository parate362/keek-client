/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import ImagePanel from "./Login/Components/ImagePanel";
import LoginPage from "./Login/Components/LoginPage";
import SignUpPage from "./Login/Components/SignUpPage";
import MobileSignUpPage from "./Login/Components/MobileSignUpPage";
import VerifyNumber from "./Login/Components/VerifyNumber";
import ForgetPass1 from "./Login/Components/ForgetPass1";
import ForgetPass2 from "./Login/Components/ForgetPass2";
import ForgetPass3 from "./Login/Components/ForgetPass3";
import Home from "./Login/Components/Home";

const App = () => {
  return (
    <div className="flex w-[1440px] h-[960px] font-openSans">
      <ImagePanel />
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mobilesignup" element={<MobileSignUpPage />} />
          <Route path="/verifynumber" element={<VerifyNumber />} />
          <Route path="/forgotpass" element={<ForgetPass1 />} />
          <Route path="/forgotpass2" element={<ForgetPass2 />} />
          <Route path="/forgotpass3" element={<ForgetPass3 />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
