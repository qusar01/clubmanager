import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setIsPaymentEnabled } from "../../redux/slices/userSlice";

const PaymentDetails = ({ clubId, role }) => {
  const dispatch = useDispatch();
  const [isPaymentEnabled, setIsPaymentEnabledState] = useState(false);
  const [membershipFee, setMembershipFee] = useState(0);

  const fetchClub = async (e) => {
    try {
      const currClub = await axiosInstance.get(`/clubs/${clubId}`);
      setIsPaymentEnabledState(currClub.data.isPaymentEnabled);
      setMembershipFee(currClub.data.membershipFee);
      console.log(currClub.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClub();
  }, []);

  const handleToggleChange = () => {
    setIsPaymentEnabledState((prev) => !prev);
  };

  const handleFeeChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setMembershipFee(value);
    }
  };

  const handleSave = async () => {
    const data = {
      isPaymentEnabled,
      membershipFee: membershipFee,
    };
    try {
      await axiosInstance.put(`/clubs/${clubId}/payment-settings`, data);
      dispatch(setIsPaymentEnabled(data.isPaymentEnabled));
    } catch (error) {
      console.log(error);
    }
    alert("Dane zostały zapisane.");
  };

  return (
    <div className="w-4/5 mx-auto">
      <h1 className="text-xl font-semibold text-center mb-4">
        Zarządzanie składkami
      </h1>

      <div className="flex items-center justify-center gap-x-4 mb-4">
        <span className="text-gray-700">Włącz składki</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={isPaymentEnabled}
          onChange={handleToggleChange}
        />
      </div>

      {isPaymentEnabled && (
        <div className="mb-4">
          <label
            htmlFor="membershipFee"
            className="block text-gray-700 font-medium mb-2"
          >
            Wartość składki (PLN)
          </label>
          <input
            type="number"
            id="membershipFee"
            placeholder="Podaj wartość składki"
            value={membershipFee}
            onChange={handleFeeChange}
            className="input input-bordered w-full"
            min="0"
          />
        </div>
      )}

      <button
        className="btn btn-primary w-full"
        onClick={handleSave}
        disabled={isPaymentEnabled && !membershipFee}
      >
        Zapisz
      </button>
    </div>
  );
};

export default PaymentDetails;
