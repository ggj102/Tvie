## [1.3.1] - 2024-01-22

### Added

- 히스토리 페이지 추가

  - 로컬스토리지에서 데이터를 관리한다.
  - 히스토리 페이지는 모든 사용자가 사용할 수 있는 페이지이다.
  - 상세 페이지 진입 시 목록에 추가 된다. (ContentsDetail, PersonDetail)
  - 최근 본 목록은 사용자에게 중요도가 낮은 목록이므로 개별 삭제 기능은 존재하지 않는다.
  - 최근 본 목록에서도 세션이 있는 상태라면 즐겨찾기 기능도 이용할 수 있다.
  - 중복 일 경우 기존 데이터는 삭제하고 앞에 추가
  - 목록 비우기를 통해 모든 목록을 리셋한다.

## [1.2.1] - 2024-01-04

### Added

- Auth0 추가

  - 로그인/로그아웃 기능 추가
  - google, github, test id로 로그인 가능

- 즐겨찾기 페이지 추가

  - 로그인 시 navigation에 활성화
  - 로그인 시 각 리스트에 즐겨찾기를 할 수 있는 마크 활성화

### Changed

- SSR 전환

  - searchResultsTab을 제외한 전체 페이지 SSR 적용
  - 페이지를 서버 컴포넌트로 전환하여 구현

- hook 패턴 적용

  - 비지니스 로직과 ui 로직을 분리하기 위해 적용

- UI 수정
  - 기존 검색바의 위치가 애매하여 내비게이션에 고정

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
