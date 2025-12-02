// 국민체력측정 데이터 기반 연령대별 평균 및 표준편차 (샘플 데이터)
// 실제 데이터: 문화빅데이터플랫폼 - 체력측정 항목별 측정 데이터 (34,120건)

export interface AgeGroupStats {
  ageGroup: string;
  ageRange: [number, number];
  male: GenderStats;
  female: GenderStats;
}

export interface GenderStats {
  grip: { mean: number; std: number }; // 악력 (kg)
  sitUp: { mean: number; std: number }; // 윗몸일으키기 (회/분)
  flexibility: { mean: number; std: number }; // 앉아윗몸앞으로굽히기 (cm)
  standingJump: { mean: number; std: number }; // 제자리멀리뛰기 (cm)
  shuttleRun: { mean: number; std: number }; // 왕복오래달리기 (회)
  bmi: { mean: number; std: number }; // BMI
}

// 연령대별 체력 기준 데이터 (국민체력100 기준 참조)
export const fitnessStandards: AgeGroupStats[] = [
  {
    ageGroup: "19-24세",
    ageRange: [19, 24],
    male: {
      grip: { mean: 45.2, std: 7.5 },
      sitUp: { mean: 48, std: 12 },
      flexibility: { mean: 12.5, std: 8.2 },
      standingJump: { mean: 225, std: 25 },
      shuttleRun: { mean: 65, std: 18 },
      bmi: { mean: 23.5, std: 3.2 },
    },
    female: {
      grip: { mean: 26.8, std: 5.2 },
      sitUp: { mean: 32, std: 10 },
      flexibility: { mean: 16.8, std: 7.5 },
      standingJump: { mean: 165, std: 20 },
      shuttleRun: { mean: 38, std: 12 },
      bmi: { mean: 21.2, std: 2.8 },
    },
  },
  {
    ageGroup: "25-29세",
    ageRange: [25, 29],
    male: {
      grip: { mean: 46.5, std: 7.8 },
      sitUp: { mean: 45, std: 11 },
      flexibility: { mean: 11.2, std: 8.5 },
      standingJump: { mean: 220, std: 24 },
      shuttleRun: { mean: 58, std: 17 },
      bmi: { mean: 24.2, std: 3.4 },
    },
    female: {
      grip: { mean: 27.2, std: 5.0 },
      sitUp: { mean: 30, std: 9 },
      flexibility: { mean: 15.5, std: 7.8 },
      standingJump: { mean: 158, std: 19 },
      shuttleRun: { mean: 35, std: 11 },
      bmi: { mean: 21.8, std: 3.0 },
    },
  },
  {
    ageGroup: "30-34세",
    ageRange: [30, 34],
    male: {
      grip: { mean: 46.8, std: 7.5 },
      sitUp: { mean: 40, std: 10 },
      flexibility: { mean: 9.8, std: 8.8 },
      standingJump: { mean: 212, std: 23 },
      shuttleRun: { mean: 52, std: 16 },
      bmi: { mean: 24.8, std: 3.2 },
    },
    female: {
      grip: { mean: 27.5, std: 4.8 },
      sitUp: { mean: 26, std: 8 },
      flexibility: { mean: 14.2, std: 8.0 },
      standingJump: { mean: 150, std: 18 },
      shuttleRun: { mean: 30, std: 10 },
      bmi: { mean: 22.5, std: 3.2 },
    },
  },
  {
    ageGroup: "35-39세",
    ageRange: [35, 39],
    male: {
      grip: { mean: 46.2, std: 7.2 },
      sitUp: { mean: 35, std: 10 },
      flexibility: { mean: 8.5, std: 9.0 },
      standingJump: { mean: 202, std: 22 },
      shuttleRun: { mean: 45, std: 15 },
      bmi: { mean: 25.2, std: 3.0 },
    },
    female: {
      grip: { mean: 27.8, std: 4.5 },
      sitUp: { mean: 22, std: 8 },
      flexibility: { mean: 13.0, std: 8.2 },
      standingJump: { mean: 142, std: 17 },
      shuttleRun: { mean: 26, std: 9 },
      bmi: { mean: 23.0, std: 3.4 },
    },
  },
  {
    ageGroup: "40-44세",
    ageRange: [40, 44],
    male: {
      grip: { mean: 45.5, std: 7.0 },
      sitUp: { mean: 30, std: 9 },
      flexibility: { mean: 7.2, std: 9.2 },
      standingJump: { mean: 192, std: 21 },
      shuttleRun: { mean: 40, std: 14 },
      bmi: { mean: 25.5, std: 2.8 },
    },
    female: {
      grip: { mean: 27.2, std: 4.2 },
      sitUp: { mean: 18, std: 7 },
      flexibility: { mean: 12.0, std: 8.5 },
      standingJump: { mean: 135, std: 16 },
      shuttleRun: { mean: 22, std: 8 },
      bmi: { mean: 23.5, std: 3.5 },
    },
  },
  {
    ageGroup: "45-49세",
    ageRange: [45, 49],
    male: {
      grip: { mean: 44.5, std: 6.8 },
      sitUp: { mean: 26, std: 8 },
      flexibility: { mean: 6.0, std: 9.5 },
      standingJump: { mean: 182, std: 20 },
      shuttleRun: { mean: 35, std: 13 },
      bmi: { mean: 25.2, std: 2.6 },
    },
    female: {
      grip: { mean: 26.5, std: 4.0 },
      sitUp: { mean: 15, std: 6 },
      flexibility: { mean: 11.0, std: 8.8 },
      standingJump: { mean: 128, std: 15 },
      shuttleRun: { mean: 18, std: 7 },
      bmi: { mean: 24.0, std: 3.2 },
    },
  },
  {
    ageGroup: "50-54세",
    ageRange: [50, 54],
    male: {
      grip: { mean: 43.0, std: 6.5 },
      sitUp: { mean: 22, std: 8 },
      flexibility: { mean: 5.0, std: 9.8 },
      standingJump: { mean: 172, std: 19 },
      shuttleRun: { mean: 30, std: 12 },
      bmi: { mean: 25.0, std: 2.5 },
    },
    female: {
      grip: { mean: 25.5, std: 3.8 },
      sitUp: { mean: 12, std: 5 },
      flexibility: { mean: 10.5, std: 9.0 },
      standingJump: { mean: 120, std: 14 },
      shuttleRun: { mean: 15, std: 6 },
      bmi: { mean: 24.2, std: 3.0 },
    },
  },
  {
    ageGroup: "55-59세",
    ageRange: [55, 59],
    male: {
      grip: { mean: 41.2, std: 6.2 },
      sitUp: { mean: 18, std: 7 },
      flexibility: { mean: 4.0, std: 10.0 },
      standingJump: { mean: 162, std: 18 },
      shuttleRun: { mean: 25, std: 11 },
      bmi: { mean: 24.8, std: 2.4 },
    },
    female: {
      grip: { mean: 24.2, std: 3.5 },
      sitUp: { mean: 10, std: 5 },
      flexibility: { mean: 10.0, std: 9.2 },
      standingJump: { mean: 112, std: 13 },
      shuttleRun: { mean: 12, std: 5 },
      bmi: { mean: 24.5, std: 2.8 },
    },
  },
  {
    ageGroup: "60-64세",
    ageRange: [60, 64],
    male: {
      grip: { mean: 38.5, std: 6.0 },
      sitUp: { mean: 15, std: 6 },
      flexibility: { mean: 3.0, std: 10.2 },
      standingJump: { mean: 150, std: 17 },
      shuttleRun: { mean: 20, std: 10 },
      bmi: { mean: 24.5, std: 2.3 },
    },
    female: {
      grip: { mean: 22.8, std: 3.2 },
      sitUp: { mean: 8, std: 4 },
      flexibility: { mean: 9.5, std: 9.5 },
      standingJump: { mean: 102, std: 12 },
      shuttleRun: { mean: 10, std: 4 },
      bmi: { mean: 24.8, std: 2.6 },
    },
  },
];

