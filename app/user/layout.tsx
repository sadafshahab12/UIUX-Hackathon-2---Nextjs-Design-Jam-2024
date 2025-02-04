import React from "react";
import Dashboard from "./components/Dashboard";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[20rem_2fr]  mt-20">
      <Dashboard />
      <main>{children}</main>
    </div>
  );
}
