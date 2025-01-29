import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="sm:h-screen h-auto flex justify-center items-center sm:mt-10 mt-20">
      <SignIn />
    </div>
  );
}
