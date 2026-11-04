---
permalink: /lectures/data-visualization/99_quiz/
title: "99. 퀴즈 모음"
date: 2026-11-04
series: "데이터 시각화"
series_order: 99
part: 5
categories: 데이터분석
tags: [데이터시각화, seaborn, Plotly, Python, Colab]
description: "퀴즈 모음"
prev_post: /lectures/data-visualization/17_plotly-timeseries/
---

> 정답은 각 문항 아래 "정답"을 눌러 확인함

## Part A. OX 문제

**A1.** 탐색적 데이터 분석을 할 때 데이터 시각화와 데이터 요약 정보를 활용할 수 있음

<details markdown="1"><summary>정답</summary>

**O** — EDA는 통계 지표 기반과 시각화 기반을 함께 씀. → [12](/lectures/data-visualization/12_eda/)
</details>

**A2.** 탐색적 데이터 분석을 하는 동안에는 데이터의 이상치를 판단할 수 없음

<details markdown="1"><summary>정답</summary>

**X** — 이상치 검사는 EDA의 주요 목적임(박스 플롯 등). → [12](/lectures/data-visualization/12_eda/)
</details>

**A3.** 데이터를 이해하는 가장 효과적인 방법은 막대그래프를 그리는 것임

<details markdown="1"><summary>정답</summary>

**X** — 목적(시간, 분포, 관계, 비교 등)에 맞는 그래프를 골라야 함. → [11](/lectures/data-visualization/11_chart-selection/)
</details>

**A4.** 데이터 시각화는 데이터의 추세와 이상치를 판단하는 데 유용함

<details markdown="1"><summary>정답</summary>

**O** → [01](/lectures/data-visualization/01_viz-overview/)
</details>

**A5.** 정보 디자인 프로세스에서 데이터를 재배열하면 잘못된 정보를 전달할 수 있으므로 주의해야 함

<details markdown="1"><summary>정답</summary>

**O** — 재배열은 패턴을 드러내지만 잘못하면 왜곡이 생김. → [02](/lectures/data-visualization/02_info-design-process/)
</details>

**A6.** 데이터 시각화 도구 중에는 소스 코드를 작성하지 않고 시각화 결과에서 인사이트를 주는 도구도 있음

<details markdown="1"><summary>정답</summary>

**O** — Tableau, Power BI 등 UI 기반 도구 → [03](/lectures/data-visualization/03_viz-tools/)
</details>

**A7.** 선 그래프는 점 사이의 변화 추이를 선으로 보여 주는 시각화 방법임

<details markdown="1"><summary>정답</summary>

**O** → [04](/lectures/data-visualization/04_line-chart/)
</details>

**A8.** 막대그래프는 시각적 차이를 주어 강조하는 막대를 표시하는 것이 좋음

<details markdown="1"><summary>정답</summary>

**O** → [05](/lectures/data-visualization/05_bar-chart/)
</details>

**A9.** 히트맵은 칸 하나의 색상으로 데이터 값을 표현해 여러 가지 변수를 비교할 수 있는 그래프임

<details markdown="1"><summary>정답</summary>

**O** → [06](/lectures/data-visualization/06_comparison-chart/)
</details>

**A10.** seaborn은 데이터 시각화를 위한 high-level 파이썬 패키지임

<details markdown="1"><summary>정답</summary>

**O** — matplotlib 기반의 고수준 인터페이스 → [13](/lectures/data-visualization/13_seaborn-charts/)
</details>

**A11.** scatterplot으로 x축과 y축 데이터의 상관관계를 확인할 수 있음

<details markdown="1"><summary>정답</summary>

**O** → [07](/lectures/data-visualization/07_scatter-plot/)
</details>

**A12.** x축의 이름(Month)을 설정하려면 `plt.xticks()`를 사용함

<details markdown="1"><summary>정답</summary>

**X** — 축 **이름**은 `plt.xlabel('Month')`로 정함. `plt.xticks()`는 **눈금** 위치와 레이블을 설정함
</details>

## Part B. 객관식 문제

**B1.** 다음 중 데이터 시각화의 효과로 옳지 **않은** 것은?
1. 자료에서 정보를 얻는 시간 절감
2. 데이터 통찰력을 얻을 수 있음
3. 자료를 기억하는 데 도움
4. 데이터 이상치 판단은 불가능

<details markdown="1"><summary>정답</summary>

**4** — 시각화는 추세와 이상치 판단에 유용함
</details>

