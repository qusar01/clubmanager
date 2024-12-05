import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";

const InviteMemberModal = ({ setShowSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [memberRole, setMemberRole] = useState("COACH");
  const clubId = useSelector((state) => state.user.clubId);

  const inv = async () => {
    setLoading(true);
    const newInv = {
      email,
      ["role"]: memberRole,
      clubId,
    };

    try {
      await axiosInstance.post(`/invitations`, newInv);
      setLoading(false);
      document.getElementById("inv_member").close();
      setShowSuccess(true);
      setEmail("");
    } catch (error) {
      setErrors(error.response.data);
      setLoading(false);
    }
  };

  return (
    <div>
      <dialog id="inv_member" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Zaproś do klubu</h3>
          <div className="flex flex-col items-center justify-center pt-4 gap-4">
            <label
              className={`input input-bordered flex items-center gap-2 w-3/4 ${
                errors["registerUserDto.email"] || errors.email
                  ? "border-red-500 text-red-500"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className={`grow ${
                  errors["email"] || errors.email ? "placeholder-red-500" : ""
                }`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                onFocus={() =>
                  setErrors((prevErrors) => ({ ...prevErrors, email: null }))
                }
              />
            </label>
            {errors.email && (
              <span className="prose text-red-500 text-sm">{errors.email}</span>
            )}

            <select
              value={memberRole}
              onChange={(e) => setMemberRole(e.target.value)}
              className="select select-bordered w-3/4"
            >
              <option value="COACH">Trener</option>
              <option value="COMPETITOR">Zawodnik</option>
            </select>
            <span className="prose">
              <strong>Uwaga: </strong>
              Zaproszenia mają ważność przez . Przez ten czas inne kluby nie
              mogą zaprosić użytkownika o danym adresie email.
            </span>
          </div>

          <div className="modal-action">
            {loading ? (
              <button className="btn btn-secondary">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button onClick={inv} className="btn btn-secondary">
                Wyślij
              </button>
            )}

            <form method="dialog">
              <button className="btn">Anuluj</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default InviteMemberModal;
