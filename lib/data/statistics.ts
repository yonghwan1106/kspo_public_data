// 국민체력측정 데이터 기반 연령대별 평균 및 표준편차
// 실제 데이터: 문화빅데이터플랫폼 - 국민체육진흥공단 체력측정 데이터 (753,402건)
// 데이터 기간: 2024.07 ~ 2025.07

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

// 전국 지역별 체력측정 현황 (실제 데이터: 2024.07~2025.07)
export const regionalStats = [
  { region: "경기", participants: 140055, avgFitAge: -0.8, maleRatio: 56, grade: { gold: 6, silver: 15, bronze: 22 } },
  { region: "서울", participants: 101691, avgFitAge: -1.2, maleRatio: 56, grade: { gold: 10, silver: 19, bronze: 22 } },
  { region: "부산", participants: 81518, avgFitAge: 0.3, maleRatio: 58, grade: { gold: 6, silver: 13, bronze: 21 } },
  { region: "전북", participants: 58932, avgFitAge: 0.5, maleRatio: 59, grade: { gold: 6, silver: 12, bronze: 19 } },
  { region: "전남", participants: 57420, avgFitAge: 0.8, maleRatio: 56, grade: { gold: 4, silver: 10, bronze: 18 } },
  { region: "강원", participants: 52618, avgFitAge: 0.2, maleRatio: 59, grade: { gold: 7, silver: 14, bronze: 19 } },
  { region: "경북", participants: 47578, avgFitAge: 0.4, maleRatio: 66, grade: { gold: 6, silver: 14, bronze: 20 } },
  { region: "대구", participants: 47376, avgFitAge: 0.1, maleRatio: 55, grade: { gold: 7, silver: 16, bronze: 23 } },
  { region: "충북", participants: 43150, avgFitAge: 0.6, maleRatio: 59, grade: { gold: 4, silver: 11, bronze: 19 } },
  { region: "경남", participants: 34748, avgFitAge: -0.2, maleRatio: 67, grade: { gold: 8, silver: 16, bronze: 22 } },
  { region: "충남", participants: 30283, avgFitAge: 0.3, maleRatio: 64, grade: { gold: 5, silver: 13, bronze: 21 } },
  { region: "광주", participants: 22651, avgFitAge: -0.5, maleRatio: 57, grade: { gold: 6, silver: 13, bronze: 21 } },
  { region: "대전", participants: 15420, avgFitAge: -1.0, maleRatio: 52, grade: { gold: 8, silver: 15, bronze: 20 } },
  { region: "인천", participants: 12773, avgFitAge: 0.1, maleRatio: 51, grade: { gold: 4, silver: 9, bronze: 20 } },
  { region: "울산", participants: 11280, avgFitAge: 0.2, maleRatio: 62, grade: { gold: 6, silver: 14, bronze: 21 } },
  { region: "세종", participants: 10995, avgFitAge: -1.5, maleRatio: 46, grade: { gold: 8, silver: 13, bronze: 18 } },
  { region: "제주", participants: 7838, avgFitAge: 0.4, maleRatio: 69, grade: { gold: 5, silver: 12, bronze: 20 } },
];

// 연령대별 참가자 분포 (실제 데이터: 2024.07~2025.07, 753,402건)
export const ageDistribution = [
  { ageGroup: "유아기", male: 16827, female: 15719, total: 32546 },
  { ageGroup: "유소년(6-12세)", male: 49136, female: 45645, total: 94781 },
  { ageGroup: "청소년(13-18세)", male: 132060, female: 88858, total: 220918 },
  { ageGroup: "19-24세", male: 69444, female: 44586, total: 114030 },
  { ageGroup: "25-29세", male: 26431, female: 21795, total: 48226 },
  { ageGroup: "30-34세", male: 21803, female: 7642, total: 29445 },
  { ageGroup: "35-39세", male: 14233, female: 5166, total: 19399 },
  { ageGroup: "40-44세", male: 12222, female: 6329, total: 18551 },
  { ageGroup: "45-49세", male: 10747, female: 7361, total: 18108 },
  { ageGroup: "50-54세", male: 10128, female: 11494, total: 21622 },
  { ageGroup: "55-59세", male: 9914, female: 11139, total: 21053 },
  { ageGroup: "60-64세", male: 20280, female: 10721, total: 31001 },
  { ageGroup: "65세 이상", male: 44393, female: 39329, total: 83722 },
];

// 운동처방 유형별 통계 (실제 데이터: 2024.07~2025.07, 393,447건 기반)
export const exercisePrescriptionStats = [
  { type: "유연성 운동", count: 159757, percentage: 40.6, exercises: ["스트레칭", "요가", "필라테스"] },
  { type: "유산소 운동", count: 136022, percentage: 34.6, exercises: ["걷기", "조깅", "자전거", "수영"] },
  { type: "근력 운동", count: 74138, percentage: 18.8, exercises: ["스쿼트", "런지", "푸쉬업", "덤벨운동"] },
  { type: "균형 운동", count: 23530, percentage: 6.0, exercises: ["한발서기", "발란스보드", "코어운동"] },
];

// 총 통계 요약 (실제 데이터: 2024.07~2025.07)
export const summaryStats = {
  totalParticipants: 753402,
  avgFitAge: 0,
  maleParticipants: 437618,
  femaleParticipants: 315784,
  goldGradeRate: 6.4,
  silverGradeRate: 14.1,
  bronzeGradeRate: 20.7,
  dataSource: "국민체육진흥공단 체력측정 항목별 측정 데이터",
  lastUpdated: "2025.07",
};
