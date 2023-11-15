## 프로젝트 소개
- 기간: 2023.11.2 ~ 2023.11.15(첫배포)
- [TMDB](https://www.themoviedb.org/) 사이트와 유사하게 구현
- TMDB에서 제공하는 [Open API](https://developer.themoviedb.org/reference/intro/getting-started) 기반으로 데이터 구성
- 영화, TV, 인물 관련 정보를 얻는 페이지

## 실행 가이드

```bash
// 설치
npm install

// 개발 모드
npm run dev

// 빌드
npm run build

// 프로덕션 모드
npm run strat
```

## 페이지 구성

- main
- movie
- tv
- person
- contentDetail
- personDetail
- searchResults

## 프레임 워크 및 주요 라이브러리

- NextJS
- Typescript
- Styled-components, MUI
- react-hook-form

## 배포

- vercel을 통한 자동배포
- url - https://tvie-one.vercel.app/
