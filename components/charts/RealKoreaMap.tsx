"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface RegionData {
  region: string;
  participants: number;
  avgFitAge: number;
  maleRatio: number;
  grade: { gold: number; silver: number; bronze: number };
}

interface RealKoreaMapProps {
  data: RegionData[];
  onRegionSelect?: (region: string | null) => void;
  selectedRegion?: string | null;
}

// 각 지역의 중심 좌표
const regionCoordinates: Record<string, [number, number]> = {
  "서울": [37.5665, 126.9780],
  "부산": [35.1796, 129.0756],
  "대구": [35.8714, 128.6014],
  "인천": [37.4563, 126.7052],
  "광주": [35.1595, 126.8526],
  "대전": [36.3504, 127.3845],
  "울산": [35.5384, 129.3114],
  "세종": [36.4800, 127.2890],
  "경기": [37.4138, 127.5183],
  "강원": [37.8228, 128.1555],
  "충북": [36.6357, 127.4917],
  "충남": [36.5184, 126.8000],
  "전북": [35.7175, 127.1530],
  "전남": [34.8679, 126.9910],
  "경북": [36.4919, 128.8889],
  "경남": [35.4606, 128.2132],
  "제주": [33.4890, 126.4983],
};

// Leaflet은 SSR에서 작동하지 않으므로 동적 임포트 필요
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
);

export default function RealKoreaMap({ data, onRegionSelect, selectedRegion }: RealKoreaMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRegionData = (regionName: string) => {
    return data.find((r) => r.region === regionName);
  };

  const getMarkerRadius = (participants: number) => {
    if (participants >= 100000) return 25;
    if (participants >= 50000) return 20;
    if (participants >= 30000) return 16;
    if (participants >= 15000) return 13;
    return 10;
  };

  const getMarkerColor = (avgFitAge: number) => {
    if (avgFitAge <= -1.0) return "#10B981"; // 매우 좋음 - 녹색
    if (avgFitAge < 0) return "#34D399"; // 좋음 - 연녹색
    if (avgFitAge === 0) return "#FBBF24"; // 평균 - 노랑
    if (avgFitAge <= 0.5) return "#F97316"; // 보통 - 주황
    return "#EF4444"; // 개선필요 - 빨강
  };

  const handleRegionClick = (regionName: string) => {
    if (onRegionSelect) {
      onRegionSelect(selectedRegion === regionName ? null : regionName);
    }
  };

  if (!isClient) {
    return (
      <div className="w-full h-[400px] bg-blue-50 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
          <p className="text-muted-foreground">지도 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200">
        <MapContainer
          center={[36.0, 127.8]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {Object.entries(regionCoordinates).map(([region, coords]) => {
            const regionData = getRegionData(region);
            if (!regionData) return null;

            const isSelected = selectedRegion === region;

            return (
              <CircleMarker
                key={region}
                center={coords}
                radius={getMarkerRadius(regionData.participants)}
                pathOptions={{
                  fillColor: getMarkerColor(regionData.avgFitAge),
                  color: isSelected ? "#1E3A8A" : "#fff",
                  weight: isSelected ? 3 : 2,
                  opacity: 1,
                  fillOpacity: 0.8,
                }}
                eventHandlers={{
                  click: () => handleRegionClick(region),
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} permanent={false}>
                  <div className="text-center font-medium">{region}</div>
                </Tooltip>
                <Popup>
                  <div className="min-w-[180px]">
                    <h3 className="font-bold text-lg mb-2 text-blue-900 border-b pb-1">{region}</h3>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">측정 인원</span>
                        <span className="font-bold text-blue-600">{regionData.participants.toLocaleString()}명</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">평균 피트에이지</span>
                        <span className={`font-bold ${regionData.avgFitAge < 0 ? "text-emerald-600" : regionData.avgFitAge > 0 ? "text-red-500" : "text-gray-600"}`}>
                          {regionData.avgFitAge > 0 ? "+" : ""}{regionData.avgFitAge}세
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">남성 비율</span>
                        <span className="font-medium">{regionData.maleRatio}%</span>
                      </div>
                      <div className="pt-1.5 border-t mt-1.5">
                        <div className="flex gap-1 flex-wrap">
                          <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">골드 {regionData.grade.gold}%</span>
                          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">실버 {regionData.grade.silver}%</span>
                          <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">브론즈 {regionData.grade.bronze}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 p-4 bg-white rounded-xl border">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">원 크기: 측정 인원</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-blue-400 opacity-70" />
                <span>10만+</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-blue-400 opacity-70" />
                <span>5만+</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-400 opacity-70" />
                <span>3만+</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">색상: 피트에이지</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10B981" }} />
                <span>-1세 이하</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#34D399" }} />
                <span>0세 미만</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F97316" }} />
                <span>0~0.5세</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EF4444" }} />
                <span>0.5세 초과</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