// 전국 지역별 체력측정 현황 (샘플 데이터)
export const regionalStats = [
  { region: "서울", participants: 8520, avgFitAge: -1.2, maleRatio: 48, grade: { gold: 32, silver: 45, bronze: 23 } },
  { region: "부산", participants: 3240, avgFitAge: 0.5, maleRatio: 52, grade: { gold: 28, silver: 48, bronze: 24 } },
  { region: "대구", participants: 2180, avgFitAge: 0.8, maleRatio: 50, grade: { gold: 26, silver: 47, bronze: 27 } },
  { region: "인천", participants: 2890, avgFitAge: -0.3, maleRatio: 49, grade: { gold: 30, silver: 46, bronze: 24 } },
  { region: "광주", participants: 1520, avgFitAge: -0.8, maleRatio: 47, grade: { gold: 31, silver: 44, bronze: 25 } },
  { region: "대전", participants: 1680, avgFitAge: -1.5, maleRatio: 51, grade: { gold: 34, silver: 43, bronze: 23 } },
  { region: "울산", participants: 1120, avgFitAge: 0.2, maleRatio: 54, grade: { gold: 29, silver: 47, bronze: 24 } },
  { region: "세종", participants: 480, avgFitAge: -2.1, maleRatio: 48, grade: { gold: 38, silver: 42, bronze: 20 } },
  { region: "경기", participants: 12500, avgFitAge: -0.5, maleRatio: 49, grade: { gold: 31, silver: 45, bronze: 24 } },
  { region: "강원", participants: 1280, avgFitAge: 1.2, maleRatio: 53, grade: { gold: 25, silver: 46, bronze: 29 } },
  { region: "충북", participants: 1350, avgFitAge: 0.3, maleRatio: 51, grade: { gold: 28, silver: 47, bronze: 25 } },
  { region: "충남", participants: 1820, avgFitAge: 0.1, maleRatio: 52, grade: { gold: 29, silver: 46, bronze: 25 } },
  { region: "전북", participants: 1450, avgFitAge: 0.6, maleRatio: 50, grade: { gold: 27, silver: 48, bronze: 25 } },
  { region: "전남", participants: 1380, avgFitAge: 1.0, maleRatio: 51, grade: { gold: 26, silver: 47, bronze: 27 } },
  { region: "경북", participants: 2120, avgFitAge: 0.8, maleRatio: 52, grade: { gold: 27, silver: 46, bronze: 27 } },
  { region: "경남", participants: 2850, avgFitAge: 0.4, maleRatio: 51, grade: { gold: 28, silver: 47, bronze: 25 } },
  { region: "제주", participants: 680, avgFitAge: -0.2, maleRatio: 49, grade: { gold: 30, silver: 45, bronze: 25 } },
];

