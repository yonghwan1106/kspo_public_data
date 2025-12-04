"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Activity, MapPin, Target, ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  highlight: string;
  subtitle: string;
  bgImage: string;
  bgGradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "당신의 진짜 나이는",
    highlight: "몇 살",
    subtitle: "실제 나이와 체력 나이는 다릅니다. 국민체육진흥공단의 체력측정 빅데이터를 기반으로 나만의 피트에이지를 알아보세요.",
    bgImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80",
    bgGradient: "from-blue-900/85 via-blue-800/80 to-emerald-800/85",
  },
  {
    id: 2,
    title: "75만명의 데이터로",
    highlight: "과학적 분석",
    subtitle: "753,402건의 체력측정 빅데이터를 분석하여 동일 연령대, 성별 대비 정확한 체력 수준을 확인할 수 있습니다.",
    bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
    bgGradient: "from-emerald-900/85 via-teal-800/80 to-blue-800/85",
  },
  {
    id: 3,
    title: "나에게 맞는",
    highlight: "운동처방",
    subtitle: "39만건의 운동처방 데이터를 기반으로 부족한 체력 요소를 보완할 수 있는 맞춤형 운동을 추천받으세요.",
    bgImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80",
    bgGradient: "from-purple-900/85 via-indigo-800/80 to-blue-800/85",
  },
  {
    id: 4,
    title: "전국 17개 시도",
    highlight: "체력 지도",
    subtitle: "대한민국 전역의 체력 현황을 한눈에 확인하고, 우리 지역의 체력 수준을 비교해보세요.",
    bgImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&q=80",
    bgGradient: "from-orange-900/85 via-red-800/80 to-pink-800/85",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[10000ms]"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              transform: index === currentSlide ? "scale(1)" : "scale(1.05)",
            }}
          />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">국민체력측정 빅데이터 기반</span>
            </div>

            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                }`}
              >
                {index === currentSlide && (
                  <>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                      {slide.title}
                      <br />
                      <span className="text-yellow-300">{slide.highlight}</span>
                      {slide.id === 1 ? "일까요?" : ""}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </>
                )}
              </div>
            ))}

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
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-10 h-3 bg-white rounded-full"
                : "w-3 h-3 bg-white/50 rounded-full hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/20">
        <div
          className="h-full bg-white/80 transition-all duration-100"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
