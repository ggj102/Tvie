## [1.1.1] - 2023-11-28

### Changed

- SSR 전환

  - searchResultsTab을 제외한 전체 페이지 SSR 적용
  - 페이지를 서버 컴포넌트로 전환하여 구현

- hook 패턴 적용

  - 비지니스 로직과 ui 로직을 분리하기 위해 적용

- UI 수정
  - 기존 검색바의 위치가 애매하여 내비게이션에 고정

## [1.1.0] - 2023-11-21

### Added

- 로딩 추가
- SASS
- 이미지, 텍스트 드래그 off

### Changed

- CSS 라이브러리 Styled-components -> SASS로 변경
- customCheckbox MUI -> css로 자체 구현

### Removed

- Styled-components

## [1.0.0] - 2023-11-15

### Added

- 첫 배포 버전
- [TMDB](https://www.themoviedb.org/?language=ko)에서 제공하는 [Open Api](https://developer.themoviedb.org/reference/intro/getting-started) 연동
- 검색, 필터, 데이터 로드 기능 구현
- TMDB의 일부 페이지 구현
  - 메인
  - Movie/TV
  - 인물
  - Movie/TV 상세
  - 인물 상세
  - 검색 결과
