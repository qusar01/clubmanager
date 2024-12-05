import React from "react";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import ErrorCard from "../ErrorCard";

const MemberCard = ({ member }) => {
  const { role } = useUserContext();
  console.log(member);

  return (
    <>
      {role === "OWNER" ? (
        <div className="card bg-base-100 shadow-2xl w-96 lg:w-[480px] animate-in fade-in zoom-in">
          <div className="text-xl lg:text-2xl hover:bg-transparent w-3/4 pointer-events-none flex justify-center mx-auto pt-4">
            <span className="font-bold">Szczegóły członka</span>
          </div>
          <div className="card-body h-full w-3/4 mx-auto gap-4">
            <div className="text-base lg:text-lg pointer-events-none flex justify-between items-center">
              <span className="font-bold">Imię:</span>
              <span className="flex-1 text-right">{member.firstName}</span>
            </div>
            <div className="text-base lg:text-lg pointer-events-none flex justify-between items-center">
              <span className="font-bold">Nazwisko:</span>
              <span className="flex-1 text-right">{member.lastName}</span>
            </div>
            <div className="text-base lg:text-lg pointer-events-none flex justify-between items-center">
              <span className="font-bold">Rola:</span>
              <span className="flex-1 text-right">
                {member.role === "COACH" ? "Trener" : "Zawodnik"}
              </span>
            </div>
            <div className="text-base lg:text-lg pointer-events-none flex justify-between items-center">
              <span className="font-bold">Email:</span>
              <span className="flex-1 text-right">{member.email}</span>
            </div>
            <div className="text-base lg:text-lg pointer-events-none flex justify-between items-center">
              <span className="font-bold break-words w-24">
                Data urodzenia:
              </span>
              <span className="flex-1 text-right">{member.birthDate}</span>
            </div>
            <div className="text-base lg:text-lg pointer-events-none flex justify-between items-center">
              <span className="font-bold break-words w-24">
                Numer telefonu:
              </span>
              <span className="flex-1 text-right">{member.phoneNumber}</span>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 mx-auto pb-4">
            <Link to="/members" className="btn btn-primary">
              Wróć
            </Link>
            <button className="btn btn-error">Usuń członka</button>
          </div>
        </div>
      ) : (
        <ErrorCard
          error="401 Brak Dostępu"
          message="Przepraszamy, nie masz uprawnień do dostępu do tej strony. Zaloguj się
          przy użyciu odpowiednich danych uwierzytelniających."
        />
      )}
    </>
  );
};

export default MemberCard;