**B2.** 다음 중 데이터 시각화의 효율성을 정하는 항목(ACCENT)이 **아닌** 것은?
1. Apprehension: 인식하기 쉬운가?
2. Beauty: 아름다운가?
3. Clarity: 모든 요소를 쉽게 구별할 수 있는가?
4. Necessity: 그래프가 필요한가?

<details markdown="1"><summary>정답</summary>

**2** — ACCENT = Apprehension, Clarity, Consistency, Efficiency, Necessity, Truthfulness
</details>

**B3.** 다음 중 데이터 시각화 도구에 대한 설명으로 옳지 **않은** 것은?
1. 태블로, Power BI 등은 소스 코드 없이 시각화 결과에서 인사이트를 주는 BI 도구임
2. Python, R은 데이터 분석용 프로그래밍 언어라 데이터 시각화는 불가능함
3. 엑셀로도 다양한 차트를 그릴 수 있음
4. 지도 위에 데이터를 시각화하는 도구도 있음

<details markdown="1"><summary>정답</summary>

**2** — matplotlib, seaborn, plotly, ggplot2 등으로 시각화할 수 있음
</details>

**B4.** 다음 중 점을 잇는 선으로 점 사이의 변화 추이를 보여 주는 방법은?
1. 선 그래프 2. 막대 그래프 3. 히트맵 4. 산점도

<details markdown="1"><summary>정답</summary>

**1**
</details>

**B5.** 다음 중 막대그래프를 그릴 때 유의사항으로 옳지 **않은** 것은?
1. 막대 값들의 차이가 작으면 비교하기 쉽지 않음
2. X, Y축에는 실수형 데이터를 설정하는 것이 좋음
3. 시각적 차이를 주어 강조하는 막대를 표시하는 것이 좋음
4. 데이터 분포를 표시하는 추가 막대를 만들 수도 있음

<details markdown="1"><summary>정답</summary>

**2** — 막대그래프의 가로축은 **범주형** 데이터임
</details>

**B6.** 다음 중 히트맵의 설명으로 옳지 **않은** 것은?
1. 칸 하나의 색상으로 값을 표현해 여러 변수를 비교하는 그래프임
2. 여러 변수를 다룰 때 분석의 시작점을 찾는 데 도움을 줌
3. 히트맵을 계층적으로 클러스터링해 시각화할 수도 있음
4. 데이터가 많으면 최대한 다양한 색을 써서 화려하게 표현하는 것이 중요함

<details markdown="1"><summary>정답</summary>

**4** — 데이터가 많으면 오히려 혼란스러우니 색 대신 크기를 함께 쓰는 등 단순하게 표현함
</details>

**B7.** 가로축과 세로축의 변수 값에 맞는 점을 좌표에 찍어 상관관계를 확인하는 방법은?
1. 막대그래프 2. 산점도 3. 선그래프 4. 히스토그램

<details markdown="1"><summary>정답</summary>

**2**
</details>

**B8.** 가로축에 계급, 세로축에 도수를 놓고 이어 붙인 직사각형으로 그린 그래프는?
1. 막대그래프 2. 산점도 3. 선그래프 4. 히스토그램

<details markdown="1"><summary>정답</summary>

**4**
</details>

**B9.** 문서에서 단어가 얼마나 많이 쓰였는지 빈도를 기준으로 시각화하는 방법은?
1. 워드 임베딩 2. 워드 프로젝터 3. 워드 클라우드 4. 히트맵

<details markdown="1"><summary>정답</summary>

**3**
</details>

**B10.** 다음 중 대화형(interactive) 그래프 라이브러리는?
1. matplotlib 2. plotly 3. seaborn 4. pandas

<details markdown="1"><summary>정답</summary>

**2**
</details>

**B11.** plotly의 모듈 중 high-level 인터페이스를 제공하는 것은?
1. Express 2. graph_objects 3. subplots 4. dash

<details markdown="1"><summary>정답</summary>

**1** — graph_objects는 low-level 인터페이스임
</details>

**B12.** 다음 코드에 대한 설명으로 옳지 **않은** 것은?

```python
fig = px.bar(df, x='medal', y='count', color='nation', text_auto=True)
fig.show()
```

1. 막대그래프를 만듬
2. 'nation'에 따라 다른 색이 표시됨
3. `text_auto=False`로 바꾸면 x, y축의 레이블 값이 표시되지 않음
4. x, y, color 인자로 준 값은 모두 df의 열 이름임

<details markdown="1"><summary>정답</summary>

**3** — `text_auto`는 **막대 안의 값 텍스트**만 켜고 끔. 축 레이블과는 관계가 없음
</details>
