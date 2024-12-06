import React, { useState } from "react";
import Member from "./Member";
import InviteMemberModal from "../modals/InviteMemberModal";
import Toast from "../Toast";
import ErrorCard from "../ErrorCard";

const MembersList = ({ members, setMembers, role, loading }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <>
      {role === "OWNER" && !loading && members.length > 0 && (
        <div className="card bg-base-100 shadow-2xl w-96 sm:w-auto lg:w-[720px] h-[28rem] lg:h-[36rem] animate-in fade-in zoom-in">
          <div className="card-body items-center justify-center mx-auto gap-8 h-full">
            <div className="text-xl lg:text-2xl hover:bg-transparent w-3/4 pointer-events-none flex justify-center">
              <span className="font-bold">Członkowie</span>
            </div>
            <div className="overflow-y-auto overflow-x-hidden">
              <table className="table table-xs sm:table-sm md:table-md lg:table-lg table-pin-rows mr-8">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Rola</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <Member
                      key={member.id}
                      member={member}
                      setMembers={setMembers}
                    />
                  ))}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Rola</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                document.getElementById("inv_member").showModal();
              }}
            >
              Dodaj członka
            </button>
          </div>
        </div>
      )}
      {role === "OWNER" && !loading && members.length === 0 && (
        <div className="card bg-base-100 shadow-2xl w-96 sm:w-auto lg:w-[720px] h-[28rem] lg:h-[36rem] animate-in fade-in zoom-in">
          <div className="card-body items-center justify-center mx-auto gap-8 h-full">
            <div className="text-xl lg:text-2xl hover:bg-transparent w-3/4 pointer-events-none flex justify-center">
              <span className="font-bold">Członkowie</span>
            </div>
            <div className="text-base md:text-lg lg:text-xl pointer-events-none flex justify-center">
              W twoim klubie nie ma jeszcze członków
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                document.getElementById("inv_member").showModal();
              }}
            >
              Dodaj członka
            </button>
          </div>
        </div>
      )}
      {role !== "OWNER" && !loading && (
        <ErrorCard
          error="401 Brak Dostępu"
          message="Przepraszamy, nie masz uprawnień do dostępu do tej strony. Zaloguj się
          przy użyciu odpowiednich danych uwierzytelniających."
        />
      )}
      <InviteMemberModal setShowSuccess={setShowSuccess} />
      {showSuccess && (
        <Toast
          message="Pomyślnie wysłano zaproszenie."
          type="success"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
};

export default MembersList;
