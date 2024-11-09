import React from "react";
import { useUserContext } from "../../context/UserContext";
import Unauthorized from "../errors_page/Unauthorized";
import { Link } from "react-router-dom";

const MemberCard = ({ member }) => {
  const { role } = useUserContext();
  console.log(member);

  return (
    <>
      {role === "OWNER" ? (
        <div className="card bg-base-100 shadow-2xl w-96 lg:w-[480px] animate-in fade-in zoom-in">
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
            <div className="flex items-center justify-start">
              <Link to="/members" className="btn btn-primary">
                Wróć
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default MemberCard;
