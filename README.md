# 코인정보 제공 사이트

## Overview

![미리보기](./wiki/overview.gif)

Coinpaprika API를 사용해 다양한 코인의 시세정보를 제공해주는 사이트입니다.

#### 배포 주소: [https://yyyrin.github.io/coin-info-site/](https://yyyrin.github.io/coin-info-site/)

<br/>

## 주요 기능

#### 코인 시세 차트

- `ApexChart`를 사용하여 line chart와 candlestick chart로 data 시각화

#### 다크모드 / 라이트모드 버튼

- Recoil을 사용하여 다크모드와 라이트모드 버튼 구현

<br/>

## Tech Stack

- React
- TypeScript
- React Router Dom
- styled-components
- React Query
- Recoil

<br/>

## Quick start

Run the project by running:

```bash
npm install
npm start
```

<br/>

## 회고

#### Keep (유지할 점)

- **light / dark 모드 고려**
  - 프로젝트에 light 및 dark 모드를 고려하여 개발함.
- **새로운 기술 적용**
  - `React Query`와 `ApexChart`를 처음 도입하여 프로젝트에 적용함.
  - 새로운 기술 도입 시 스스로 학습하면서 유연함을 기를 수 있었음.
- **Router 이해 개선**
  - Router의 이해가 부족한 상태에서 정리할 수 있는 기회를 통해 더 나은 이해를 얻었음.
  - 빠르게 개발해야 하는 상황이라도 알고 쓰자!

#### Problem (문제점)

- **React Router Dom 버전 사용**
  - 최신 버전인 v6를 사용하지 않고 이전 버전인 v5를 선택함.
  - 성능상 차이를 명확하게 체감하지 못해, 향후 프로젝트에서는 v6를 사용할 예정.
- **API 변경으로 인한 오류**
  - Coinpaprika API가 유료로 전환됨에 따라 렌더링 시 404 오류 발생.
- **트러블 슈팅 기록 부족**
  - 프로젝트 중 발생한 문제에 대한 트러블 슈팅 기록이 부족함.

#### Try (개선할 점)

- **React Router Dom v6 사용**
  - 프로젝트에서는 최신 버전인 v6를 적용하여 사용할 것.
- **무료 API 활용 및 안정성 향상**
  - 코인 관련 데이터를 무료로 제공하는 API를 활용하여 프로젝트 안정성을 높이는 리팩토링 진행.
- **트러블 슈팅 기록 강화**
  - 발생한 문제와 그에 대한 해결 과정을 기록하며 트러블 슈팅에 대한 습관을 강화.
