import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import DelClubModal from "../modals/DelClubModal";
import Toast from "../Toast";

const ClubDetails = ({ clubId, role }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [clubName, setClubName] = useState("");
  const [clubNip, setClubNip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [tempValue, setTempValue] = useState("");
  const [editingField, setEditingField] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  const handleShowSuccess = () => setShowSuccess(true);
  const handleShowError = () => setShowError(true);
  const handleShowDeleted = () => setShowDeleted(true);

  const fetchClub = async (e) => {
    try {
      const currClub = await axiosInstance.get(`/clubs/${clubId}`);
      setClubName(currClub.data.clubName);
      setClubNip(currClub.data.clubNip);
      setPhoneNumber(currClub.data.phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClub();
  }, []);

  const deleteClub = async (e) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/clubs/${clubId}`);
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");

      setShowSuccess(false);
      setShowError(false);
      handleShowDeleted();

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(getFieldValue(field));
  };

  const getFieldValue = (field) => {
    switch (field) {
      case "clubName":
        return clubName;
      case "clubNip":
        return clubNip;
      case "phoneNumber":
        return phoneNumber;
      default:
        return "";
    }
  };

  const handleSave = async (e) => {
    try {
      switch (editingField) {
        case "clubName":
          await editField(e, "clubName", tempValue);
          setClubName(tempValue);
          break;
        case "clubNip":
          await editField(e, "clubNip", tempValue);
          setClubNip(tempValue);
          break;
        case "email":
          await editField(e, "phoneNumber", tempValue);
          setPhoneNumber(tempValue);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setShowSuccess(false);
      setShowError(false);
      handleShowError();
    } finally {
      setEditingField(null);
    }
  };

  const editField = async (e, field, value) => {
    e.preventDefault();

    const clubDto = {
      [field]: value,
    };

    const response = await axiosInstance.patch(`/clubs/${clubId}`, clubDto);
    console.log("okokclub");
    setShowSuccess(false);
    setShowError(false);
    handleShowSuccess();
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const renderField = (label, value, field, hidden) => (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center">
        <label className="label">
          <span className="label-text font-bold text-xs lg:text-base">
            {label}:
          </span>
        </label>
      </div>
      {editingField === field ? (
        <>
          <input
            type="text"
            className="input input-bordered w-3/4 text-xs lg:text-base"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
          <div className="flex gap-1">
            <button
              onClick={handleSave}
              className="btn btn-sm btn-outline btn-success w-16 text-xs"
            >
              Zatwierdź
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-sm btn-outline btn-error w-16 text-xs"
            >
              Odrzuć
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            className="input input-bordered w-3/4 text-xs lg:text-base"
            disabled
            value={value}
            onChange={(e) => setTempValue(e.target.value)}
          />

          <button
            onClick={() => handleEdit(field)}
            className={`btn btn-sm btn-outline w-16 ${
              hidden ? "" : "btn-disabled"
            }`}
          >
            Edytuj
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="form-control w-full space-y-6">
        <DelClubModal del={deleteClub} loading={loading} role={role} />
        {renderField(
          "Nazwa klubu",
          clubName,
          "clubName",
          role === "OWNER" ? true : false
        )}
        {renderField(
          "Numer NIP",
          clubNip,
          "clubNip",
          role === "OWNER" ? true : false
        )}
        {renderField(
          "Numer telefonu",
          phoneNumber,
          "phoneNumber",
          role === "OWNER" ? true : false
        )}
        <div className="join gap-x-1 justify-center">
          <button
            onClick={() => {
              document.getElementById("del_club").showModal();
            }}
            className={`btn btn-sm btn-error btn-outline ${
              role === "OWNER" ? "" : "btn-disabled"
            }`}
          >
            Usuń klub
          </button>
        </div>
        {showSuccess && (
          <Toast
            message="Pomyślnie zmieniono dane."
            type="success"
            onClose={() => setShowSuccess(false)}
          />
        )}
        {showError && (
          <Toast
            message="Niepoprawne dane."
            type="error"
            onClose={() => setShowError(false)}
          />
        )}
        {showDeleted && (
          <Toast
            message="Usunięto klub."
            type="success"
            onClose={() => setShowDeleted(false)}
          />
        )}
      </div>
    </>
  );
};

export default ClubDetails;
