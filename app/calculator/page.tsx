"use client";

import { useState } from "react";
import { Activity, User, Ruler, Scale, Hand, Timer, StretchHorizontal, Footprints, Wind, Trophy, TrendingUp, AlertCircle, CheckCircle2, Dumbbell, Radar } from "lucide-react";
import { calculateFitAge, calculateBMI, getBMICategory, type FitnessInput, type FitnessResult } from "@/lib/algorithms/fitness-age";
import FitnessRadarChart from "@/components/charts/FitnessRadarChart";

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<FitnessResult | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);

  const [formData, setFormData] = useState<FitnessInput>({
    age: 30,
    gender: "male",
    height: 170,
    weight: 70,
    grip: 40,
    sitUp: 30,
    flexibility: 10,
    standingJump: 200,
    shuttleRun: undefined,
  });

  const handleInputChange = (field: keyof FitnessInput, value: number | string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCalculate = () => {
    const fitnessResult = calculateFitAge(formData);
    const bmiValue = calculateBMI(formData.height, formData.weight);
    setResult(fitnessResult);
    setBmi(bmiValue);
    setStep(3);
  };

  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case "excellent": return "우수";
      case "good": return "양호";
      case "average": return "보통";
      case "poor": return "미흡";
      case "veryPoor": return "부족";
      default: return rating;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "excellent": return "text-emerald-600 bg-emerald-100";
      case "good": return "text-blue-600 bg-blue-100";
      case "average": return "text-yellow-600 bg-yellow-100";
      case "poor": return "text-orange-600 bg-orange-100";
      case "veryPoor": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getGradeInfo = (grade: string) => {
    switch (grade) {
      case "gold": return { label: "골드", color: "from-yellow-400 to-yellow-600", icon: "🥇" };
      case "silver": return { label: "실버", color: "from-gray-300 to-gray-500", icon: "🥈" };
      case "bronze": return { label: "브론즈", color: "from-orange-400 to-orange-600", icon: "🥉" };
      default: return { label: grade, color: "from-gray-400 to-gray-600", icon: "" };
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">피트에이지 측정</h1>
          <p className="text-muted-foreground">
            체력측정 결과를 입력하고 나만의 피트에이지를 확인하세요
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s
                      ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 md:w-24 h-1 mx-2 transition-colors ${
                      step > s ? "bg-gradient-to-r from-blue-500 to-emerald-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground px-2">
            <span>기본 정보</span>
            <span>체력측정</span>
            <span>결과 확인</span>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="max-w-xl mx-auto">
            <div className="bg-card rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                기본 정보 입력
              </h2>

              <div className="space-y-6">
                {/* Age */}
                <div>
                  <label className="block text-sm font-medium mb-2">나이</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="19"
                      max="64"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", parseInt(e.target.value))}
                      className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="w-20 text-center">
                      <span className="text-2xl font-bold text-blue-600">{formData.age}</span>
                      <span className="text-muted-foreground ml-1">세</span>
                    </div>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium mb-2">성별</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange("gender", "male")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.gender === "male"
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-muted hover:border-blue-300"
                      }`}
                    >
                      <span className="text-2xl mb-1 block">👨</span>
                      <span className="font-medium">남성</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("gender", "female")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.gender === "female"
                          ? "border-pink-500 bg-pink-50 text-pink-600"
                          : "border-muted hover:border-pink-300"
                      }`}
                    >
                      <span className="text-2xl mb-1 block">👩</span>
                      <span className="font-medium">여성</span>
                    </button>
                  </div>
                </div>

                {/* Height & Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Ruler className="h-4 w-4 inline mr-1" />
                      신장 (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="170"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Scale className="h-4 w-4 inline mr-1" />
                      체중 (kg)
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="70"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-8 bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                다음 단계로
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Fitness Measurements */}
        {step === 2 && (
          <div className="max-w-xl mx-auto">
            <div className="bg-card rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-500" />
                체력측정 결과 입력
              </h2>

              <div className="space-y-6">
                {/* Grip Strength */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Hand className="h-4 w-4 inline mr-1" />
                    악력 (kg)
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">양손 중 높은 기록</p>
                  <input
                    type="number"
                    value={formData.grip}
                    onChange={(e) => handleInputChange("grip", parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="40"
                    step="0.1"
                  />
                </div>

                {/* Sit Up */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Timer className="h-4 w-4 inline mr-1" />
                    윗몸일으키기 (회/분)
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">1분간 실시 횟수</p>
                  <input
                    type="number"
                    value={formData.sitUp}
                    onChange={(e) => handleInputChange("sitUp", parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>

                {/* Flexibility */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <StretchHorizontal className="h-4 w-4 inline mr-1" />
                    앉아윗몸앞으로굽히기 (cm)
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">유연성 측정 (음수 가능)</p>
                  <input
                    type="number"
                    value={formData.flexibility}
                    onChange={(e) => handleInputChange("flexibility", parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="10"
                    step="0.1"
                  />
                </div>

                {/* Standing Jump */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Footprints className="h-4 w-4 inline mr-1" />
                    제자리멀리뛰기 (cm)
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">순발력 측정</p>
                  <input
                    type="number"
                    value={formData.standingJump}
                    onChange={(e) => handleInputChange("standingJump", parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="200"
                  />
                </div>

                {/* Shuttle Run (Optional) */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Wind className="h-4 w-4 inline mr-1" />
                    왕복오래달리기 (회) - 선택
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">심폐지구력 측정 (미입력 시 제외)</p>
                  <input
                    type="number"
                    value={formData.shuttleRun || ""}
                    onChange={(e) => handleInputChange("shuttleRun", e.target.value ? parseInt(e.target.value) : undefined as unknown as number)}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="선택 입력"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-input py-4 rounded-xl font-semibold hover:bg-muted transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  결과 확인
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && result && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Main Result Card */}
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-6 md:p-8 text-white text-center">
                <p className="text-white/80 mb-2">당신의 피트에이지는</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-6xl md:text-8xl font-bold">{result.fitAge}</span>
                  <span className="text-2xl md:text-3xl">세</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  {result.fitAgeDiff < 0 ? (
                    <>
                      <TrendingUp className="h-5 w-5" />
                      <span>실제 나이보다 <strong>{Math.abs(result.fitAgeDiff)}세</strong> 젊습니다!</span>
                    </>
                  ) : result.fitAgeDiff > 0 ? (
                    <>
                      <AlertCircle className="h-5 w-5" />
                      <span>실제 나이보다 <strong>{result.fitAgeDiff}세</strong> 많습니다</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      <span>실제 나이와 동일합니다</span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Grade */}
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">체력등급</p>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${getGradeInfo(result.grade).color} text-white font-semibold`}>
                      <span>{getGradeInfo(result.grade).icon}</span>
                      <span>{getGradeInfo(result.grade).label}</span>
                    </div>
                  </div>

                  {/* Percentile */}
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">전국 백분위</p>
                    <p className="text-2xl font-bold text-blue-600">상위 {100 - result.percentile}%</p>
                  </div>

                  {/* Overall Score */}
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">종합점수</p>
                    <p className="text-2xl font-bold text-emerald-600">{result.scores.overall}/5.0</p>
                  </div>

                  {/* BMI */}
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">BMI</p>
                    <p className="text-2xl font-bold">{bmi}</p>
                    <p className="text-xs text-muted-foreground">{getBMICategory(bmi!)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-card rounded-2xl shadow-sm p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Radar className="h-5 w-5 text-purple-500" />
                체력 프로필
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                동일 연령대/성별 대비 나의 체력 수준 (백분위)
              </p>
              <FitnessRadarChart scores={result.scores} gender={formData.gender} />
            </div>

            {/* Detailed Scores */}
            <div className="bg-card rounded-2xl shadow-sm p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                항목별 분석
              </h3>
              <div className="space-y-4">
                {[
                  { key: "grip", label: "악력 (근력)", icon: Hand, value: result.scores.grip },
                  { key: "sitUp", label: "윗몸일으키기 (근지구력)", icon: Timer, value: result.scores.sitUp },
                  { key: "flexibility", label: "유연성", icon: StretchHorizontal, value: result.scores.flexibility },
                  { key: "standingJump", label: "제자리멀리뛰기 (순발력)", icon: Footprints, value: result.scores.standingJump },
                  ...(result.scores.shuttleRun ? [{ key: "shuttleRun", label: "왕복오래달리기 (심폐지구력)", icon: Wind, value: result.scores.shuttleRun }] : []),
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">
                          측정값: {item.value.value} | 백분위: {item.value.percentile}%
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(item.value.rating)}`}>
                      {getRatingLabel(item.value.rating)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-card rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                  강점 분야
                </h3>
                {result.strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">분석 중인 강점이 없습니다.</p>
                )}
              </div>

              {/* Weaknesses */}
              <div className="bg-card rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-orange-600">
                  <AlertCircle className="h-5 w-5" />
                  개선 필요 분야
                </h3>
                {result.weaknesses.length > 0 ? (
                  <ul className="space-y-2">
                    {result.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        {w}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">모든 분야에서 양호한 수준입니다.</p>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-card rounded-2xl shadow-sm p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-purple-500" />
                맞춤 운동 추천
              </h3>
              <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setStep(1);
                  setResult(null);
                }}
                className="flex-1 border border-input py-4 rounded-xl font-semibold hover:bg-muted transition-colors"
              >
                다시 측정하기
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "피트에이지 결과",
                      text: `내 피트에이지는 ${result.fitAge}세입니다! (실제 나이: ${formData.age}세)`,
                      url: window.location.href,
                    });
                  }
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                결과 공유하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
