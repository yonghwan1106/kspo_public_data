import { Activity } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                FitAge
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              국민체력측정 빅데이터 기반<br />
              나만의 피트에이지를 알아보세요
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/calculator" className="hover:text-primary">피트에이지 측정</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary">전국 체력 현황</Link></li>
              <li><Link href="/exercise" className="hover:text-primary">운동처방 가이드</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">데이터 출처</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.bigdata-culture.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  문화빅데이터플랫폼
                </a>
              </li>
              <li>
                <a
                  href="https://www.data.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  공공데이터포털
                </a>
              </li>
              <li>국민체육진흥공단</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">문의</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>국민체육진흥공단</li>
              <li>체육종합빅데이터센터</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            2025 국민체육진흥공단 공공데이터 활용 경진대회 출품작
          </p>
          <p className="mt-1">
            데이터 출처: 국민체육진흥공단 체력측정 항목별 측정 데이터, 운동처방 데이터
          </p>
        </div>
      </div>
    </footer>
  );
}
