import React from "react";
import { useState } from "react";

const UserDetails = () => {
  // Stan do zarządzania edycją
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Jan");
  const [tempName, setTempName] = useState(name);

  // Funkcja do rozpoczęcia edycji
  const handleEdit = () => {
    setIsEditing(true);
    setTempName(name); // Zapisuje aktualne imię w tymczasowym stanie
  };

  // Funkcja do zatwierdzenia edycji
  const handleSave = () => {
    setName(tempName);
    setIsEditing(false);
  };

  // Funkcja do anulowania edycji
  const handleCancel = () => {
    setIsEditing(false);
    setTempName(name); // Przywraca stare imię
  };

  return (
    <div className="form-control w-full">
      {/* Jeśli nie edytujemy, wyświetlamy nazwę i przycisk edycji */}
      {!isEditing ? (
        <div className="flex items-center justify-center gap-4">
          <label className="label">
            <span className="label-text font-bold">Imię:</span>
          </label>
          <span>{name}</span>
          <button onClick={handleEdit} className="btn btn-sm btn-outline">
            Edytuj
          </button>
        </div>
      ) : (
        // Jeśli edytujemy, wyświetlamy pole input oraz przyciski zapisu i anulowania
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="input input-bordered w-full"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
          <button onClick={handleSave} className="btn btn-sm btn-success">
            Zatwierdź
          </button>
          <button onClick={handleCancel} className="btn btn-sm btn-error">
            Odrzuć
          </button>
        </div>
      )}
      {/* Jeśli nie edytujemy, wyświetlamy nazwę i przycisk edycji */}
      {!isEditing ? (
        <div className="flex items-center justify-center gap-4">
          <label className="label">
            <span className="label-text font-bold">Imię:</span>
          </label>
          <span>{name}</span>
          <button onClick={handleEdit} className="btn btn-sm btn-outline">
            Edytuj
          </button>
        </div>
      ) : (
        // Jeśli edytujemy, wyświetlamy pole input oraz przyciski zapisu i anulowania
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="input input-bordered w-full"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
          <button onClick={handleSave} className="btn btn-sm btn-success">
            Zatwierdź
          </button>
          <button onClick={handleCancel} className="btn btn-sm btn-error">
            Odrzuć
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
