import React, { useState } from "react";

const VerificationCard = ({ submitVerify, loading, errors, setErrors }) => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  const handlePinChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) {
      document.querySelectorAll("[data-hs-pin-input-item]")[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitVerify(e, {
      pin,
    });
  };

  return (
    <div className="card bg-base-100 shadow-2xl max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="card-body items-center">
        <p className="prose text-center pointer-events-none mb-2">
          Podaj kod weryfikujący
        </p>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col items-center space-y-4 p-2 mx-auto w-full"
        >
          <div data-hs-pin-input className="flex space-x-2 mb-2">
            {pin.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                data-hs-pin-input-item
                value={value}
                onChange={(e) => handlePinChange(e.target.value, index)}
                className={`w-12 h-12 text-center text-2xl border ${
                  errors.verificationCode ? "border-red-500" : "border-gray-300"
                } rounded bg-base-100`}
                onFocus={() =>
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    verificationCode: null,
                  }))
                }
              />
            ))}
          </div>
          {errors.verificationCode && (
            <span className="prose text-red-500 text-sm">
              {errors.verificationCode}
            </span>
          )}
          <button
            type="submit"
            className="btn btn-primary w-48 content-center w-2/3"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>Weryfikuj</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCard;
