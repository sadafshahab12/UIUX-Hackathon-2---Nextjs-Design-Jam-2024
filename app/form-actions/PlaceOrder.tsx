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

const createCustomerInSanity = async (customerData: SanityCustomerType) => {
  try {
    const customerObject = {
      _type: "customer",
      firstname: customerData.firstName,
      lastname: customerData.lastName,
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
    console.log("customer created in sanity", response);
    return response;
  } catch (error) {
    console.log("error created user in sanity", error);
    throw error;
  }
};
const createOrderInSanity = async (
  cartData: ProductType[],
  customerId: string
) => {
  try {
    const orderObject = {
      _type: "order",
      customer: {
        _type: "reference",
        _ref: customerId,
      },
      items: cartData.map((item: ProductType) => ({
        _type: "items",
        _id: item._id,
        productTitle: item.title,
        productPrice: item.price - (item.price * item.dicountPercentage) / 100,
        productQuantity: item.quantity,
        productImage: item.imageUrls[0],
      })),
      order_date: new Date().toISOString(),
    };

    const response = await clientCreateDelete.create(orderObject);
    console.log("order created in sanity", response);
    return response;
  } catch (error) {
    console.log("error created order in sanity", error);
    throw error;
  }
};
const PlaceOrder = async (
  cartData: ProductType[],
  customerData: SanityCustomerType
) => {
  //create customer
  try {
    const customer = await createCustomerInSanity(customerData);
    await createOrderInSanity(cartData, customer._id);
    console.log("place order complete");
  } catch (error) {
    console.log("error created customer and order in sanity", error);
    throw error;
  }
  //create order

  return false;
};

export default PlaceOrder;

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string; // Store hashed password
}

const createUserInSanity = async (userData: UserType) => {
  try {
    const userObject = {
      _type: "user",
      firstname: userData.firstName,
      lastname: userData.lastName,
      email: userData.email,
      password: userData.password,
    };

    const response = await clientCreateDelete.create(userObject);
    console.log("customer created in sanity", response);
    return response;
  } catch (error) {
    console.log("error created user in sanity", error);
    throw error;
  }
};
export const PlaceUserData = async (userData: UserType) => {
  //create customer
  try {
    await createUserInSanity(userData);

    console.log("place order complete");
  } catch (error) {
    console.log("error created customer and order in sanity", error);
    throw error;
  }
  //create order

  return false;
};
