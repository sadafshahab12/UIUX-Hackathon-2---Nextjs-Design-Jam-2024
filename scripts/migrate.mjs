// Import environment variables from .env.local
import dotenv from "dotenv";
dotenv.config();

// Import the Sanity client to interact with the Sanity backend
import { createClient } from "@sanity/client";

// Load required environment variables
const {
  NEXT_PUBLIC_SANITY_PROJECT_ID, // Sanity project ID
  NEXT_PUBLIC_SANITY_DATASET, // Sanity dataset (e.g., "production")
  NEXT_PUBLIC_SANITY_TOKEN, // Sanity API token
  BASE_URL = "https://template-6-data.vercel.app", // API base URL for products and categories
} = process.env;

// Check if the required environment variables are provided
if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_TOKEN) {
  console.error(
    "Missing required environment variables. Please check your .env.local file."
  );
  process.exit(1); // Stop execution if variables are missing
}

// Create a Sanity client instance to interact with the target Sanity dataset
const targetClient = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity project ID
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production", // Default to "production" if not set
  useCdn: false, // Disable CDN for real-time updates
  apiVersion: "2025-01-18", // Sanity API version
  token: NEXT_PUBLIC_SANITY_TOKEN, // API token for authentication
});

// Function to upload an image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    // Fetch the image from the provided URL
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);

    // Convert the image to a buffer (binary format)
    const buffer = await response.arrayBuffer();

    // Upload the image to Sanity and get its asset ID
    const uploadedAsset = await targetClient.assets.upload(
      "image",
      Buffer.from(buffer),
      {
        filename: imageUrl.split("/").pop(), // Use the file name from the URL
      }
    );

    return uploadedAsset._id; // Return the asset ID
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null; // Return null if the upload fails
  }
}
async function uploadImagesToSanity(imageUrls) {
  const uploadedImages = await Promise.all(
    imageUrls.map((url) => uploadImageToSanity(url))
  );

  return uploadedImages
    .filter((imageId) => imageId) // Filter out failed uploads
    .map((imageId) => ({
      _type: "image",
      asset: {
        _ref: imageId,
      },
    }));
}

// Main function to migrate data from REST API to Sanity
async function migrateData() {
  console.log("Starting data migration...");

  try {
    // Fetch products from the REST API
    const productsResponse = await fetch(`${BASE_URL}/api/furniture-api`);
    if (!productsResponse.ok) throw new Error("Failed to fetch products.");
    const productsData = await productsResponse.json(); // Parse response to JSON

    // Migrate products
    for (const product of productsData) {
      console.log(`Migrating product: ${product.title}`);
      const productImages = await uploadImagesToSanity(product.imageUrl);

      // Prepare the new product object
      const newProduct = {
        _type: "furniture",
        title: product.title,
        description: product.description,
        productImage: productImages,
        price: product.price,
        dicountPercentage: product.dicountPercentage,
        isNew: product.isNew,
        isStock: product.isStock,
        stock: product.stock,
        availableForRental: product.availableForRental,
        rentalPricePerDay: product.rentalPricePerDay,
        tags: product.tags,
      };

      // Save the product to Sanity
      const result = await targetClient.create(newProduct);
      console.log(`Migrated product: ${product.title} (ID: ${result._id})`);
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error.message);
    process.exit(1); // Stop execution if an error occurs
  }
}

// Start the migration process
migrateData();
