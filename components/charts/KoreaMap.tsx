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

// Real SVG paths for Korean provinces (based on actual geographic boundaries)
const koreaProvinces: Record<string, { d: string; name: string; labelPos: [number, number] }> = {
  seoul: {
    name: "서울",
    labelPos: [126.978, 37.566],
    d: "M126.734,37.715 L127.184,37.701 L127.269,37.549 L127.183,37.428 L126.764,37.428 L126.734,37.715Z"
  },
  incheon: {
    name: "인천",
    labelPos: [126.705, 37.456],
    d: "M126.380,37.752 L126.734,37.715 L126.764,37.428 L126.633,37.358 L126.387,37.194 L126.117,37.306 L125.984,37.513 L126.121,37.693 L126.380,37.752Z"
  },
  gyeonggi: {
    name: "경기",
    labelPos: [127.009, 37.275],
    d: "M126.387,37.194 L126.633,37.358 L126.764,37.428 L127.183,37.428 L127.269,37.549 L127.184,37.701 L127.445,37.895 L127.782,37.744 L127.893,37.538 L128.033,37.275 L127.949,36.992 L127.584,36.784 L127.183,36.784 L126.928,36.943 L126.633,36.943 L126.328,37.023 L126.117,37.118 L126.387,37.194Z"
  },
  gangwon: {
    name: "강원",
    labelPos: [128.209, 37.555],
    d: "M127.893,37.538 L127.782,37.744 L127.445,37.895 L127.503,38.109 L127.782,38.301 L128.126,38.512 L128.561,38.598 L129.084,38.512 L129.361,38.284 L129.434,37.901 L129.258,37.538 L128.883,37.306 L128.473,37.194 L128.033,37.275 L127.893,37.538Z"
  },
  chungbuk: {
    name: "충북",
    labelPos: [127.729, 36.828],
    d: "M127.183,36.784 L127.584,36.784 L127.949,36.992 L128.033,37.275 L128.473,37.194 L128.517,36.873 L128.341,36.549 L127.949,36.383 L127.584,36.383 L127.314,36.549 L127.183,36.784Z"
  },
  chungnam: {
    name: "충남",
    labelPos: [126.800, 36.518],
    d: "M126.117,37.118 L126.328,37.023 L126.633,36.943 L126.928,36.943 L127.183,36.784 L127.314,36.549 L127.093,36.306 L126.764,36.118 L126.387,36.043 L126.082,36.118 L125.866,36.383 L125.778,36.623 L125.954,36.873 L126.117,37.118Z"
  },
  sejong: {
    name: "세종",
    labelPos: [127.044, 36.595],
    d: "M127.093,36.549 L127.183,36.623 L127.270,36.549 L127.183,36.458 L127.093,36.549Z"
  },
  daejeon: {
    name: "대전",
    labelPos: [127.385, 36.351],
    d: "M127.183,36.458 L127.270,36.549 L127.401,36.458 L127.489,36.306 L127.401,36.194 L127.227,36.194 L127.183,36.306 L127.183,36.458Z"
  },
  jeonbuk: {
    name: "전북",
    labelPos: [127.108, 35.716],
    d: "M126.082,36.118 L126.387,36.043 L126.764,36.118 L127.093,36.306 L127.227,36.194 L127.183,35.943 L126.989,35.698 L126.633,35.549 L126.270,35.549 L125.866,35.698 L125.690,35.943 L125.778,36.118 L126.082,36.118Z"
  },
  jeonnam: {
    name: "전남",
    labelPos: [126.725, 34.896],
    d: "M125.690,35.943 L125.866,35.698 L126.270,35.549 L126.633,35.549 L126.989,35.698 L127.183,35.549 L127.051,35.306 L126.764,35.043 L126.387,34.784 L126.015,34.623 L125.602,34.623 L125.297,34.784 L125.078,35.043 L124.991,35.383 L125.078,35.623 L125.341,35.784 L125.690,35.943Z"
  },
  gwangju: {
    name: "광주",
    labelPos: [126.852, 35.160],
    d: "M126.764,35.260 L126.895,35.194 L126.895,35.043 L126.764,34.992 L126.633,35.043 L126.633,35.194 L126.764,35.260Z"
  },
  gyeongbuk: {
    name: "경북",
    labelPos: [128.729, 36.248],
    d: "M128.341,36.549 L128.517,36.873 L128.473,37.194 L128.883,37.306 L129.258,37.538 L129.434,37.194 L129.565,36.784 L129.478,36.383 L129.214,35.992 L128.883,35.698 L128.473,35.549 L128.077,35.549 L127.762,35.698 L127.584,35.943 L127.584,36.306 L127.949,36.383 L128.341,36.549Z"
  },
  gyeongnam: {
    name: "경남",
    labelPos: [128.241, 35.259],
    d: "M127.183,35.549 L127.584,35.698 L127.762,35.698 L128.077,35.549 L128.473,35.549 L128.692,35.306 L128.561,34.992 L128.253,34.784 L127.849,34.623 L127.445,34.623 L127.095,34.784 L126.895,34.992 L126.989,35.306 L127.183,35.549Z"
  },
  daegu: {
    name: "대구",
    labelPos: [128.601, 35.871],
    d: "M128.473,35.943 L128.604,35.992 L128.736,35.943 L128.780,35.784 L128.692,35.623 L128.517,35.549 L128.341,35.623 L128.341,35.784 L128.473,35.943Z"
  },
  ulsan: {
    name: "울산",
    labelPos: [129.311, 35.539],
    d: "M129.084,35.698 L129.214,35.784 L129.434,35.698 L129.521,35.459 L129.390,35.260 L129.170,35.194 L128.995,35.306 L129.039,35.549 L129.084,35.698Z"
  },
  busan: {
    name: "부산",
    labelPos: [129.075, 35.180],
    d: "M128.780,35.306 L128.995,35.306 L129.170,35.194 L129.170,34.992 L129.039,34.855 L128.824,34.855 L128.649,34.992 L128.649,35.194 L128.780,35.306Z"
  },
  jeju: {
    name: "제주",
    labelPos: [126.531, 33.380],
    d: "M126.117,33.549 L126.451,33.623 L126.851,33.549 L127.051,33.383 L126.939,33.194 L126.582,33.043 L126.180,33.043 L125.910,33.194 L125.866,33.383 L126.117,33.549Z"
  }
};

