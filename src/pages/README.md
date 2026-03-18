# pages/ — FSD Pages Layer

이 폴더는 **FSD(Feature-Sliced Design)의 `pages` 레이어**입니다.
Next.js의 App Router(`/src/app`)가 라우팅을 담당하고,
이 폴더는 각 라우트에서 사용하는 **페이지 UI 컴포넌트**를 모아둡니다.

## 사용 방법

```
src/pages/
├── home/
│   └── ui/
│       └── HomePage.tsx    ← 실제 페이지 UI
├── dashboard/
│   └── ui/
│       └── DashboardPage.tsx
```

`src/app/[locale]/(marketing)/page.tsx` 같은 route 파일은
이 폴더의 컴포넌트를 import해서 얇게 래핑하는 역할만 합니다:

```tsx
// app/[locale]/(marketing)/page.tsx
import { HomePage } from '@pages/home/ui/HomePage';
export default function Page() { return <HomePage />; }
```
