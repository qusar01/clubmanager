import React from "react";

const ClubRanking = ({ ranking }) => {
  return (
    <div className="w-full md:w-1/3 text-center h-[300px] flex flex-col justify-between">
      <span className="prose font-bold">Ranking według obecności</span>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Imię</th>
              <th>Nazwisko</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((entry, index) => (
              <tr key={entry.memberId}>
                <th>{index + 1}</th>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
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
