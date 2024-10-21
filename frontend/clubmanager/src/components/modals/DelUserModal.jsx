import React from "react";

const DelUserModal = ({ del, loading }) => {
  return (
    <div>
      <dialog id="del_user" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Czy na pewno chcesz usunąć?</h3>
          <p className="py-4">
            Usunięcie konta spowoduje skasowanie klubu oraz wszystkich
            powiązanych z nim członków.
          </p>
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
