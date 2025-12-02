import * as fs from 'fs';
import * as path from 'path';

interface RawRecord {
  CNTER_NM: string;
  AGE_FLAG_NM: string;
  MESURE_AGE_CO: string;
  COAW_FLAG_NM: string;
  SEXDSTN_FLAG_CD?: string;
  MBER_SEXDSTN_FLAG_CD?: string;
  MESURE_IEM_001_VALUE?: string; // 신장
  MESURE_IEM_002_VALUE?: string; // 체중
  MESURE_IEM_003_VALUE?: string; // 악력(좌)
  MESURE_IEM_004_VALUE?: string; // 악력(우)
  MESURE_IEM_005_VALUE?: string; // 악력
  MESURE_IEM_007_VALUE?: string; // 윗몸일으키기
  MESURE_IEM_008_VALUE?: string; // 유연성
  MESURE_IEM_017_VALUE?: string; // 제자리멀리뛰기
  MVM_PRSCRPTN_CN?: string; // 운동처방내용
}

// 센터명에서 지역 추출
function extractRegion(centerName: string): string {
  const regionMap: Record<string, string> = {
    'KSPO서울': '서울', '서울': '서울', '강남': '서울', '강북': '서울', '강동': '서울', '강서': '서울',
    '송파': '서울', '서초': '서울', '관악': '서울', '마포': '서울', '성동': '서울', '동대문': '서울',
    '서대문': '서울', '중랑': '서울', '노원': '서울', '도봉': '서울', '양천': '서울', '구로': '서울',
    '영등포': '서울', '금천': '서울', '동작': '서울', '용산': '서울', '종로': '서울', '중구': '서울',
    'KSPO부산': '부산', '부산': '부산', '해운대': '부산', '수영': '부산', '남구': '부산', '동래': '부산',
    '부산진': '부산', '사하': '부산', '북구': '부산', '사상': '부산', '연제': '부산', '금정': '부산',
    'KSPO대구': '대구', '대구': '대구', '수성': '대구', '달서': '대구', '동구': '대구',
    'KSPO인천': '인천', '인천': '인천', '미추홀': '인천', '연수': '인천', '부평': '인천', '계양': '인천',
    'KSPO광주': '광주', '광주': '광주', '서구': '광주', '광산': '광주',
    'KSPO대전': '대전', '대전': '대전', '유성': '대전',
    'KSPO울산': '울산', '울산': '울산',
    '세종': '세종',
    '고양': '경기', '성남': '경기', '수원': '경기', '용인': '경기', '안양': '경기', '안산': '경기',
    '부천': '경기', '화성': '경기', '평택': '경기', '시흥': '경기', '김포': '경기', '파주': '경기',
    '광명': '경기', '군포': '경기', '의정부': '경기', '오산': '경기', '하남': '경기', '이천': '경기',
    '양주': '경기', '구리': '경기', '안성': '경기', '포천': '경기', '의왕': '경기', '여주': '경기',
    '양평': '경기', '과천': '경기', '경기광주': '경기', '동두천': '경기', '남양주': '경기',
    '춘천': '강원', '원주': '강원', '강릉': '강원', '동해': '강원', '태백': '강원', '속초': '강원',
    '삼척': '강원', '홍천': '강원', '횡성': '강원', '영월': '강원', '평창': '강원', '정선': '강원',
    '철원': '강원', '화천': '강원', '양구': '강원', '인제': '강원', '강원고성': '강원', '양양': '강원',
    '청주': '충북', '충주': '충북', '제천': '충북', '보은': '충북', '옥천': '충북', '영동': '충북',
    '진천': '충북', '괴산': '충북', '음성': '충북', '단양': '충북', '증평': '충북',
    '천안': '충남', '공주': '충남', '보령': '충남', '아산': '충남', '서산': '충남', '논산': '충남',
    '계룡': '충남', '당진': '충남', '금산': '충남', '부여': '충남', '서천': '충남', '청양': '충남',
    '홍성': '충남', '예산': '충남', '태안': '충남',
    '전주': '전북', '군산': '전북', '익산': '전북', '정읍': '전북', '남원': '전북', '김제': '전북',
    '완주': '전북', '진안': '전북', '무주': '전북', '장수': '전북', '임실': '전북', '순창': '전북',
    '고창': '전북', '부안': '전북',
    '목포': '전남', '여수': '전남', '순천': '전남', '나주': '전남', '광양': '전남', '담양': '전남',
    '곡성': '전남', '구례': '전남', '고흥': '전남', '보성': '전남', '화순': '전남', '장흥': '전남',
    '강진': '전남', '해남': '전남', '영암': '전남', '무안': '전남', '함평': '전남', '영광': '전남',
    '장성': '전남', '완도': '전남', '진도': '전남', '신안': '전남',
    '포항': '경북', '경주': '경북', '김천': '경북', '안동': '경북', '구미': '경북', '영주': '경북',
    '영천': '경북', '상주': '경북', '문경': '경북', '경산': '경북', '군위': '경북', '의성': '경북',
    '청송': '경북', '영양': '경북', '영덕': '경북', '청도': '경북', '고령': '경북', '성주': '경북',
    '칠곡': '경북', '예천': '경북', '봉화': '경북', '울진': '경북', '울릉': '경북',
    '창원': '경남', '진주': '경남', '통영': '경남', '사천': '경남', '김해': '경남', '밀양': '경남',
    '거제': '경남', '양산': '경남', '의령': '경남', '함안': '경남', '창녕': '경남', '경남고성': '경남',
    '남해': '경남', '하동': '경남', '산청': '경남', '함양': '경남', '거창': '경남', '합천': '경남',
    '제주': '제주', '서귀포': '제주',
  };

  for (const [key, region] of Object.entries(regionMap)) {
    if (centerName.includes(key)) {
      return region;
    }
  }
  return '기타';
}

