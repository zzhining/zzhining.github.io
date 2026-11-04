---
permalink: /lectures/data-visualization/11_chart-selection/
title: "11. 차트 선택 가이드"
date: 2026-11-04
series: "데이터 시각화"
series_order: 11
part: 2
categories: 데이터분석
tags: [데이터시각화, seaborn, Plotly, Python, Colab]
description: "차트 선택 가이드"
prev_post: /lectures/data-visualization/10_spatial-viz/
next_post: /lectures/data-visualization/12_eda/
---

## 학습 목표
- 전달할 내용(목적)에 맞는 차트를 고를 수 있음

## 1. 빅데이터 시각화의 원칙
- 넓게 흩어진 방대한 자료를 분석해 **한눈에 볼 수 있도록** 도표나 차트로 정리하는 것임
- 화려한 그래프보다 **분석 내용을 효율적으로 전달**하는 그래프를 고름

## 2. 목적별 차트 선택표

| 보여 줄 것 | 질문 예 | 차트 | 문서 |
|---|---|---|---|
| **시간** (변화·추세) | 매출이 어떻게 변했나? | 선 그래프, 막대 그래프, 누적 영역 | [04](/lectures/data-visualization/04_line-chart/), [05](/lectures/data-visualization/05_bar-chart/) |
| **분포** | 값이 어디에 몰려 있나? | 히스토그램, KDE, 박스·바이올린 | [08](/lectures/data-visualization/08_distribution/) |
| **관계** (상관관계) | 키가 크면 몸무게도 클까? | 산점도, 버블 차트, 회귀선 | [07](/lectures/data-visualization/07_scatter-plot/) |
| **비교** (여러 데이터) | 여러 변수를 한 번에 비교하려면? | 히트맵, 스타 차트, 평행 좌표계 | [06](/lectures/data-visualization/06_comparison-chart/) |
| **구성** (전체 vs 부분) | 전체에서 각 부분이 차지하는 비율은? | 파이·도넛 차트, 트리맵, 누적 막대 | [06](/lectures/data-visualization/06_comparison-chart/), [16](/lectures/data-visualization/16_plotly-pie-bubble/) |
| **텍스트** | 문서의 핵심 단어는? | 워드클라우드 | [09](/lectures/data-visualization/09_text-viz/) |
| **공간** | 어느 지역에 많은가? | 지도(버블, 단계구분도, 히트맵) | [10](/lectures/data-visualization/10_spatial-viz/) |

## 3. 차트 계열별 요약
### 선 그래프 계열
- 변수의 변화, 트렌드, 변화율이 중요할 때 씀. 점은 X-Y 좌표 위치이고, 선분은 점 사이의 변화를 보여 줌
- 관련 차트: 회귀선, 잔차 그래프, 평행 좌표계, 누적 연속 그래프

### 막대 그래프 계열
- 수치를 길이로 표현한 막대를 늘어놓음
- 관련 차트: 히스토그램, 박스 플롯, 바이올린 플롯, 누적 막대

### 히트맵 계열 (비교)
- 칸 하나의 색으로 값을 나타내 여러 변수를 비교함
- 관련 차트: 클러스터맵, 파이 차트, 나이팅게일 차트, 거미줄 차트, 트리맵

## 4. 빠른 판단 흐름

```
무엇을 보여 줄까?
├─ 시간에 따른 변화 ─────────▶ 선 그래프 (구간이 적으면 막대)
├─ 하나의 변수 분포 ─────────▶ 히스토그램 / KDE (그룹 비교면 박스·바이올린)
├─ 두 변수의 관계 ───────────▶ 산점도 (+ 회귀선, 3번째 변수는 색·크기)
├─ 범주별 크기 비교 ─────────▶ 막대 그래프 (범주 많으면 가로 막대 + 정렬)
├─ 전체 중 비율 ─────────────▶ 파이(조각 5개 이하) / 트리맵(계층) / 누적 막대
├─ 많은 변수를 한 번에 ──────▶ 히트맵 / 평행 좌표계 / pairplot
└─ 위치 ─────────────────────▶ 지도
```

## 5. 체크리스트 (ACCENT)
- [ ] 관계가 바로 보이는가? (Apprehension)
- [ ] 요소가 서로 구별되는가? (Clarity)
- [ ] 다른 그래프와 같은 규칙으로 읽히는가? (Consistency)
- [ ] 복잡하지 않은가? (Efficiency)
- [ ] 이 그래프가 꼭 필요한가? 표가 더 낫지 않은가? (Necessity)
- [ ] 축과 척도가 값을 왜곡하지 않는가? (Truthfulness)

→ ACCENT 원칙 설명: [02 문서](/lectures/data-visualization/02_info-design-process/)
