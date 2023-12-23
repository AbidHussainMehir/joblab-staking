import React, {
  PureComponent,
  MouseEvent,
  ReactNode,
  ReactElement,
  JSXElementConstructor,
  useState,
} from "react";
import { PieChart, Cell, Pie, Sector, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  value: number;
  color: string;
}

const data: DataItem[] = [
  { name: "Presale", value: 25, color: "#cc8605" },
  { name: "Public Sale", value: 35, color: "#00C49F" },
  { name: "Team", value: 15, color: "#FF98FC" },
  { name: "Partnerships", value: 10, color: "#0088FE" },
  { name: "Bounty", value: 5, color: "#237809" },
  { name: "Reserves", value: 10, color: "#ff0000" },
];
const COLORS = [
  "#cc8605",
  "#00C49F",
  "#FF98FC",
  "#0088FE",
  "#237809",
  "#ff0000",
];

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: DataItem;
  percent: number;
  value: number;
}

interface ExampleState {
  activeIndex: number;
}

const Example = () => {
  const [state, setState] = useState({
    activeIndex: 0,
  });

  const onPieEnter = (_: MouseEvent, index: number) => {
    setState({
      activeIndex: index,
    });
  };
  const renderActiveShape = (props: ActiveShapeProps): ReactElement => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={payload.color}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={payload.color}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={payload.color}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />

        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill={payload.color}
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape as any}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default Example;
