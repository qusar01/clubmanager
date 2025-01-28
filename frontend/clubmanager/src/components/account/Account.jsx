import React from "react";
import { useState } from "react";
import UserDetails from "./UserDetails";
import ClubDetails from "./ClubDetails";
import PaymentDetails from "./PaymentDetails";

const Account = ({ userId, clubId, role }) => {
  const [activeButton, setActiveButton] = useState("account");

  return (
    <div className="card bg-base-100 shadow-2xl w-96 md:w-auto animate-in fade-in zoom-in">
      <div className="card-body items-center justify-center mx-auto gap-8">
        <div className="text-xl lg:text-2xl hover:bg-transparent w-3/4 pointer-events-none flex justify-center">
          <span className="font-bold">Ustawienia</span>
        </div>
        {activeButton === "account" && (
          <UserDetails userId={userId} role={role} />
        )}
        {activeButton === "club" && <ClubDetails clubId={clubId} role={role} />}
        {activeButton === "payment" && (
          <PaymentDetails clubId={clubId} role={role} />
        )}
        <div className="join">
          <button
            className={`join-item btn w-28 ${
              activeButton === "account" ? "btn-active" : ""
            }`}
            onClick={() => setActiveButton("account")}
          >
            Moje konto
          </button>
          <button
            className={`join-item btn w-28 ${
              activeButton === "club" ? "btn-active" : ""
            }`}
            onClick={() => setActiveButton("club")}
          >
            Mój klub
          </button>
          {role === "OWNER" ? (
            <button
              className={`join-item btn w-28 ${
                activeButton === "payment" ? "btn-active" : ""
              }`}
              onClick={() => setActiveButton("payment")}
            >
              Płatności{" "}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
