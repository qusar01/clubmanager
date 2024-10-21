import React from "react";

const DelUserModal = ({ del, loading, role }) => {
  return (
    <div>
      <dialog id="del_user" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Czy na pewno chcesz usunąć?</h3>
          {role === "OWNER" && (
            <p className="py-4">
              Usunięcie konta spowoduje skasowanie klubu oraz wszystkich
              powiązanych z nim członków.
            </p>
          )}
          {role === "COMPETITOR" && (
            <p className="py-4">
              Będziesz musiał uzyskać kolejne zaproszenie, aby założyć konto w
              tym klubie.
            </p>
          )}
          {role === "COACH" && (
            <p className="py-4">
              Usunięcie konta spowoduje skasowanie twoich treningów.
            </p>
          )}
          <div className="modal-action">
            {loading ? (
              <button className="btn btn-error">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button onClick={del} className="btn btn-error">
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

export default DelUserModal;
