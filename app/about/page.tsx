import {
  Activity,
  Database,
  Target,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Lightbulb,
  BarChart3,
  Heart,
  Building,
  Globe,
  Smartphone,
  Server
} from "lucide-react";
import { summaryStats } from "@/lib/data/statistics";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about_hero_bg.png"
            alt="About Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-emerald-800/90" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">2025 국민체육진흥공단 공공데이터 활용 경진대회</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              피트에이지 (FitAge)
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              국민체력측정 빅데이터 기반 체력나이 측정 및 맞춤형 운동처방 서비스
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* 1. 서비스 개요 */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              1. 서비스 개요
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-600">서비스명</h3>
                <p className="text-3xl font-bold mb-2">피트에이지 (FitAge)</p>
                <p className="text-muted-foreground">Fitness + Age의 합성어로, 체력을 기반으로 한 나이를 의미</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-blue-600">서비스 URL</h3>
                <a
                  href="https://fitage.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold text-blue-600 hover:underline"
                >
                  https://fitage.vercel.app
                </a>
                <p className="text-muted-foreground mt-2">Vercel 클라우드 플랫폼 배포</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-lg mb-4 text-blue-800">핵심 가치 제안</h3>
              <blockquote className="text-xl italic text-blue-900 border-l-4 border-blue-500 pl-4">
                "당신의 실제 나이는 35세, 하지만 피트에이지는 28세입니다!"
              </blockquote>
              <p className="mt-4 text-blue-700">
                국민체력측정 빅데이터({summaryStats.totalParticipants.toLocaleString()}건)를 기반으로
                자신의 체력을 동일 연령대와 비교하고, 피트에이지(체력나이)를 계산하여
                맞춤형 운동처방을 받는 서비스입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 2. 활용 데이터 */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Database className="h-5 w-5 text-emerald-600" />
              </div>
              2. 활용 데이터
            </h2>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600">데이터 출처</h3>
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                <Globe className="h-8 w-8 text-emerald-600" />
                <div>
                  <p className="font-semibold">문화빅데이터플랫폼</p>
                  <a
                    href="https://www.bigdata-culture.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    https://www.bigdata-culture.kr
                  </a>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-4 text-emerald-600">국민체육진흥공단 데이터셋 (3종)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">체력측정 항목별 측정 데이터</h4>
                <p className="text-3xl font-bold text-blue-600 mb-2">753,402건</p>
                <p className="text-sm text-muted-foreground">
                  악력, 윗몸일으키기, 유연성, 순발력, 심폐지구력 등 체력측정 원시 데이터
                </p>
                <p className="text-xs text-muted-foreground mt-2">기간: 2024.07 ~ 2025.04</p>
              </div>

              <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold mb-2">체력 측정별 운동처방 데이터</h4>
                <p className="text-3xl font-bold text-emerald-600 mb-2">393,447건</p>
                <p className="text-sm text-muted-foreground">
                  유산소, 근력, 유연성, 균형 운동 등 맞춤형 운동처방 데이터
                </p>
                <p className="text-xs text-muted-foreground mt-2">기간: 2024.10 ~ 2025.07</p>
              </div>

              <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">국민체력측정 현황 데이터</h4>
                <p className="text-3xl font-bold text-purple-600 mb-2">17개 시도</p>
                <p className="text-sm text-muted-foreground">
                  전국 시도별 체력측정 참여 현황 및 등급 분포 데이터
                </p>
                <p className="text-xs text-muted-foreground mt-2">기간: 2024.10 ~ 2025.07</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-muted-foreground">
                <strong>총 활용 데이터:</strong> 약 115만건 이상의 국민체육진흥공단 공공데이터 활용
              </p>
            </div>
          </div>
        </section>

        {/* 3. 독창성 */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
              </div>
              3. 독창성 (25%)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border-2 border-yellow-200 rounded-xl bg-yellow-50/50">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                  <h3 className="font-semibold text-lg">피트에이지(체력나이) 개념</h3>
                </div>
                <p className="text-muted-foreground">
                  기존에 없던 "체력나이" 개념을 도입하여, 실제 나이와 체력 나이의 차이를
                  직관적으로 보여주는 새로운 건강 지표 제시
                </p>
              </div>

              <div className="p-6 border-2 border-yellow-200 rounded-xl bg-yellow-50/50">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                  <h3 className="font-semibold text-lg">Z-Score 기반 체력 평가</h3>
                </div>
                <p className="text-muted-foreground">
                  통계적 Z-Score 알고리즘을 적용하여 동일 연령대/성별 대비
                  정확한 백분위 및 체력 등급 산출
                </p>
              </div>

              <div className="p-6 border-2 border-yellow-200 rounded-xl bg-yellow-50/50">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                  <h3 className="font-semibold text-lg">전국 체력 지도 시각화</h3>
                </div>
                <p className="text-muted-foreground">
                  대한민국 17개 시도의 체력측정 현황을 인터랙티브 지도로 시각화하여
                  지역별 체력 수준 비교 가능
                </p>
              </div>

              <div className="p-6 border-2 border-yellow-200 rounded-xl bg-yellow-50/50">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                  <h3 className="font-semibold text-lg">체력 프로필 레이더 차트</h3>
                </div>
                <p className="text-muted-foreground">
                  5개 체력 요소(악력, 근지구력, 유연성, 순발력, 심폐지구력)를
                  레이더 차트로 시각화하여 강점/약점 한눈에 파악
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 실용성 */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              4. 실용성 (20%)
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <p className="text-4xl font-bold text-blue-600 mb-2">5,200만</p>
                <p className="text-muted-foreground">잠재 사용자 (전 국민)</p>
              </div>
              <div className="text-center p-6 bg-emerald-50 rounded-xl">
                <p className="text-4xl font-bold text-emerald-600 mb-2">무료</p>
                <p className="text-muted-foreground">서비스 이용료</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <p className="text-4xl font-bold text-purple-600 mb-2">3분</p>
                <p className="text-muted-foreground">측정 소요 시간</p>
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-4 text-blue-600">주요 기능</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <Activity className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium">피트에이지 계산기</h4>
                  <p className="text-sm text-muted-foreground">체력측정 결과 입력 → 즉시 피트에이지 확인</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <TrendingUp className="h-5 w-5 text-emerald-500 mt-1" />
                <div>
                  <h4 className="font-medium">전국 백분위 비교</h4>
                  <p className="text-sm text-muted-foreground">동일 연령대/성별 대비 내 체력 순위 확인</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <Heart className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-medium">맞춤 운동처방</h4>
                  <p className="text-sm text-muted-foreground">체력 프로필 기반 개인화 운동 추천</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <BarChart3 className="h-5 w-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium">전국 체력 현황</h4>
                  <p className="text-sm text-muted-foreground">17개 시도 체력측정 통계 대시보드</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 발전가능성 */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              5. 발전가능성 (20%)
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">B2C (개인)</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 프리미엄 상세 분석 리포트</li>
                  <li>• 체력 추적 기록 기능</li>
                  <li>• 목표 설정 및 알림</li>
                  <li>• 운동 영상 콘텐츠 연계</li>
                </ul>
              </div>

              <div className="p-6 border rounded-xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">B2B (기업)</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 직원 건강관리 프로그램 연계</li>
                  <li>• 기업 체력 현황 대시보드</li>
                  <li>• 단체 분석 리포트</li>
                  <li>• API 제공</li>
                </ul>
              </div>

              <div className="p-6 border rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">B2G (정부/지자체)</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 지역 체육정책 수립 도구</li>
                  <li>• 취약지역 체육시설 투자 분석</li>
                  <li>• 국민 건강증진 정책 지원</li>
                  <li>• 체육시설 API 연계</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 기술성 */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Server className="h-5 w-5 text-gray-600" />
              </div>
              6. 기술성 (15%)
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-700">프론트엔드</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white text-xs font-bold">N</div>
                    <div>
                      <p className="font-medium">Next.js 16</p>
                      <p className="text-xs text-muted-foreground">App Router, Server Components</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">TS</div>
                    <div>
                      <p className="font-medium">TypeScript</p>
                      <p className="text-xs text-muted-foreground">타입 안정성</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-white text-xs font-bold">TW</div>
                    <div>
                      <p className="font-medium">Tailwind CSS v4</p>
                      <p className="text-xs text-muted-foreground">유틸리티 기반 스타일링</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-700">시각화 & 배포</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">RC</div>
                    <div>
                      <p className="font-medium">Recharts</p>
                      <p className="text-xs text-muted-foreground">차트 시각화 라이브러리</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center text-white text-xs font-bold">▲</div>
                    <div>
                      <p className="font-medium">Vercel</p>
                      <p className="text-xs text-muted-foreground">클라우드 배포 플랫폼</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">SH</div>
                    <div>
                      <p className="font-medium">shadcn/ui</p>
                      <p className="text-xs text-muted-foreground">UI 컴포넌트 라이브러리</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold mb-4">피트에이지 계산 알고리즘</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`피트에이지 = 실제나이 + Σ(항목별_편차 × 가중치)

항목별_편차 = (사용자값 - 해당연령_평균) / 해당연령_표준편차

가중치:
- 심폐지구력: 0.25
- 근력(악력): 0.20
- 근지구력(윗몸일으키기): 0.20
- 유연성: 0.15
- 순발력(제자리멀리뛰기): 0.20`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* 7. 팀 정보 */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-pink-600" />
              </div>
              7. 개발 정보
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">개발자</h3>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-lg">FitAge Team</p>
                  <p className="text-muted-foreground">2025 국민체육진흥공단 공공데이터 활용 경진대회 참가</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">개발 기간</h3>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-lg">2024.12</p>
                  <p className="text-muted-foreground">서비스 기획, 개발, 배포 완료</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">GitHub Repository</h3>
              <a
                href="https://github.com/yonghwan1106/kspo_public_data"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                소스코드 보기
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              지금 바로 피트에이지를 측정해보세요!
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              국민체력측정 빅데이터 기반의 과학적인 체력 분석으로 더 건강한 내일을 준비하세요.
            </p>
            <a
              href="/calculator"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Activity className="h-5 w-5" />
              피트에이지 측정하기
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
