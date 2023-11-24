import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function LineChart({ data }: { data: any }) {
  const { maxCategory, maxJobs } = data.reduce(
    (max: any, current: any) => {
      const jobs = parseInt(current.jobs, 10); // Convert jobs to an integer
      if (jobs > max.maxJobs) {
        return { maxCategory: current.category, maxJobs: jobs };
      } else {
        return max;
      }
    },
    { maxCategory: "", maxJobs: -1 }
  );
  // console.log("data:data:", data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="category"
          tick={{
            fontSize: "14px",
            fontWeight: 500,
            overflow: "hidden",
          }}
        />
        <YAxis domain={[0, maxJobs ? maxJobs : 40000]} />
        <Bar
          dataKey="jobs"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {data.map((entry: any, index: any) => (
            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
