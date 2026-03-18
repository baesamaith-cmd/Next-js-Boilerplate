# Feature-Sliced Design (FSD) 아키텍처 가이드

이 보일러플레이트는 **FSD(Feature-Sliced Design)** 아키텍처를 따릅니다.
> 공식 문서: https://feature-sliced.design

---

## 폴더 구조

```
src/
├── app/                        # Next.js App Router (라우팅 전용)
│   └── [locale]/
│       ├── (marketing)/        # 공개 페이지 라우트
│       ├── (auth)/             # 인증 후 페이지 라우트
│       └── layout.tsx
│
├── pages/                      # FSD pages 레이어
│   └── [page-name]/            # 각 페이지별 UI 컴포넌트
│       └── ui/
│
├── widgets/                    # 복합 UI 블록 (여러 feature를 조합)
│   └── base-layout/
│       └── ui/
│           └── BaseTemplate.tsx
│
├── features/                   # 사용자 인터랙션 단위 기능
│   └── counter/
│       ├── ui/                 # CounterForm, CurrentCount
│       └── model/              # 유효성 검사, 비즈니스 로직
│
├── entities/                   # 도메인 모델 (DB 스키마, 타입)
│   └── counter/
│       └── model/
│           └── Schema.ts
│
└── shared/                     # 도메인-독립적인 공통 코드
    ├── ui/                     # 공통 UI 컴포넌트
    ├── lib/                    # 외부 라이브러리 래퍼, 유틸
    ├── config/                 # AppConfig 등 앱 설정
    ├── types/                  # 전역 타입 정의
    ├── locales/                # i18n 번역 파일
    └── styles/                 # 전역 CSS
```

---

## 레이어 의존성 규칙

레이어는 **아래 방향으로만** 의존할 수 있습니다:

```
app → pages → widgets → features → entities → shared
```

- `features`는 `shared`, `entities`만 import 가능
- `widgets`는 `features`, `entities`, `shared`만 import 가능
- 같은 레이어 내 다른 슬라이스 간 import **금지**

---

## Path Aliases (tsconfig.json)

| Alias | 경로 |
|---|---|
| `@shared/*` | `src/shared/*` |
| `@entities/*` | `src/entities/*` |
| `@features/*` | `src/features/*` |
| `@widgets/*` | `src/widgets/*` |
| `@pages/*` | `src/pages/*` |
| `@/*` | `src/*` (레거시/Next.js 내부용) |

### 사용 예시

```tsx
// ✅ 올바른 FSD import
import { BaseTemplate } from '@widgets/base-layout/ui/BaseTemplate';
import { CounterForm } from '@features/counter/ui/CounterForm';
import { counterSchema } from '@entities/counter/model/Schema';
import { db } from '@shared/lib/DB';

// ✅ barrel index로도 가능
import { CounterForm } from '@features/counter';
import { db, logger } from '@shared/lib';
```

---

## 새 프로젝트 시작 시 체크리스트

1. **도메인 파악**: 어떤 entities(도메인 모델)가 있는지 정의
2. **features 설계**: 각 사용자 인터랙션을 feature 슬라이스로 분리
3. **widgets 구성**: 여러 feature를 묶는 복합 UI 블록 설계
4. **pages 연결**: `src/pages/` 에 페이지 컴포넌트 작성, `src/app/` route에서 import

---

## 새 feature 추가 예시 (예: 장바구니)

```
src/features/cart/
├── ui/
│   ├── AddToCartButton.tsx
│   └── CartSummary.tsx
├── model/
│   ├── cartStore.ts           # Zustand/Jotai 등 상태 관리
│   └── cartValidation.ts
└── index.ts                   # barrel export
```
