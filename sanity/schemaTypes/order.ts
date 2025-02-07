export const orderSchema = {
  title: "Order",
  name: "order",
  type: "document",
  fields: [

    {
      name: "customer",
      title: "Customer",
      type: "reference",
      to: { type: "customer" },
    },
    {
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "furniture" }, // Reference to the furniture item
        },
      ],
    },
    {
      name: "quantities",
      title: "Quantities",
      type: "number",

    },
    {
      name: "totalPrice",
      title: "Total Price",
      type: "number",
    },
    {
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Direct Bank Transfer", name: "directBankTransfer", value: "Direct Bank Transfer" },
          { title: "Cash On Delivery", name: "cashOnDelivery", value: "Cash On Delivery" },
        ],
      },
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Success", value: "success" },
          { title: "Dispatch", value: "dispatch" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    },
  ],
};
