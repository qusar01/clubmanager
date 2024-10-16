import React from "react";
import { useState } from "react";
import UserDetails from "./UserDetails";
import ClubDetails from "./ClubDetails";

const OwnerAccount = () => {
  const [activeButton, setActiveButton] = useState("account");

  return (
    <div className="card bg-base-100 shadow-2xl w-96 md:w-1/2 animate-in fade-in zoom-in">
      <div className="card-body items-center justify-center">
        <div className="text-xl md:text-2xl hover:bg-transparent w-3/4 pointer-events-none flex justify-center">
          <span className="">Konto</span>
        </div>
        {activeButton === "account" ? <UserDetails /> : <ClubDetails />}
        <div className="join">
          <button
            className={`join-item btn ${
              activeButton === "account" ? "btn-active" : ""
            }`}
            onClick={() => setActiveButton("account")}
          >
            Moje konto
          </button>
          <button
            className={`join-item btn ${
              activeButton === "club" ? "btn-active" : ""
            }`}
            onClick={() => setActiveButton("club")}
          >
            Mój klub
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerAccount;
