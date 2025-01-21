import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#FCD34D", "#3F3F46"];

const UserStatsChart = ({ attendances, totalEvents }) => {
  const percentage = ((attendances / totalEvents) * 100).toFixed(1);

  const data = [
    { name: "Obecności", value: attendances },
    { name: "Brak obecności", value: totalEvents - attendances },
  ];

  return (
    <div
      style={{ height: 300, pointerEvents: "none" }}
      className="text-center my-4 prose w-full md:w-1/3"
    >
      <span className="font-bold">Obecności w bieżącym miesiącu</span>
      <ResponsiveContainer className="">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={24}
            fontWeight="bold"
            fill="#333"
          >
            {`${percentage}%`}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatsChart;
