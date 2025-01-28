import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";

const UserPayments = ({ userId }) => {
  const [payments, setPayments] = useState([]);
  const [sessionFailed, setSessionFailed] = useState(false);

  const fetchPayments = async () => {
    try {
      const response = await axiosInstance.get(`/payments/user/${userId}`);
      setPayments(response.data);
    } catch (error) {
      console.log("Błąd przy pobieraniu płatności:", error);
    }
  };

  const makePayment = async (id) => {
    try {
      const response = await axiosInstance.post(
        `/stripe/create-checkout-session/${id}`
      );
      console.log(response);

      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        setSessionFailed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="card bg-base-100 shadow-2xl w-full sm:w-3/5 max-w-[1000px] animate-in fade-in zoom-in mt-16 sm:py-6">
      <div className="card-body items-center justify-center w-full">
        <div className="text-xl lg:text-2xl hover:bg-transparent w-3/4 pointer-events-none flex justify-center mx-auto">
          <span className="font-bold">Składki członkowskie</span>
        </div>
        <div className="w-full flex flex-col items-center justify-around pt-8">
          <div className="overflow-x-auto">
            <table className="table table-zebra table-xs sm:table-sm md:table-md lg:table-lg">
              <thead>
                <tr>
                  <th></th>
                  <th>Miesiąc</th>
                  <th>Rok</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {payments.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>
                    <td>{entry.paymentMonth}</td>
                    <td>{entry.paymentYear}</td>
                    {entry.status === "PENDING" && (
                      <td className="text-warning">Oczekujące</td>
                    )}
                    {entry.status === "FAILED" && (
                      <td className="text-error">Nieudane</td>
                    )}
                    {entry.status === "PAID" && (
                      <td className="text-success">Zapłacone</td>
                    )}
                    {(entry.status === "PENDING" ||
                      entry.status === "FAILED") && (
                      <td>
                        <button
                          onClick={() => makePayment(entry.id)}
                          className="btn btn-sm"
                        >
                          Zapłać
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPayments;
