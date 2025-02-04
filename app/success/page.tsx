"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      router.push("/");
    }
  }, [orderId, router]);

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold">🎉 Order Placed Successfully!</h1>
      <p className="text-lg mt-4">Your order ID: {orderId}</p>
      <button
        className="mt-6 px-6 py-3 bg-black text-white rounded"
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Success;
