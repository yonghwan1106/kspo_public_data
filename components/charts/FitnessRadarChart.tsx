"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ScoreData {
  value: number;
  percentile: number;
  rating: string;
  zScore: number;
}

interface FitnessScores {
  grip: ScoreData;
  sitUp: ScoreData;
  flexibility: ScoreData;
  standingJump: ScoreData;
  shuttleRun?: ScoreData;
  overall: number;
}

interface FitnessRadarChartProps {
  scores: FitnessScores;
  gender: "male" | "female";
}

export default function FitnessRadarChart({ scores, gender }: FitnessRadarChartProps) {
  // Normalize percentile to 0-100 scale for the chart
  const data = [
    {
      subject: "악력",
      나의체력: scores.grip.percentile,
      평균: 50,
      fullMark: 100,
    },
    {
      subject: "근지구력",
      나의체력: scores.sitUp.percentile,
      평균: 50,
      fullMark: 100,
    },
    {
      subject: "유연성",
      나의체력: scores.flexibility.percentile,
      평균: 50,
      fullMark: 100,
    },
    {
      subject: "순발력",
      나의체력: scores.standingJump.percentile,
      평균: 50,
      fullMark: 100,
    },
  ];

  // Add shuttle run if available
  if (scores.shuttleRun) {
    data.push({
      subject: "심폐지구력",
      나의체력: scores.shuttleRun.percentile,
      평균: 50,
      fullMark: 100,
    });
  }

  return (
    <div className="w-full">
      <div className="h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#E5E7EB" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              tickCount={5}
            />
            <Radar
              name="평균 (50%)"
              dataKey="평균"
              stroke="#9CA3AF"
              fill="#E5E7EB"
              fillOpacity={0.3}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Radar
              name="나의 체력"
              dataKey="나의체력"
              stroke={gender === "male" ? "#3B82F6" : "#EC4899"}
              fill={gender === "male" ? "#3B82F6" : "#EC4899"}
              fillOpacity={0.4}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              formatter={(value: number, name: string) => [
                `${value}%`,
                name === "나의체력" ? "백분위" : name,
              ]}
            />
            <Legend
              wrapperStyle={{ paddingTop: "10px" }}
              iconType="circle"
              iconSize={8}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Score breakdown */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
        {data.map((item) => (
          <div
            key={item.subject}
            className={`p-2 rounded-lg ${
              item.나의체력 >= 70
                ? "bg-emerald-50 text-emerald-700"
                : item.나의체력 >= 40
                ? "bg-blue-50 text-blue-700"
                : "bg-orange-50 text-orange-700"
            }`}
          >
            <p className="font-medium">{item.subject}</p>
            <p className="text-lg font-bold">{item.나의체력}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
