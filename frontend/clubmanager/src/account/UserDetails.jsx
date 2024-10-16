import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";

const UserDetails = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [tempValue, setTempValue] = useState("");
  const [editingField, setEditingField] = useState(null);

  const fetchUser = async (e) => {
    try {
      const currUser = await axiosInstance.get(`/users/me`);
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
      case "name":
        return name;
      case "lastname":
        return lastname;
      case "email":
        return email;
      default:
        return "";
    }
  };

  const handleSave = () => {
    switch (editingField) {
      case "name":
        setName(tempValue);
        break;
      case "lastname":
        setLastname(tempValue);
        break;
      case "email":
        setEmail(tempValue);
        break;
      default:
        break;
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const renderField = (label, value, field) => (
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
            className="btn btn-sm btn-outline w-16"
          >
            Edytuj
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="form-control w-full space-y-8">
      {renderField("Imię", name, "name")}
      {renderField("Nazwisko", lastname, "lastname")}
      {renderField("Email", email, "email")}
      <div className="join gap-1 justify-center">
        <button className="btn btn-sm btn-warning btn-outline">
          Zmień hasło
        </button>
        <button className="btn btn-sm btn-error btn-outline">Usuń konto</button>
      </div>
    </div>
  );
};

export default UserDetails;
