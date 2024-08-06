import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-[400px] mx-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;
