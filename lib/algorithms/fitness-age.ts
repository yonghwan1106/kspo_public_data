import { fitnessStandards, type AgeGroupStats, type GenderStats } from "../data/statistics";

export interface FitnessInput {
  age: number;
  gender: "male" | "female";
  height: number; // cm
  weight: number; // kg
  grip: number; // 악력 (kg)
  sitUp: number; // 윗몸일으키기 (회/분)
  flexibility: number; // 앉아윗몸앞으로굽히기 (cm)
  standingJump: number; // 제자리멀리뛰기 (cm)
  shuttleRun?: number; // 왕복오래달리기 (회) - 선택
}

export interface FitnessResult {
  fitAge: number;
  fitAgeDiff: number; // 실제 나이 - 피트에이지 (음수면 젊음)
  percentile: number; // 동일 연령대 대비 백분위
  grade: "gold" | "silver" | "bronze";
  scores: {
    grip: ItemScore;
    sitUp: ItemScore;
    flexibility: ItemScore;
    standingJump: ItemScore;
    shuttleRun?: ItemScore;
    overall: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface ItemScore {
  value: number;
  zScore: number; // 표준점수
  percentile: number;
  rating: "excellent" | "good" | "average" | "poor" | "veryPoor";
}

// 가중치 설정
const WEIGHTS = {
  grip: 0.20, // 근력
  sitUp: 0.20, // 근지구력
  flexibility: 0.15, // 유연성
  standingJump: 0.20, // 순발력
  shuttleRun: 0.25, // 심폐지구력
};

// 연령대 찾기
function findAgeGroup(age: number): AgeGroupStats | null {
  return fitnessStandards.find(
    (group) => age >= group.ageRange[0] && age <= group.ageRange[1]
  ) || null;
}

// Z-score 계산
function calculateZScore(value: number, mean: number, std: number): number {
  return (value - mean) / std;
}

// Z-score를 백분위로 변환
function zScoreToPercentile(zScore: number): number {
  // 정규분포 근사
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989423 * Math.exp(-zScore * zScore / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

  return zScore > 0 ? (1 - prob) * 100 : prob * 100;
}

// 등급 판정
function getRating(zScore: number): ItemScore["rating"] {
  if (zScore >= 1.5) return "excellent";
  if (zScore >= 0.5) return "good";
  if (zScore >= -0.5) return "average";
  if (zScore >= -1.5) return "poor";
  return "veryPoor";
}

// 등급 판정 (전체)
function getGrade(percentile: number): "gold" | "silver" | "bronze" {
  if (percentile >= 70) return "gold";
  if (percentile >= 40) return "silver";
  return "bronze";
}

// 운동 추천 생성
function generateRecommendations(scores: FitnessResult["scores"]): string[] {
  const recommendations: string[] = [];

  // 약점 기반 추천
  if (scores.grip.rating === "poor" || scores.grip.rating === "veryPoor") {
    recommendations.push("악력 향상을 위해 그립 운동, 손목 컬, 암 컬 운동을 권장합니다.");
  }

  if (scores.sitUp.rating === "poor" || scores.sitUp.rating === "veryPoor") {
    recommendations.push("근지구력 향상을 위해 플랭크, 크런치, 버피테스트를 권장합니다.");
  }

  if (scores.flexibility.rating === "poor" || scores.flexibility.rating === "veryPoor") {
    recommendations.push("유연성 향상을 위해 스트레칭, 요가, 필라테스를 권장합니다.");
  }

  if (scores.standingJump.rating === "poor" || scores.standingJump.rating === "veryPoor") {
    recommendations.push("순발력 향상을 위해 점프 스쿼트, 박스점프, 런지점프를 권장합니다.");
  }

  if (scores.shuttleRun && (scores.shuttleRun.rating === "poor" || scores.shuttleRun.rating === "veryPoor")) {
    recommendations.push("심폐지구력 향상을 위해 걷기, 조깅, 자전거, 수영을 권장합니다.");
  }

  // 기본 추천
  if (recommendations.length === 0) {
    recommendations.push("현재 체력 수준을 유지하기 위해 주 3회 이상 규칙적인 운동을 권장합니다.");
    recommendations.push("균형 잡힌 체력 유지를 위해 유산소, 근력, 유연성 운동을 병행하세요.");
  }

  return recommendations;
}

// 피트에이지 계산 메인 함수
export function calculateFitAge(input: FitnessInput): FitnessResult {
  const ageGroup = findAgeGroup(input.age);

  // 연령대를 벗어난 경우 가장 가까운 연령대 사용
  const stats: GenderStats = ageGroup
    ? ageGroup[input.gender]
    : input.age < 19
    ? fitnessStandards[0][input.gender]
    : fitnessStandards[fitnessStandards.length - 1][input.gender];

  // 각 항목별 Z-score 계산
  const gripZ = calculateZScore(input.grip, stats.grip.mean, stats.grip.std);
  const sitUpZ = calculateZScore(input.sitUp, stats.sitUp.mean, stats.sitUp.std);
  const flexibilityZ = calculateZScore(input.flexibility, stats.flexibility.mean, stats.flexibility.std);
  const standingJumpZ = calculateZScore(input.standingJump, stats.standingJump.mean, stats.standingJump.std);
  const shuttleRunZ = input.shuttleRun
    ? calculateZScore(input.shuttleRun, stats.shuttleRun.mean, stats.shuttleRun.std)
    : 0;

  // 가중 평균 Z-score 계산
  let totalWeight = WEIGHTS.grip + WEIGHTS.sitUp + WEIGHTS.flexibility + WEIGHTS.standingJump;
  let weightedZScore =
    gripZ * WEIGHTS.grip +
    sitUpZ * WEIGHTS.sitUp +
    flexibilityZ * WEIGHTS.flexibility +
    standingJumpZ * WEIGHTS.standingJump;

  if (input.shuttleRun) {
    totalWeight += WEIGHTS.shuttleRun;
    weightedZScore += shuttleRunZ * WEIGHTS.shuttleRun;
  }

  const avgZScore = weightedZScore / totalWeight;

  // 피트에이지 계산 (Z-score 1당 약 2세 차이로 환산)
  const fitAgeDiff = Math.round(avgZScore * -2);
  const fitAge = Math.max(15, Math.min(80, input.age + fitAgeDiff));

  // 백분위 계산
  const percentile = Math.round(zScoreToPercentile(avgZScore));

  // 각 항목별 점수 계산
  const scores = {
    grip: {
      value: input.grip,
      zScore: gripZ,
      percentile: Math.round(zScoreToPercentile(gripZ)),
      rating: getRating(gripZ),
    },
    sitUp: {
      value: input.sitUp,
      zScore: sitUpZ,
      percentile: Math.round(zScoreToPercentile(sitUpZ)),
      rating: getRating(sitUpZ),
    },
    flexibility: {
      value: input.flexibility,
      zScore: flexibilityZ,
      percentile: Math.round(zScoreToPercentile(flexibilityZ)),
      rating: getRating(flexibilityZ),
    },
    standingJump: {
      value: input.standingJump,
      zScore: standingJumpZ,
      percentile: Math.round(zScoreToPercentile(standingJumpZ)),
      rating: getRating(standingJumpZ),
    },
    ...(input.shuttleRun && {
      shuttleRun: {
        value: input.shuttleRun,
        zScore: shuttleRunZ,
        percentile: Math.round(zScoreToPercentile(shuttleRunZ)),
        rating: getRating(shuttleRunZ),
      },
    }),
    overall: Math.round((percentile / 100) * 5 * 10) / 10, // 5점 만점
  };

  // 강점/약점 분석
  const itemScores = [
    { name: "악력(근력)", score: scores.grip },
    { name: "윗몸일으키기(근지구력)", score: scores.sitUp },
    { name: "유연성", score: scores.flexibility },
    { name: "제자리멀리뛰기(순발력)", score: scores.standingJump },
    ...(scores.shuttleRun ? [{ name: "왕복오래달리기(심폐지구력)", score: scores.shuttleRun }] : []),
  ];

  const strengths = itemScores
    .filter((item) => item.score.rating === "excellent" || item.score.rating === "good")
    .map((item) => item.name);

  const weaknesses = itemScores
    .filter((item) => item.score.rating === "poor" || item.score.rating === "veryPoor")
    .map((item) => item.name);

  return {
    fitAge,
    fitAgeDiff,
    percentile,
    grade: getGrade(percentile),
    scores,
    strengths,
    weaknesses,
    recommendations: generateRecommendations(scores),
  };
}

// BMI 계산
export function calculateBMI(height: number, weight: number): number {
  const heightM = height / 100;
  return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

// BMI 판정
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "저체중";
  if (bmi < 23) return "정상";
  if (bmi < 25) return "과체중";
  if (bmi < 30) return "비만";
  return "고도비만";
}
