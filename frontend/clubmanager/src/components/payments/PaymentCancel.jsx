import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";

const PaymentCancel = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("paymentId");

  const paymentInfo = async () => {
    if (paymentId) {
      try {
        const response = await axiosInstance.get(
          `/stripe/payment-close?paymentId=${paymentId}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log("Payment ID:", paymentId);
    paymentInfo();
  }, [paymentId]);

  return (
    <section className="bg-base-200 flex justify-center items-center min-h-screen">
      <div className="py-16 animate-in fade-in zoom-in">
        <div className="p-8 bg-base-100 shadow-lg rounded-md max-w-md text-center space-y-6">
          <h2 className="text-4xl font-bold">Nie udało się opłacić składki</h2>

          <Link to="/" className="btn btn-primary w-full">
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentCancel;
