import React from "react";

const ClubRanking = ({ ranking, isComp, totalEvents }) => {
  return (
    <div
      className={`w-full md:w-1/3 text-center h-[300px] flex flex-col justify-between ${
        isComp ? "" : "md:w-4/5 items-center"
      }`}
    >
      <span className="prose font-bold text-base-content">
        Ranking według obecności
      </span>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Imię</th>
              <th>Nazwisko</th>
              {!isComp && <th>Obecności</th>}
            </tr>
          </thead>
          <tbody>
            {ranking.map((entry, index) => (
              <tr key={entry.memberId}>
                <th>{index + 1}</th>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                {!isComp && (
                  <td>
                    {entry.attendanceCount}/{totalEvents}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};

export default ClubRanking;
