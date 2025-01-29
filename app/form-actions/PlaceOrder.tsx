import { CustomerType, ProductType } from "../type/dataType";
import { client } from "@/sanity/lib/client";
const createCustomerInSanity = async (customerData: CustomerType) => {
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

    const response = await client.create(customerObject);
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

    const response = await client.create(orderObject);
    console.log("order created in sanity", response);
    return response;
  } catch (error) {
    console.log("error created order in sanity", error);
    throw error;
  }
};
const PlaceOrder = async (
  cartData: ProductType[],
  customerData: CustomerType
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
