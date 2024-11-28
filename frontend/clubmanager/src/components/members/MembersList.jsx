import React, { useEffect } from "react";
import Member from "./Member";
import Unauthorized from "../errors_page/Unauthorized";

const MembersList = ({ members, role, loading }) => {
  return (
    <>
      {role === "OWNER" && !loading ? (
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
                    <Member key={member.id} member={member} />
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
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default MembersList;
