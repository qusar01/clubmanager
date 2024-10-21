import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import Toast from "../Toast";
import DelUserModal from "../modals/DelUserModal";

const UserDetails = ({ userId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstName, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [tempValue, setTempValue] = useState("");
  const [editingField, setEditingField] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  const handleShowSuccess = () => setShowSuccess(true);
  const handleShowError = () => setShowError(true);
  const handleShowDeleted = () => setShowDeleted(true);

  const fetchUser = async (e) => {
    try {
      const currUser = await axiosInstance.get(`/users/${userId}`);
      setName(currUser.data.firstName);
      setLastname(currUser.data.lastName);
      setEmail(currUser.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(getFieldValue(field));
  };

  const getFieldValue = (field) => {
    switch (field) {
      case "firstName":
        return firstName;
      case "lastName":
        return lastName;
      case "email":
        return email;
      default:
        return "";
    }
  };

  const handleSave = async (e) => {
    try {
      switch (editingField) {
        case "firstName":
          await editField(e, "firstName", tempValue);
          setName(tempValue);
          break;
        case "lastName":
          await editField(e, "lastName", tempValue);
          setLastname(tempValue);
          break;
        case "email":
          await editField(e, "email", tempValue);
          setEmail(tempValue);
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

    const userDto = {
      [field]: value,
    };

    const response = await axiosInstance.patch(`/users/${userId}`, userDto);
    console.log("okok");
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

  const deleteUser = async (e) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/users/${userId}`);
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

  return (
    <>
      <div className="form-control w-full space-y-6">
        <DelUserModal del={deleteUser} loading={loading} />
        {renderField("Imię", firstName, "firstName", true)}
        {renderField("Nazwisko", lastName, "lastName", true)}
        {renderField("Email", email, "email", false)}
        <div className="join gap-x-1 justify-center">
          <Link
            to={`/set-password?email=${email}`}
            className="btn btn-sm btn-warning btn-outline"
          >
            Zmień hasło
          </Link>
          <button
            onClick={() => {
              document.getElementById("del_user").showModal();
            }}
            className="btn btn-sm btn-error btn-outline"
          >
            Usuń konto
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
            message="Usunięto konto."
            type="success"
            onClose={() => setShowDeleted(false)}
          />
        )}
      </div>
    </>
  );
};

export default UserDetails;
