import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const UserStatsChart = ({ attendances, totalEvents }) => {
  const percentage = ((attendances / totalEvents) * 100).toFixed(1);

  const COLORS = ["oklch(var(--p))", "oklch(var(--n))"];

  const data = [
    { name: "Obecności", value: attendances },
    { name: "Brak obecności", value: totalEvents - attendances },
  ];

  return (
    <div
      style={{ height: 300, pointerEvents: "none" }}
      className="text-center my-4 prose w-full md:w-1/3"
    >
      <span className="font-bold text-base-content">
        Obecności w bieżącym miesiącu
      </span>
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
            fill="oklch(var(--p))"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={0}
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
            fill="oklch(var(--bc))"
          >
            {`${percentage}%`}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatsChart;
