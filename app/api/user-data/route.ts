import { client } from "@/sanity/lib/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { clerkId, email, firstName, lastName, authProvider, createdAt } =
      req.body;

    if (!clerkId || !email) {
      return res
        .status(400)
        .json({ message: "Clerk ID and Email are required" });
    }

    // Check if user already exists in Sanity
    const existingUsers = await client.fetch(
      `*[_type == "user" && clerkId == $clerkId][0]`,
      { clerkId }
    );

    if (existingUsers) {
      return res.status(200).json({ message: "User already exists in Sanity" });
    }

    // Create user document in Sanity
    const userDoc = {
      _type: "user",
      clerkId,
      email,
      firstName,
      lastName,
      authProvider,
      createdAt,
    };

    const result = await client.create(userDoc);
    return res
      .status(201)
      .json({ message: "User created successfully", result });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
