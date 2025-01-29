"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const sendUserToSanity = async () => {
        try {
          const response = await fetch("/api/user-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
              authProvider: user.externalAccounts.length > 0 
                ? user.externalAccounts[0].provider // Get provider like "google", "github"
                : "Clerk",
              createdAt: new Date().toISOString(),
            }),
          });

          const data = await response.json();
          if (response.ok) {
            console.log("User data saved to Sanity:", data);
          } else {
            console.error("Error saving user:", data.message);
          }
        } catch (error) {
          console.error("Failed to send user data to Sanity:", error);
        }
      };

      sendUserToSanity();
    }
  }, [isSignedIn, user]); // Runs only when user signs in

  return (
    <div className="h-auto flex justify-center items-center mt-20 p-5">
      <SignUp />
    </div>
  );
}
