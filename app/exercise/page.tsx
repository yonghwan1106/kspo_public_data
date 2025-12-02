"use client";

import { useState } from "react";
import Image from "next/image";
import { Dumbbell, Heart, StretchHorizontal, Footprints, Timer, Hand, Activity, CheckCircle2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { exercisePrescriptionStats } from "@/lib/data/statistics";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const exerciseCategories = [
  {
    id: "cardio",
    name: "심폐지구력",
    icon: Heart,
    image: "/images/cat_cardio.png",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    description: "왕복오래달리기 점수가 낮은 분께 추천",
    exercises: [
      {
        name: "걷기",
        duration: "30-60분",
        frequency: "주 5회 이상",
        intensity: "중강도 (숨이 약간 찬 정도)",
        tips: "바른 자세로 팔을 크게 흔들며 걸으세요",
      },
      {
        name: "조깅",
        duration: "20-40분",
        frequency: "주 3-4회",
        intensity: "중-고강도",
        tips: "천천히 시작해서 점진적으로 속도를 높이세요",
      },
      {
        name: "자전거 타기",
        duration: "30-60분",
        frequency: "주 3-5회",
        intensity: "중강도",
        tips: "무릎에 무리가 가지 않도록 안장 높이를 조절하세요",
      },
      {
        name: "수영",
        duration: "30-45분",
        frequency: "주 2-3회",
        intensity: "중강도",
        tips: "자유형, 배영 등 다양한 영법을 섞어서 하세요",
      },
    ],
  },
  {
    id: "strength",
    name: "근력",
    icon: Hand,
    image: "/images/cat_strength.png",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "악력 점수가 낮은 분께 추천",
    exercises: [
      {
        name: "악력기 운동",
        duration: "10-15분",
        frequency: "매일",
        intensity: "자신의 최대 악력의 60-70%",
        tips: "천천히 쥐었다 펴기를 반복하세요",
      },
      {
        name: "덤벨 운동",
        duration: "20-30분",
        frequency: "주 3회",
        intensity: "중강도 (8-12회 반복 가능한 무게)",
        tips: "어깨, 팔, 등 근육을 골고루 자극하세요",
      },
      {
        name: "팔굽혀펴기",
        duration: "10-20분",
        frequency: "주 3-4회",
        intensity: "본인 체력에 맞게",
        tips: "무릎을 대고 시작해서 점차 난이도를 높이세요",
      },
      {
        name: "턱걸이",
        duration: "10-15분",
        frequency: "주 3회",
        intensity: "고강도",
        tips: "보조 밴드를 사용해서 시작할 수 있습니다",
      },
    ],
  },
  {
    id: "endurance",
    name: "근지구력",
    icon: Timer,
    image: "/images/cat_endurance.png",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    description: "윗몸일으키기 점수가 낮은 분께 추천",
    exercises: [
      {
        name: "플랭크",
        duration: "30초-2분 x 3세트",
        frequency: "주 4-5회",
        intensity: "중강도",
        tips: "허리가 처지지 않도록 코어에 힘을 주세요",
      },
      {
        name: "크런치",
        duration: "15-20회 x 3세트",
        frequency: "주 3-4회",
        intensity: "중강도",
        tips: "목에 무리가 가지 않도록 시선을 천장에 고정하세요",
      },
      {
        name: "버피테스트",
        duration: "10-15회 x 3세트",
        frequency: "주 3회",
        intensity: "고강도",
        tips: "동작을 천천히 정확하게 수행하세요",
      },
      {
        name: "마운틴 클라이머",
        duration: "30초-1분 x 3세트",
        frequency: "주 3-4회",
        intensity: "중-고강도",
        tips: "코어를 단단히 유지하며 빠르게 다리를 교차하세요",
      },
    ],
  },
  {
    id: "flexibility",
    name: "유연성",
    icon: StretchHorizontal,
    image: "/images/cat_flexibility.png",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    description: "앉아윗몸앞으로굽히기 점수가 낮은 분께 추천",
    exercises: [
      {
        name: "전신 스트레칭",
        duration: "15-20분",
        frequency: "매일",
        intensity: "저강도",
        tips: "각 동작당 15-30초씩 유지하세요",
      },
      {
        name: "요가",
        duration: "30-60분",
        frequency: "주 2-3회",
        intensity: "저-중강도",
        tips: "초보자용 동작부터 시작하세요",
      },
      {
        name: "필라테스",
        duration: "30-60분",
        frequency: "주 2-3회",
        intensity: "중강도",
        tips: "코어 안정성과 유연성을 동시에 기를 수 있습니다",
      },
      {
        name: "폼롤러 운동",
        duration: "10-15분",
        frequency: "매일",
        intensity: "저강도",
        tips: "근육 이완과 회복에 효과적입니다",
      },
    ],
  },
  {
    id: "power",
    name: "순발력",
    icon: Footprints,
    image: "/images/cat_power.png",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    description: "제자리멀리뛰기 점수가 낮은 분께 추천",
    exercises: [
      {
        name: "점프 스쿼트",
        duration: "10-15회 x 3세트",
        frequency: "주 3회",
        intensity: "고강도",
        tips: "착지 시 무릎을 살짝 구부려 충격을 흡수하세요",
      },
      {
        name: "박스점프",
        duration: "8-12회 x 3세트",
        frequency: "주 2-3회",
        intensity: "고강도",
        tips: "낮은 박스부터 시작해서 점차 높이를 올리세요",
      },
      {
        name: "런지점프",
        duration: "10-12회 x 3세트",
        frequency: "주 3회",
        intensity: "고강도",
        tips: "균형을 잡으며 양 다리를 번갈아 점프하세요",
      },
      {
        name: "스프린트",
        duration: "20-30m x 5-8회",
        frequency: "주 2회",
        intensity: "최고강도",
        tips: "충분한 휴식을 취하며 전력질주하세요",
      },
    ],
  },
];

const COLORS = ["#EF4444", "#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"];

export default function ExercisePage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("cardio");
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const chartData = exercisePrescriptionStats.map((item, index) => ({
    name: item.type,
    value: item.percentage,
    count: item.count,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="min-h-screen bg-muted/30 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">운동처방 가이드</h1>
          <p className="text-muted-foreground">
            체력 측정 결과에 따른 맞춤형 운동 추천
          </p>
        </div>

        {/* Exercise Prescription Stats */}
        <div className="bg-card rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            운동처방 현황 (16,192건 분석)
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => {
                      const payload = props?.payload as { count?: number } | undefined;
                      const count = payload?.count;
                      return [`${value}%${count ? ` (${count.toLocaleString()}건)` : ''}`, name];
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-3">
                {exercisePrescriptionStats.map((item, index) => (
                  <div key={item.type} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{item.percentage}%</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({item.count.toLocaleString()}건)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                국민체육진흥공단 운동처방 데이터 기반 분석 결과입니다.
              </p>
            </div>
          </div>
        </div>

        {/* Exercise Categories */}
        <div className="space-y-4 mb-8">
          <h2 className="font-semibold text-xl mb-4">체력 요소별 운동 추천</h2>
          {exerciseCategories.map((category) => (
            <div key={category.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                className="w-full text-left group"
              >
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90 group-hover:opacity-100 transition-opacity z-10`} />
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover mix-blend-overlay opacity-50"
                  />

                  <div className="absolute inset-0 z-20 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 text-white">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-2xl mb-1">{category.name}</h3>
                        <p className="text-white/90 font-medium">{category.description}</p>
                      </div>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp className="h-6 w-6 text-white" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-white" />
                    )}
                  </div>
                </div>
              </button>

              {expandedCategory === category.id && (
                <div className="px-4 md:px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.exercises.map((exercise) => (
                      <div
                        key={exercise.name}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedExercise === `${category.id}-${exercise.name}`
                          ? `${category.bgColor} border-current ${category.textColor}`
                          : "border-transparent bg-muted/50 hover:bg-muted"
                          }`}
                        onClick={() =>
                          setSelectedExercise(
                            selectedExercise === `${category.id}-${exercise.name}`
                              ? null
                              : `${category.id}-${exercise.name}`
                          )
                        }
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{exercise.name}</h4>
                          <Dumbbell className={`h-4 w-4 ${category.textColor}`} />
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">운동 시간:</span>
                            <span>{exercise.duration}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">권장 빈도:</span>
                            <span>{exercise.frequency}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">운동 강도:</span>
                            <span>{exercise.intensity}</span>
                          </p>
                        </div>
                        {selectedExercise === `${category.id}-${exercise.name}` && (
                          <div className={`mt-3 pt-3 border-t ${category.textColor}`}>
                            <p className="text-sm flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{exercise.tips}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl p-6 md:p-8 text-white">
          <h2 className="font-semibold text-xl mb-4">운동 시 주의사항</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">운동 전 5-10분간 가벼운 스트레칭으로 준비운동을 하세요.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">처음에는 낮은 강도로 시작해서 점진적으로 강도를 높이세요.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">운동 중 통증이 느껴지면 즉시 중단하고 전문가와 상담하세요.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">충분한 수분 섭취와 휴식을 취하세요.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">운동 후에는 정리운동과 스트레칭으로 마무리하세요.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">건강 상태에 따라 전문가의 지도 하에 운동하는 것을 권장합니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Info */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>데이터 출처: 국민체육진흥공단 체력측정별 운동처방 데이터 (16,192건)</p>
        </div>
      </div>
    </div>
  );
}
