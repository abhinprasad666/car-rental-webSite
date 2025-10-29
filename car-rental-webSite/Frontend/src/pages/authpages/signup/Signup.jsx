// Signup.jsx
import React from "react";
import SignupLeftPanel from "./SignupLeftPanel";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br  from-blue-50 via-blue-100 to-teal-200">
      <SignupLeftPanel />
      <SignupForm />
    </div>
  );
};

export default Signup;