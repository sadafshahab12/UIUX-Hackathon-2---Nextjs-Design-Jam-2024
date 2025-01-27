import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center mt-10">
      <SignIn />
    </div>
  );
}
