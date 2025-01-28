import { ClerkAPI } from '@clerk/clerk-sdk-node';
import { client } from './sanityClient'; // Assuming you have your Sanity client setup

async function migrateUserData(clerkUserId) {
  // Fetch user data from Clerk
  const user = await ClerkAPI.users.getUser(clerkUserId);

  // Create or update user document in Sanity
  const userData = {
    _id: `user-${user.id}`,
    _type: 'user',
    clerkId: user.id,
    email: user.email_addresses[0].email_address,
    name: user.first_name,
    createdAt: user.created_at,
  };

  // Push to Sanity
  await client.createOrReplace(userData);
}
