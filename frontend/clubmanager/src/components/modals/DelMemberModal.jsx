import React, { useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";

const DelMemberModal = ({ memberId, dialogId, setShowSuccess, setMembers }) => {
  const [loading, setLoading] = useState(false);

  const deleteMember = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.delete(`/users/member/${memberId}`);
      console.log(res);
      setLoading(false);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId)
      );
      document.getElementById(`${dialogId}`).close();
      setShowSuccess(true);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <dialog id={dialogId} className="modal">
        <div className="modal-box">
          <h3 className="prose">Czy na pewno chcesz usunąć tego członka?</h3>
          <p className="prose font-normal">
            Usuniesz wszystkie związane z nim dane.
          </p>

          <div className="modal-action">
            {loading ? (
              <button className="btn btn-error">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button onClick={deleteMember} className="btn btn-error">
                Usuń
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

export default DelMemberModal;
