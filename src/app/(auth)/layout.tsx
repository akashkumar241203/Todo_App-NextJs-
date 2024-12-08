import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const cookieValue = cookies().get("token")?.value;
  if (cookieValue) {
    redirect("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