// Transform geo coordinates to SVG coordinates
const transformCoords = (lng: number, lat: number): [number, number] => {
  const minLng = 124.5;
  const maxLng = 130.0;
  const minLat = 32.8;
  const maxLat = 38.8;

  const width = 400;
  const height = 500;

  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const y = height - ((lat - minLat) / (maxLat - minLat)) * height;

  return [x, y];
};

// Transform path data
const transformPath = (d: string): string => {
  return d.replace(/([0-9.-]+),([0-9.-]+)/g, (_, lng, lat) => {
    const [x, y] = transformCoords(parseFloat(lng), parseFloat(lat));
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
};

export default function KoreaMap({ data, onRegionSelect, selectedRegion }: KoreaMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getRegionData = (regionName: string) => {
    return data.find((r) => r.region === regionName);
  };

  const getRegionColor = (regionName: string) => {
    const regionData = getRegionData(regionName);
    if (!regionData) return "#E5E7EB";

    const participants = regionData.participants;
    // Color gradient based on participants
    if (participants >= 100000) return "#1E40AF"; // Deep blue
    if (participants >= 50000) return "#3B82F6"; // Blue
    if (participants >= 30000) return "#60A5FA"; // Light blue
    if (participants >= 15000) return "#93C5FD"; // Lighter blue
    return "#BFDBFE"; // Very light blue
  };

  const handleRegionClick = (regionName: string) => {
    if (onRegionSelect) {
      onRegionSelect(selectedRegion === regionName ? null : regionName);
    }
  };

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 400 500" className="w-full h-auto" style={{ maxHeight: "500px" }}>
        {/* Background */}
        <rect x="0" y="0" width="400" height="500" fill="#F0F9FF" rx="12" />

        {/* Sea pattern */}
        <defs>
          <pattern id="wave" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M0 10 Q5 5, 10 10 T20 10" fill="none" stroke="#BFDBFE" strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="400" height="500" fill="url(#wave)" />

        {/* Draw all regions */}
        {Object.entries(koreaProvinces).map(([key, province]) => {
          const isHovered = hoveredRegion === province.name;
          const isSelected = selectedRegion === province.name;
          const regionData = getRegionData(province.name);
          const transformedPath = transformPath(province.d);

          return (
            <g key={key}>
              {/* Shadow */}
              <path
                d={transformedPath}
                fill="rgba(0,0,0,0.1)"
                transform="translate(2, 2)"
              />
              {/* Main path */}
              <path
                d={transformedPath}
                fill={getRegionColor(province.name)}
                stroke={isSelected ? "#1E3A8A" : isHovered ? "#2563EB" : "#64748B"}
                strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredRegion(province.name)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => handleRegionClick(province.name)}
                style={{
                  filter: isHovered || isSelected ? "brightness(1.1)" : "none",
                }}
              />
              {/* Region label */}
              {(() => {
                const [x, y] = transformCoords(province.labelPos[0], province.labelPos[1]);
                const isSmall = ["서울", "인천", "대전", "세종", "광주", "울산", "대구", "부산"].includes(province.name);
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none font-medium"
                    fontSize={isSmall ? "8" : "10"}
                    fill="#1E293B"
                  >
                    {province.name}
                  </text>
                );
              })()}
            </g>
          );
        })}

        {/* Title */}
        <text x="200" y="25" textAnchor="middle" className="font-bold" fontSize="16" fill="#1E3A8A">
          대한민국 체력측정 현황
        </text>
      </svg>

      {/* Tooltip */}
      {hoveredRegion && (
        <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-4 min-w-[200px] z-10 border border-blue-100">
          {(() => {
            const regionData = getRegionData(hoveredRegion);
            if (!regionData) return <p className="text-sm text-muted-foreground">데이터 없음</p>;
            return (
              <>
                <h3 className="font-bold text-lg mb-3 text-blue-900 border-b pb-2">{hoveredRegion}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">측정 인원</span>
                    <span className="font-bold text-blue-600">{regionData.participants.toLocaleString()}명</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">평균 피트에이지</span>
                    <span className={`font-bold ${regionData.avgFitAge < 0 ? "text-emerald-600" : regionData.avgFitAge > 0 ? "text-red-500" : "text-gray-600"}`}>
                      {regionData.avgFitAge > 0 ? "+" : ""}{regionData.avgFitAge}세
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">남성 비율</span>
                    <span className="font-medium">{regionData.maleRatio}%</span>
                  </div>
                  <div className="pt-2 border-t mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">등급 분포</span>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">골드 {regionData.grade.gold}%</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">실버 {regionData.grade.silver}%</span>
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">브론즈 {regionData.grade.bronze}%</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 p-4 bg-white rounded-xl border">
        <p className="text-sm font-medium text-gray-700 mb-2">측정 인원 기준</p>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#1E40AF" }} />
            <span>10만명 이상</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#3B82F6" }} />
            <span>5만~10만명</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#60A5FA" }} />
            <span>3만~5만명</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#93C5FD" }} />
            <span>1.5만~3만명</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#BFDBFE" }} />
            <span>1.5만명 미만</span>
          </div>
        </div>
      </div>
    </div>
  );
}
