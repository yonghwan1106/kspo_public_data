"use client";

import { useState } from "react";

interface RegionData {
  region: string;
  participants: number;
  avgFitAge: number;
  maleRatio: number;
  grade: { gold: number; silver: number; bronze: number };
}

interface KoreaMapProps {
  data: RegionData[];
  onRegionSelect?: (region: string | null) => void;
  selectedRegion?: string | null;
}

// SVG paths for Korean provinces (simplified)
const regionPaths: Record<string, { path: string; center: [number, number] }> = {
  서울: {
    path: "M145,95 L155,92 L160,97 L158,105 L150,108 L143,103 Z",
    center: [151, 100],
  },
  인천: {
    path: "M125,95 L138,90 L143,98 L140,108 L130,110 L122,103 Z",
    center: [132, 100],
  },
  경기: {
    path: "M115,70 L170,65 L180,85 L175,120 L165,130 L140,135 L115,125 L105,100 L108,80 Z",
    center: [142, 100],
  },
  강원: {
    path: "M175,55 L220,45 L245,70 L250,110 L235,140 L200,150 L175,130 L170,100 L175,70 Z",
    center: [210, 95],
  },
  충북: {
    path: "M155,135 L190,130 L200,150 L195,175 L170,185 L150,175 L145,155 Z",
    center: [172, 158],
  },
  충남: {
    path: "M95,135 L145,130 L150,155 L145,180 L120,195 L85,185 L75,160 L80,140 Z",
    center: [115, 163],
  },
  대전: {
    path: "M145,175 L158,172 L162,182 L155,190 L145,188 L142,180 Z",
    center: [152, 182],
  },
  세종: {
    path: "M130,165 L142,162 L145,172 L140,178 L128,175 Z",
    center: [136, 170],
  },
  전북: {
    path: "M75,195 L130,190 L140,210 L135,240 L100,255 L65,245 L55,220 L60,200 Z",
    center: [100, 222],
  },
  전남: {
    path: "M45,250 L100,245 L120,260 L125,295 L110,320 L75,330 L40,315 L25,280 L30,255 Z",
    center: [75, 288],
  },
  광주: {
    path: "M78,265 L92,262 L98,275 L92,285 L78,282 Z",
    center: [87, 273],
  },
  경북: {
    path: "M195,145 L245,130 L270,155 L275,200 L255,235 L215,245 L185,230 L175,195 L180,160 Z",
    center: [225, 188],
  },
  대구: {
    path: "M210,220 L230,215 L238,228 L232,242 L215,245 L208,235 Z",
    center: [222, 230],
  },
  경남: {
    path: "M145,245 L200,235 L220,255 L225,290 L200,315 L160,320 L130,300 L125,270 L135,250 Z",
    center: [175, 280],
  },
  울산: {
    path: "M245,240 L265,235 L275,250 L270,268 L252,272 L242,258 Z",
    center: [258, 253],
  },
  부산: {
    path: "M225,295 L250,288 L265,305 L260,325 L240,330 L222,318 L218,305 Z",
    center: [242, 310],
  },
  제주: {
    path: "M55,380 L105,375 L115,395 L100,415 L60,420 L40,400 L45,385 Z",
    center: [78, 398],
  },
};

export default function KoreaMap({ data, onRegionSelect, selectedRegion }: KoreaMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getRegionData = (regionName: string) => {
    return data.find((r) => r.region === regionName);
  };

  const getRegionColor = (regionName: string) => {
    const regionData = getRegionData(regionName);
    if (!regionData) return "#E5E7EB";

    const avgFitAge = regionData.avgFitAge;
    // Color gradient from green (negative/younger) to red (positive/older)
    if (avgFitAge <= -1.5) return "#10B981"; // Emerald
    if (avgFitAge <= -1.0) return "#34D399";
    if (avgFitAge <= -0.5) return "#6EE7B7";
    if (avgFitAge <= 0) return "#A7F3D0";
    if (avgFitAge <= 0.5) return "#FDE68A";
    if (avgFitAge <= 1.0) return "#FBBF24";
    return "#EF4444"; // Red
  };

  const handleRegionClick = (regionName: string) => {
    if (onRegionSelect) {
      onRegionSelect(selectedRegion === regionName ? null : regionName);
    }
  };

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 300 450" className="w-full h-auto">
        {/* Background */}
        <rect x="0" y="0" width="300" height="450" fill="#F8FAFC" rx="8" />

        {/* Sea */}
        <rect x="0" y="0" width="300" height="450" fill="#E0F2FE" rx="8" />

        {/* Draw all regions */}
        {Object.entries(regionPaths).map(([regionName, { path }]) => {
          const isHovered = hoveredRegion === regionName;
          const isSelected = selectedRegion === regionName;
          const regionData = getRegionData(regionName);

          return (
            <g key={regionName}>
              <path
                d={path}
                fill={getRegionColor(regionName)}
                stroke={isSelected ? "#1D4ED8" : isHovered ? "#3B82F6" : "#94A3B8"}
                strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredRegion(regionName)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => handleRegionClick(regionName)}
                style={{
                  filter: isHovered || isSelected ? "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" : "none",
                }}
              />
            </g>
          );
        })}

        {/* Region labels */}
        {Object.entries(regionPaths).map(([regionName, { center }]) => {
          const regionData = getRegionData(regionName);
          const isSmallRegion = ["서울", "인천", "대전", "세종", "광주", "울산", "대구", "부산"].includes(regionName);

          return (
            <g key={`label-${regionName}`} pointerEvents="none">
              <text
                x={center[0]}
                y={center[1]}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-medium"
                fontSize={isSmallRegion ? "6" : "8"}
                fill="#374151"
              >
                {regionName}
              </text>
              {regionData && !isSmallRegion && (
                <text
                  x={center[0]}
                  y={center[1] + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="6"
                  fill={regionData.avgFitAge < 0 ? "#059669" : "#DC2626"}
                  fontWeight="bold"
                >
                  {regionData.avgFitAge > 0 ? "+" : ""}{regionData.avgFitAge}세
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredRegion && (
        <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-4 min-w-[180px] z-10 border">
          {(() => {
            const regionData = getRegionData(hoveredRegion);
            if (!regionData) return null;
            return (
              <>
                <h3 className="font-bold text-lg mb-2">{hoveredRegion}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">측정 인원</span>
                    <span className="font-medium">{regionData.participants.toLocaleString()}명</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">피트에이지</span>
                    <span className={`font-bold ${regionData.avgFitAge < 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {regionData.avgFitAge > 0 ? "+" : ""}{regionData.avgFitAge}세
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">남성 비율</span>
                    <span className="font-medium">{regionData.maleRatio}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">골드등급</span>
                    <span className="font-medium text-yellow-600">{regionData.grade.gold}%</span>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: "#10B981" }} />
          <span>-1.5세 이하</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: "#6EE7B7" }} />
          <span>-0.5~-1세</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: "#A7F3D0" }} />
          <span>0세 이하</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: "#FDE68A" }} />
          <span>0~0.5세</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: "#FBBF24" }} />
          <span>0.5세 이상</span>
        </div>
      </div>
    </div>
  );
}
