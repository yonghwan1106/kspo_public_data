"use client";

import { useState } from "react";
import { MapPin, Users, TrendingUp, Award, BarChart3, PieChart, Filter, Map } from "lucide-react";
import { regionalStats, ageDistribution, summaryStats, fitnessStandards } from "@/lib/data/statistics";
import RealKoreaMap from "@/components/charts/RealKoreaMap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all");

  const sortedRegions = [...regionalStats].sort((a, b) => a.avgFitAge - b.avgFitAge);

  const gradeDistribution = [
    { name: "골드", value: summaryStats.goldGradeRate, color: "#F59E0B" },
    { name: "실버", value: summaryStats.silverGradeRate, color: "#9CA3AF" },
    { name: "브론즈", value: summaryStats.bronzeGradeRate, color: "#F97316" },
  ];

  const genderDistribution = [
    { name: "남성", value: summaryStats.maleParticipants, color: "#3B82F6" },
    { name: "여성", value: summaryStats.femaleParticipants, color: "#EC4899" },
  ];

  const ageChartData = ageDistribution.map((item) => ({
    name: item.ageGroup.replace("세", ""),
    male: genderFilter === "female" ? 0 : item.male,
    female: genderFilter === "male" ? 0 : item.female,
    total: genderFilter === "all" ? item.total : genderFilter === "male" ? item.male : item.female,
  }));

  // 연령대별 체력 변화 데이터
  const fitnessChangeData = fitnessStandards.map((item) => ({
    name: item.ageGroup.replace("세", ""),
    남성악력: item.male.grip.mean,
    여성악력: item.female.grip.mean,
    남성유연성: item.male.flexibility.mean,
    여성유연성: item.female.flexibility.mean,
  }));

  return (
    <div className="min-h-screen bg-muted/30 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">전국 체력 현황</h1>
          <p className="text-muted-foreground">
            국민체력측정 빅데이터로 보는 대한민국 체력 지도
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm text-muted-foreground">총 측정자</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold">{summaryStats.totalParticipants.toLocaleString()}</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-sm text-muted-foreground">평균 피트에이지</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-emerald-600">
              {summaryStats.avgFitAge > 0 ? "+" : ""}{summaryStats.avgFitAge}세
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Award className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-sm text-muted-foreground">골드등급 비율</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">{summaryStats.goldGradeRate}%</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm text-muted-foreground">측정 지역</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold">17개 시도</p>
          </div>
        </div>

        {/* Korea Map Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Map className="h-5 w-5 text-blue-500" />
              대한민국 체력 지도
            </h2>
            <RealKoreaMap
              data={regionalStats}
              selectedRegion={selectedRegion}
              onRegionSelect={setSelectedRegion}
            />
          </div>

          {/* Grade Distribution Pie Chart - moved here */}
          <div className="bg-card rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-500" />
              체력등급 분포
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {gradeDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Regional Ranking */}
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white flex items-center justify-between">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                지역별 피트에이지 순위
              </h2>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {sortedRegions.map((region, index) => (
                <div
                  key={region.region}
                  className={`flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer ${
                    selectedRegion === region.region ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedRegion(region.region === selectedRegion ? null : region.region)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0
                          ? "bg-yellow-400 text-yellow-900"
                          : index === 1
                          ? "bg-gray-300 text-gray-700"
                          : index === 2
                          ? "bg-orange-300 text-orange-800"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <span className="font-medium">{region.region}</span>
                      <p className="text-xs text-muted-foreground">
                        {region.participants.toLocaleString()}명 측정
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-lg font-bold ${
                        region.avgFitAge < 0 ? "text-emerald-600" : region.avgFitAge > 0 ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {region.avgFitAge > 0 ? "+" : ""}
                      {region.avgFitAge}세
                    </span>
                    <p className="text-xs text-muted-foreground">
                      골드 {region.grade.gold}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Age Distribution Chart */}
        <div className="bg-card rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" />
              연령대별 측정 현황
            </h2>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex bg-muted rounded-lg p-1">
                {[
                  { value: "all", label: "전체" },
                  { value: "male", label: "남성" },
                  { value: "female", label: "여성" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setGenderFilter(option.value as "all" | "male" | "female")}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      genderFilter === option.value
                        ? "bg-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => value.toLocaleString() + "명"}
                  contentStyle={{ borderRadius: "8px" }}
                />
                <Legend />
                {genderFilter !== "female" && (
                  <Bar dataKey="male" name="남성" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                )}
                {genderFilter !== "male" && (
                  <Bar dataKey="female" name="여성" fill="#EC4899" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              성별 측정 현황
            </h2>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={genderDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(1)}%`}
                  >
                    {genderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => value.toLocaleString() + "명"} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">
                  {summaryStats.maleParticipants.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">남성</p>
              </div>
              <div className="text-center p-3 bg-pink-50 rounded-xl">
                <p className="text-2xl font-bold text-pink-600">
                  {summaryStats.femaleParticipants.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">여성</p>
              </div>
            </div>
          </div>

          {/* Fitness Change by Age */}
          <div className="bg-card rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              연령대별 체력 변화 추이
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fitnessChangeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: "8px" }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="남성악력"
                    name="남성 악력(kg)"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="여성악력"
                    name="여성 악력(kg)"
                    stroke="#EC4899"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Regional Detail Cards */}
        {selectedRegion && (
          <div className="bg-card rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="font-semibold text-lg mb-4">{selectedRegion} 상세 현황</h2>
            {(() => {
              const region = regionalStats.find((r) => r.region === selectedRegion);
              if (!region) return null;
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl text-center">
                    <p className="text-2xl font-bold">{region.participants.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">측정 인원</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl text-center">
                    <p className={`text-2xl font-bold ${region.avgFitAge < 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {region.avgFitAge > 0 ? "+" : ""}{region.avgFitAge}세
                    </p>
                    <p className="text-sm text-muted-foreground">평균 피트에이지</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl text-center">
                    <p className="text-2xl font-bold">{region.maleRatio}%</p>
                    <p className="text-sm text-muted-foreground">남성 비율</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl text-center">
                    <p className="text-2xl font-bold text-yellow-600">{region.grade.gold}%</p>
                    <p className="text-sm text-muted-foreground">골드등급</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Data Source Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>데이터 출처: 국민체육진흥공단 체력측정 항목별 측정 데이터 | 최종 업데이트: {summaryStats.lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}
