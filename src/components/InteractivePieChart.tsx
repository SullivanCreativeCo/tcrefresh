import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

export interface PhaseData {
  id: string;
  name: string;
  value: number;
  color: string;
  description: string;
  category: "top" | "mid" | "post";
}

const phases: PhaseData[] = [
  { id: "branding", name: "Branding", value: 1, color: "#4F8BFF", description: "How prospects see you", category: "top" },
  { id: "marketing", name: "Marketing", value: 1, color: "#00A3E0", description: "Actions to reach your ICP", category: "top" },
  { id: "awareness", name: "Awareness", value: 1, color: "#00B8A9", description: "Content that stays top of mind", category: "top" },
  { id: "leadgen", name: "LeadGen", value: 1, color: "#00C896", description: "Convert consumers to meetings", category: "top" },
  { id: "bdr", name: "BDR", value: 1, color: "#4CAF50", description: "Outbound to your ICP", category: "mid" },
  { id: "sales", name: "Sales", value: 1, color: "#8BC34A", description: "Qualify urgency and budget fit", category: "mid" },
  { id: "closing", name: "Closing", value: 1, color: "#FFC107", description: "Proposals reviewed and signed", category: "mid" },
  { id: "implementation", name: "Implementation", value: 1, color: "#FF9800", description: "Deploy and onboard", category: "post" },
  { id: "touchpoints", name: "Ongoing Support", value: 1, color: "#F44336", description: "Justify the relationship", category: "post" },
  { id: "reviews", name: "Annual Reviews", value: 1, color: "#9632B8", description: "Tabletops, scans, and tolerance", category: "post" },
];

const renderActiveShape = (props: {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
}) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: `drop-shadow(0 0 20px ${fill}80)`,
          transition: "all 0.3s ease-out",
        }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
        opacity={0.6}
      />
    </g>
  );
};

interface InteractivePieChartProps {
  onPhaseClick?: (phase: PhaseData) => void;
  selectedPhase?: string | null;
}

export function InteractivePieChart({ onPhaseClick, selectedPhase }: InteractivePieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const handleClick = (_: unknown, index: number) => {
    if (onPhaseClick) {
      onPhaseClick(phases[index]);
    }
  };

  const displayIndex = selectedPhase
    ? phases.findIndex(p => p.id === selectedPhase)
    : activeIndex;

  const activePhase = displayIndex !== undefined && displayIndex >= 0 ? phases[displayIndex] : null;

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = {
      x: x + radius * Math.cos((Math.PI * startAngle) / 180),
      y: y + radius * Math.sin((Math.PI * startAngle) / 180),
    };
    const end = {
      x: x + radius * Math.cos((Math.PI * endAngle) / 180),
      y: y + radius * Math.sin((Math.PI * endAngle) / 180),
    };
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  const stages = [
    { name: "Go to Market", startAngle: -90, endAngle: 54, color: "#4F8BFF" },
    { name: "Sales", startAngle: 54, endAngle: 162, color: "#8BC34A" },
    { name: "Customer Success", startAngle: 162, endAngle: 270, color: "#F44336" },
  ];

  const outerLabelRadius = 220;
  const centerX = 300;
  const centerY = 300;

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      {/* Outer arc labels */}
      <svg
        className="absolute pointer-events-none"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <defs>
          {stages.map((stage, i) => (
            <path
              key={`arc-path-${i}`}
              id={`arc-${i}`}
              d={describeArc(centerX, centerY, outerLabelRadius, stage.startAngle, stage.endAngle)}
              fill="none"
            />
          ))}
        </defs>

        {stages.map((stage, i) => (
          <g key={`stage-label-${i}`}>
            <path
              d={describeArc(centerX, centerY, outerLabelRadius - 10, stage.startAngle, stage.endAngle)}
              fill="none"
              stroke={stage.color}
              strokeWidth="2"
              opacity="0.4"
            />
            <text
              fill={stage.color}
              fontSize="12"
              fontWeight="600"
              letterSpacing="0.1em"
              className="uppercase"
            >
              <textPath
                href={`#arc-${i}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {stage.name}
              </textPath>
            </text>
          </g>
        ))}
      </svg>

      <ResponsiveContainer width="100%" height={600}>
        <PieChart>
          <Pie
            activeIndex={displayIndex}
            activeShape={renderActiveShape}
            data={phases}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={180}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            onClick={handleClick}
            className="cursor-pointer focus:outline-none"
          >
            {phases.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="#0a0e1a"
                strokeWidth={2}
                className="transition-all duration-300 hover:brightness-110"
                style={{
                  filter: displayIndex === index ? `drop-shadow(0 0 15px ${entry.color}80)` : "none",
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Dynamic center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center transition-all duration-300">
          {activePhase ? (
            <>
              <h2
                className="text-xl font-bold transition-colors duration-300"
                style={{ color: activePhase.color }}
              >
                {activePhase.name}
              </h2>
              <p className="text-sm text-slate-400 max-w-[150px] mt-1">
                {activePhase.description}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white">Anchor Point</h2>
              <p className="text-sm text-slate-400">Methodology</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { phases };