// 연령대별 참가자 분포 (샘플 데이터)
export const ageDistribution = [
  { ageGroup: "19-24세", male: 2850, female: 3120, total: 5970 },
  { ageGroup: "25-29세", male: 2420, female: 2680, total: 5100 },
  { ageGroup: "30-34세", male: 2180, female: 2350, total: 4530 },
  { ageGroup: "35-39세", male: 2520, female: 2890, total: 5410 },
  { ageGroup: "40-44세", male: 2680, female: 3050, total: 5730 },
  { ageGroup: "45-49세", male: 2320, female: 2780, total: 5100 },
  { ageGroup: "50-54세", male: 1980, female: 2420, total: 4400 },
  { ageGroup: "55-59세", male: 1650, female: 2180, total: 3830 },
  { ageGroup: "60-64세", male: 1420, female: 1920, total: 3340 },
];

// 운동처방 유형별 통계 (샘플 데이터 - 운동처방 데이터 16,192건 기반)
export const exercisePrescriptionStats = [
  { type: "유산소 운동", count: 8520, percentage: 52.6, exercises: ["걷기", "조깅", "자전거", "수영"] },
  { type: "근력 운동", count: 4850, percentage: 30.0, exercises: ["스쿼트", "런지", "푸쉬업", "덤벨운동"] },
  { type: "유연성 운동", count: 1820, percentage: 11.2, exercises: ["스트레칭", "요가", "필라테스"] },
  { type: "균형 운동", count: 1002, percentage: 6.2, exercises: ["한발서기", "발란스보드", "코어운동"] },
];

// 총 통계 요약
export const summaryStats = {
  totalParticipants: 65817,
  avgFitAge: -0.3,
  maleParticipants: 32120,
  femaleParticipants: 33697,
  goldGradeRate: 29.5,
  silverGradeRate: 46.2,
  bronzeGradeRate: 24.3,
  dataSource: "국민체육진흥공단 체력측정 항목별 측정 데이터",
  lastUpdated: "2024.12",
};
