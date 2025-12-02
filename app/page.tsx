import Link from "next/link";
import { Activity, TrendingUp, Users, MapPin, Award, Heart, Dumbbell, Target } from "lucide-react";
import { summaryStats, regionalStats } from "@/lib/data/statistics";

export default function Home() {
  const topRegions = regionalStats
    .sort((a, b) => a.avgFitAge - b.avgFitAge)
    .slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero_bg.png"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-emerald-800/80 mix-blend-multiply" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">국민체력측정 빅데이터 기반</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              당신의 진짜 나이는<br />
              <span className="text-yellow-300">몇 살</span>일까요?
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              실제 나이와 체력 나이는 다릅니다. 국민체육진흥공단의 체력측정 빅데이터를 기반으로
              나만의 피트에이지를 알아보고, 맞춤형 운동처방을 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Target className="h-5 w-5" />
                내 피트에이지 측정하기
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all"
              >
                <MapPin className="h-5 w-5" />
                전국 체력 현황 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-2xl p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                {summaryStats.totalParticipants.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">총 측정 인원</p>
            </div>
            <div className="bg-card rounded-2xl p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                {summaryStats.avgFitAge > 0 ? "+" : ""}{summaryStats.avgFitAge}세
              </p>
              <p className="text-sm text-muted-foreground mt-1">평균 피트에이지</p>
            </div>
            <div className="bg-card rounded-2xl p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                {summaryStats.goldGradeRate}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">골드등급 비율</p>
            </div>
            <div className="bg-card rounded-2xl p-6 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">17</p>
              <p className="text-sm text-muted-foreground mt-1">전국 시도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              피트에이지로 알 수 있는 것
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              국민체력측정 데이터 {summaryStats.totalParticipants.toLocaleString()}건을 분석하여
              과학적인 체력 평가와 맞춤형 운동처방을 제공합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">피트에이지 측정</h3>
              <p className="text-muted-foreground">
                악력, 윗몸일으키기, 유연성, 순발력, 심폐지구력 5개 항목을 측정하여
                실제 나이 대비 체력 나이를 계산합니다.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">전국 백분위 비교</h3>
              <p className="text-muted-foreground">
                동일 연령대, 동일 성별 대비 내 체력이 상위 몇 %인지
                정확하게 확인할 수 있습니다.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">맞춤 운동처방</h3>
              <p className="text-muted-foreground">
                체력 프로필 분석을 통해 부족한 부분을 보완할 수 있는
                개인 맞춤형 운동을 추천받습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Ranking Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              전국 체력 현황
            </h2>
            <p className="text-muted-foreground">
              피트에이지가 가장 젊은 지역은 어디일까요?
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white">
                <h3 className="font-semibold text-lg">피트에이지 TOP 5 지역</h3>
              </div>
              <div className="divide-y">
                {topRegions.map((region, index) => (
                  <div key={region.region} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? "bg-yellow-400 text-yellow-900" :
                        index === 1 ? "bg-gray-300 text-gray-700" :
                          index === 2 ? "bg-orange-300 text-orange-800" :
                            "bg-muted text-muted-foreground"
                        }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium">{region.region}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {region.participants.toLocaleString()}명
                      </span>
                      <span className={`font-bold ${region.avgFitAge < 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {region.avgFitAge > 0 ? "+" : ""}{region.avgFitAge}세
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-muted/50 text-center">
                <Link href="/dashboard" className="text-primary hover:underline font-medium">
                  전국 17개 시도 체력 현황 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              피트에이지 측정 방법
            </h2>
            <p className="text-muted-foreground">
              간단한 3단계로 나만의 피트에이지를 확인하세요
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">기본 정보 입력</h3>
              <p className="text-sm text-muted-foreground">
                나이, 성별, 신장, 체중을<br />입력합니다
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">체력측정 결과 입력</h3>
              <p className="text-sm text-muted-foreground">
                악력, 윗몸일으키기, 유연성,<br />순발력 기록을 입력합니다
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">결과 확인</h3>
              <p className="text-sm text-muted-foreground">
                피트에이지와 맞춤형<br />운동처방을 확인합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0">
              <img
                src="/images/cta_bg.png"
                alt="Active Lifestyle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-emerald-900/80 mix-blend-multiply" />
            </div>
            <div className="relative z-10 py-16 px-8 text-center text-white">
              <Heart className="h-12 w-12 mx-auto mb-6 animate-pulse text-red-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
                지금 바로 측정해보세요
              </h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto drop-shadow-sm">
                국민체육진흥공단의 빅데이터를 기반으로 한 과학적인 체력 분석으로
                더 건강한 내일을 준비하세요.
              </p>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Activity className="h-5 w-5" />
                무료로 피트에이지 측정하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data Source Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">데이터 출처</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>체력측정 항목별 측정 데이터 (753,402건)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span>운동처방 데이터 (393,447건)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>국민체력측정 현황 데이터 (17개 시도)</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            ※ 본 서비스는 국민체육진흥공단 공공데이터를 활용하여 제작되었습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