// CSV 파싱
function parseCSV(content: string): RawRecord[] {
  const lines = content.split('\n');
  if (lines.length < 2) return [];

  // BOM 제거 및 헤더 파싱
  const headerLine = lines[0].replace(/^\uFEFF/, '');
  const headers = headerLine.split(',').map(h => h.replace(/"/g, '').trim());

  const records: RawRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // CSV 파싱 (쉼표로 분리하되 따옴표 내의 쉼표는 무시)
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const record: Record<string, string> = {};
    headers.forEach((header, idx) => {
      record[header] = values[idx]?.replace(/"/g, '') || '';
    });

    records.push(record as unknown as RawRecord);
  }

  return records;
}

// 메인 처리 함수
async function processData() {
  const dataDir = path.join(__dirname, '..', 'data', 'raw');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.csv'));

  console.log(`Processing ${files.length} CSV files...`);

  // 지역별 통계
  const regionStats: Record<string, {
    total: number;
    male: number;
    female: number;
    grades: { gold: number; silver: number; bronze: number; participation: number };
  }> = {};

  // 연령대별 통계
  const ageStats: Record<string, { male: number; female: number }> = {};

  // 운동처방 통계
  const exerciseTypes: Record<string, number> = {};

  let totalRecords = 0;
  let totalMale = 0;
  let totalFemale = 0;
  let goldCount = 0;
  let silverCount = 0;
  let bronzeCount = 0;

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const records = parseCSV(content);

    console.log(`  ${file}: ${records.length} records`);

    for (const record of records) {
      totalRecords++;

      // 성별 처리
      const gender = record.SEXDSTN_FLAG_CD || record.MBER_SEXDSTN_FLAG_CD || '';
      if (gender === 'M') totalMale++;
      if (gender === 'F') totalFemale++;

      // 지역 통계
      const region = extractRegion(record.CNTER_NM || '');
      if (!regionStats[region]) {
        regionStats[region] = { total: 0, male: 0, female: 0, grades: { gold: 0, silver: 0, bronze: 0, participation: 0 } };
      }
      regionStats[region].total++;
      if (gender === 'M') regionStats[region].male++;
      if (gender === 'F') regionStats[region].female++;

      // 등급 처리
      const grade = record.COAW_FLAG_NM || '';
      if (grade.includes('1등급')) {
        regionStats[region].grades.gold++;
        goldCount++;
      } else if (grade.includes('2등급')) {
        regionStats[region].grades.silver++;
        silverCount++;
      } else if (grade.includes('3등급')) {
        regionStats[region].grades.bronze++;
        bronzeCount++;
      } else {
        regionStats[region].grades.participation++;
      }

      // 연령대별 통계
      const ageFlag = record.AGE_FLAG_NM || '';
      const age = parseInt(record.MESURE_AGE_CO) || 0;
      let ageGroup = '';

      if (ageFlag === '성인') {
        if (age >= 19 && age <= 24) ageGroup = '19-24세';
        else if (age >= 25 && age <= 29) ageGroup = '25-29세';
        else if (age >= 30 && age <= 34) ageGroup = '30-34세';
        else if (age >= 35 && age <= 39) ageGroup = '35-39세';
        else if (age >= 40 && age <= 44) ageGroup = '40-44세';
        else if (age >= 45 && age <= 49) ageGroup = '45-49세';
        else if (age >= 50 && age <= 54) ageGroup = '50-54세';
        else if (age >= 55 && age <= 59) ageGroup = '55-59세';
        else if (age >= 60 && age <= 64) ageGroup = '60-64세';
        else if (age >= 65) ageGroup = '65세 이상';
      } else if (ageFlag === '청소년') {
        ageGroup = '청소년(13-18세)';
      } else if (ageFlag === '유소년') {
        ageGroup = '유소년(6-12세)';
      } else if (ageFlag === '유아기') {
        ageGroup = '유아기';
      } else if (ageFlag === '어르신') {
        ageGroup = '65세 이상';
      }

      if (ageGroup) {
        if (!ageStats[ageGroup]) {
          ageStats[ageGroup] = { male: 0, female: 0 };
        }
        if (gender === 'M') ageStats[ageGroup].male++;
        if (gender === 'F') ageStats[ageGroup].female++;
      }

      // 운동처방 분석
      if (record.MVM_PRSCRPTN_CN) {
        const prescription = record.MVM_PRSCRPTN_CN;
        if (prescription.includes('조깅') || prescription.includes('걷기') || prescription.includes('자전거') || prescription.includes('달리기') || prescription.includes('줄넘기')) {
          exerciseTypes['유산소 운동'] = (exerciseTypes['유산소 운동'] || 0) + 1;
        }
        if (prescription.includes('스쿼트') || prescription.includes('런지') || prescription.includes('푸쉬업') || prescription.includes('웨이트') || prescription.includes('덤벨') || prescription.includes('윗몸') || prescription.includes('일으키기')) {
          exerciseTypes['근력 운동'] = (exerciseTypes['근력 운동'] || 0) + 1;
        }
        if (prescription.includes('스트레칭') || prescription.includes('유연성') || prescription.includes('요가')) {
          exerciseTypes['유연성 운동'] = (exerciseTypes['유연성 운동'] || 0) + 1;
        }
        if (prescription.includes('균형') || prescription.includes('코어') || prescription.includes('한발')) {
          exerciseTypes['균형 운동'] = (exerciseTypes['균형 운동'] || 0) + 1;
        }
      }
    }
  }

  // 결과 출력
  console.log('\n=== 총 통계 ===');
  console.log(`총 레코드: ${totalRecords.toLocaleString()}`);
  console.log(`남성: ${totalMale.toLocaleString()}`);
  console.log(`여성: ${totalFemale.toLocaleString()}`);
  console.log(`1등급(Gold): ${goldCount.toLocaleString()} (${((goldCount/totalRecords)*100).toFixed(1)}%)`);
  console.log(`2등급(Silver): ${silverCount.toLocaleString()} (${((silverCount/totalRecords)*100).toFixed(1)}%)`);
  console.log(`3등급(Bronze): ${bronzeCount.toLocaleString()} (${((bronzeCount/totalRecords)*100).toFixed(1)}%)`);

  console.log('\n=== 지역별 통계 ===');
  const sortedRegions = Object.entries(regionStats)
    .filter(([region]) => region !== '기타')
    .sort((a, b) => b[1].total - a[1].total);

  for (const [region, stats] of sortedRegions) {
    const maleRatio = Math.round((stats.male / stats.total) * 100);
    const goldRate = Math.round((stats.grades.gold / stats.total) * 100);
    const silverRate = Math.round((stats.grades.silver / stats.total) * 100);
    const bronzeRate = Math.round((stats.grades.bronze / stats.total) * 100);
    console.log(`${region}: ${stats.total.toLocaleString()}명 (남 ${maleRatio}%, Gold ${goldRate}%, Silver ${silverRate}%, Bronze ${bronzeRate}%)`);
  }

  console.log('\n=== 연령대별 통계 ===');
  for (const [ageGroup, stats] of Object.entries(ageStats)) {
    console.log(`${ageGroup}: 남 ${stats.male.toLocaleString()}, 여 ${stats.female.toLocaleString()}`);
  }

  console.log('\n=== 운동처방 통계 ===');
  const totalExercise = Object.values(exerciseTypes).reduce((a, b) => a + b, 0);
  for (const [type, count] of Object.entries(exerciseTypes)) {
    console.log(`${type}: ${count.toLocaleString()} (${((count/totalExercise)*100).toFixed(1)}%)`);
  }

  // statistics.ts 업데이트용 데이터 생성
  const regionalStatsOutput = sortedRegions.map(([region, stats]) => {
    const maleRatio = Math.round((stats.male / stats.total) * 100);
    const goldRate = Math.round((stats.grades.gold / stats.total) * 100);
    const silverRate = Math.round((stats.grades.silver / stats.total) * 100);
    const bronzeRate = Math.round((stats.grades.bronze / stats.total) * 100);
    return {
      region,
      participants: stats.total,
      avgFitAge: 0, // 실제 계산 필요
      maleRatio,
      grade: { gold: goldRate, silver: silverRate, bronze: bronzeRate }
    };
  });

  // JSON 출력
  const output = {
    summaryStats: {
      totalParticipants: totalRecords,
      avgFitAge: 0,
      maleParticipants: totalMale,
      femaleParticipants: totalFemale,
      goldGradeRate: Number(((goldCount/totalRecords)*100).toFixed(1)),
      silverGradeRate: Number(((silverCount/totalRecords)*100).toFixed(1)),
      bronzeGradeRate: Number(((bronzeCount/totalRecords)*100).toFixed(1)),
      dataSource: "국민체육진흥공단 체력측정 항목별 측정 데이터",
      lastUpdated: "2025.07",
    },
    regionalStats: regionalStatsOutput,
    ageDistribution: Object.entries(ageStats).map(([ageGroup, stats]) => ({
      ageGroup,
      male: stats.male,
      female: stats.female,
      total: stats.male + stats.female
    })),
    exercisePrescriptionStats: Object.entries(exerciseTypes).map(([type, count]) => ({
      type,
      count,
      percentage: Number(((count/totalExercise)*100).toFixed(1))
    }))
  };

  const outputPath = path.join(__dirname, '..', 'data', 'processed-stats.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\n결과 저장: ${outputPath}`);
}

processData().catch(console.error);
