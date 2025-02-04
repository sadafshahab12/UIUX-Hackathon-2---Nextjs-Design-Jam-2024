import { ProductType, SanityCustomerType } from "../type/dataType";
import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config();

export const clientCreateDelete = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-18",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

/**
 * Creates a customer document in Sanity.
 * @param {SanityCustomerType} customerData - Customer details.
 * @returns {Promise<any>} - The created customer object.
 */
const createCustomerInSanity = async (customerData: SanityCustomerType) => {
  try {
    console.log("Received customerData in Sanity:", customerData); // ✅ Debugging

    if (!customerData.userId) {
      console.warn("⚠️ Warning: userId is missing in customerData!");
    }
    const customerObject = {
      _type: "customer",
      userId: customerData.userId,
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phone: customerData.phone,
      streetAddress: customerData.streetAddress,
      city: customerData.city,
      zipCode: customerData.zipCode,
      country: customerData.country,
      province: customerData.province,
      additionalInfo: customerData.additionalInfo,
    };

    const response = await clientCreateDelete.create(customerObject);
    console.log("Customer created in Sanity:", response);
    return response;
  } catch (error) {
    console.error("Error creating customer in Sanity:", error);
    throw error;
  }
};

/**
 * Creates an order document in Sanity.
 * @param {ProductType[]} cartData - List of products in the order.
 * @param {string} customerId - Reference to the customer document.
 * @param {SanityCustomerType} customerData - Customer details for the order.
 * @returns {Promise<any>} - The created order object.
 */
const createOrderInSanity = async (
  cartData: ProductType[],
  customerId: string,
  customerData: SanityCustomerType
) => {
  try {
    const orderObject = {
      _type: "order",
      customer: {
        _type: "reference",
        _ref: customerId, // Linking the order to the customer
      },
      userId: customerData.userId,
      cartItems: cartData.map((item: ProductType) => ({
        _type: "reference",
        _ref: item._id, // Reference to furniture schema
        _key: item._id,
        quantity: item.quantity, // Add quantity here
      })),
      totalPrice: cartData.reduce(
        (total, item) =>
          total +
          (item.price - (item.price * (item.dicountPercentage || 0)) / 100) *
            (item.quantity ?? 1), // Use default value 1 if undefined
        0
      ),
      status: "pending", // Default status when order is created
    };

    const response = await clientCreateDelete.create(orderObject);
    console.log("Order created in Sanity:", response);
    return response;
  } catch (error) {
    console.error("Error creating order in Sanity:", error);
    throw error;
  }
};


/**
 * Places an order by creating a customer and an order in Sanity.
 * @param {ProductType[]} cartData - List of products in the cart.
 * @param {SanityCustomerType} customerData - Customer details.
 */
const PlaceOrder = async (
  cartData: ProductType[],
  customerData: SanityCustomerType
) => {
  try {
    // Step 1: Create Customer in Sanity
    const customer = await createCustomerInSanity(customerData);

    // Step 2: Create Order in Sanity with reference to the customer
    await createOrderInSanity(cartData, customer._id, customerData);

    console.log("Place order complete!");
  } catch (error) {
    console.error("Error creating customer and order in Sanity:", error);
    throw error;
  }
};

export default PlaceOrder;
