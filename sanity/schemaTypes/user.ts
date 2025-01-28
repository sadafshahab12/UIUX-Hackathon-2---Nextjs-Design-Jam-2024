import { defineType } from "sanity";

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "clerkId",
      title: "Clerk ID",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "authProvider",
      title: "Authentication Provider",
      type: "string", // e.g., "Google", "GitHub", "Clerk"
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
});
