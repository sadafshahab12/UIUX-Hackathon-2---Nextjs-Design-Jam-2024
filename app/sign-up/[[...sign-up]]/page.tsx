"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-auto flex justify-center items-center mt-20 p-5">
      <SignUp afterSignOutUrl={"/"} />
    </div>
  );
}
