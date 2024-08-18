import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React, { memo } from "react";

const BarChartCompo = memo(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="examType" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avgAccuracyPercent" fill="#82ca9d" />
        <Bar dataKey="avgMistakePercent" fill="#8884d8" />
        <Bar dataKey="avgUnattendedPercent" fill="pink" />
      </BarChart>
    </ResponsiveContainer>
  );
});

export default BarChartCompo;
