---
permalink: /lectures/data-visualization/07_scatter-plot/
title: "07. 산점도 (Scatter plot)"
date: 2026-11-04
series: "데이터 시각화"
series_order: 7
part: 2
categories: 데이터분석
tags: [데이터시각화, seaborn, Plotly, Python, Colab]
description: "산점도 (Scatter plot)"
prev_post: /lectures/data-visualization/06_comparison-chart/
next_post: /lectures/data-visualization/08_distribution/
---

> 준비: [공통 준비 셀](/lectures/data-visualization/#common-setup) 실행

## 학습 목표
- 산점도로 두 변수의 상관관계를 읽을 수 있음
- 회귀선과 잔차 그래프를 그리고, 회귀선의 함정(앤스컴 콰르텟)을 설명할 수 있음
- 색·모양·크기로 세 번째 변수를 표현할 수 있음
- pairplot, jointplot으로 여러 분포를 한 번에 볼 수 있음

## 1. 관계 시각화
- 데이터 간의 상관관계를 알면, 한 값의 변화로 다른 값의 변화를 **예측**할 수 있음
- 대표 기법: 산점도, 히스토그램, 버블 차트

## 2. 산점도
가로축과 세로축의 변수 값에 맞는 점을 좌표에 찍어 상관관계를 봄

| 점의 배치 | 해석 |
|---|---|
| 오른쪽 위로 올라감 | **양**의 상관관계 |
| 오른쪽 아래로 내려감 | **음**의 상관관계 |
| 패턴 없음 | 상관관계 없음 |

```python
tips = sns.load_dataset('tips')
sns.scatterplot(data=tips, x='total_bill', y='tip')
plt.show()
```

- 데이터가 얼마나 퍼져 있는지, 점들끼리 관련이 있는지 파악하고 **패턴을 빨리 찾는 데** 도움이 됨
- **점이 많을 때** 특히 유용하고, 점이 적으면 막대그래프나 표가 더 나을 수 있음

## 3. 회귀선 추가
### 예시 1. 산점도 + 회귀선
회귀선이 있으면 데이터의 경향을 이해하기 쉽음

```python
sns.regplot(data=tips, x='total_bill', y='tip')
plt.show()

sns.lmplot(data=tips, x='total_bill', y='tip', hue='smoker')   # 그룹별 회귀선
plt.show()
```

### 예시 2. 여러 속성 중 상관관계 있는 변수 빨리 찾기
`mpg`(연비)에 영향을 주는 변수를 봄

```python
mpg = sns.load_dataset('mpg')
sns.pairplot(mpg, x_vars=['displacement', 'horsepower', 'weight', 'acceleration'],
             y_vars=['mpg'], kind='reg', height=3,
             plot_kws={'scatter_kws': {'alpha': 0.3}})
plt.show()
```

### 회귀선 유의사항 — 앤스컴 콰르텟 (Anscombe's quartet)
**같은 회귀선이 그려져도 원래 데이터의 분포는 전혀 다를 수 있음.**

```python
anscombe = sns.load_dataset('anscombe')
sns.lmplot(data=anscombe, x='x', y='y', col='dataset', hue='dataset',
           col_wrap=2, ci=None, height=3, scatter_kws={'s': 50, 'alpha': 1})
plt.show()

anscombe.groupby('dataset')[['x', 'y']].agg(['mean', 'std'])   # 요약 통계는 거의 같음
```

| 데이터셋 | 실제 모양 |
|---|---|
| I | 선형 관계 |
| II | 곡선 관계 |
| III | 선형 + 이상치 1개 |
| IV | x가 거의 한 값 + 이상치 1개 |

### 잔차 그래프 (Residual plot)
회귀선과 실제 값의 차이(잔차)를 그림. 잔차에 **패턴이 보이면** 선형 모델이 맞지 않는다는 뜻임

```python
rs = np.random.RandomState(7)
x = rs.normal(2, 1, 75)
y = 2 + 1.5 * x + rs.normal(0, 2, 75)
sns.residplot(x=x, y=y, lowess=True, line_kws=dict(color='r'))
plt.show()
```

> 잔차가 0 주변에 고르게 흩어져 있으면 선형 모델이 적절함
> `lowess=True`(추세 곡선)는 `statsmodels`가 필요함. Colab에는 기본 설치되어 있고, 다른 환경에서는 `!pip install statsmodels`로 설치함

## 4. 세 번째 변수 표현하기
### 예시 3. 색으로 구분
범주형 변수를 색으로 나눠 2차원 화면에서 **3번째 속성**까지 봄. 범주에 따라 값이 뚜렷이 나뉠 때 숨은 패턴이 드러남

```python
penguins = sns.load_dataset('penguins')
sns.scatterplot(data=penguins, x='flipper_length_mm', y='bill_length_mm', hue='species')
plt.show()
```

### 색 + 모양으로 구분

```python
sns.scatterplot(data=penguins, x='flipper_length_mm', y='bill_length_mm',
                hue='species', style='sex', s=60)
plt.show()
```

### 예시 4. 크기로 구분 — 버블 차트
- 크기를 갖는 변수는 **점의 크기**로 나타냄
- 값이 수십~수백 개이거나 자릿수 차이가 큰 데이터에 좋음
- 점 크기가 비슷하면 해석이 모호할 수 있음

```python
sns.scatterplot(data=mpg, x='horsepower', y='mpg', hue='origin',
                size='weight', sizes=(20, 300), alpha=0.5)
plt.show()
```

### 실습: 2015 무단횡단 버블 차트
> 데이터 준비: [10 문서 4절](/lectures/data-visualization/10_spatial-viz/#data-prep)
- X: 관할경찰서, Y: 발생건수, 크기: 사상자수

```python
import plotly.express as px

by_police = (jaywalk.groupby('관할경찰서', as_index=False)[['발생건수', '사상자수']].sum()
             .sort_values('발생건수', ascending=False).head(20))
fig = px.scatter(by_police, x='관할경찰서', y='발생건수', size='사상자수',
                 color='사상자수', hover_name='관할경찰서', size_max=40,
                 title='관할경찰서별 무단횡단 사고 (상위 20)')
fig.show()
```

## 5. 범주형 X축 산점도 — strip / swarm plot
X가 범주형이면 범주마다 점이 기둥처럼 쌓임. 범주별로 Y값이 어떻게 퍼져 있는지 봄

```python
sns.stripplot(data=tips, x='day', y='total_bill', jitter=True)   # 점을 옆으로 흩뿌림
plt.show()
sns.swarmplot(data=tips, x='day', y='total_bill', hue='sex')     # 점이 겹치지 않게 배치
plt.show()
```

## 6. 여러 분포를 한 번에
### 산점도 행렬 (pairplot)
모든 변수 쌍의 산점도와, 변수별 분포(대각선)를 한눈에 봄 (seaborn 예제: scatterplot_matrix)

```python
sns.pairplot(penguins, hue='species')
plt.show()
```

### 산점도 + 박스플롯 (plotly marginal plot)

```python
df = px.data.iris()
fig = px.scatter(df, x='sepal_length', y='sepal_width', color='species',
                 marginal_x='box', marginal_y='box')
fig.show()
```

### 산점도 + 히스토그램 (jointplot)

```python
sns.jointplot(data=penguins, x='flipper_length_mm', y='bill_length_mm', hue='species')
plt.show()
sns.jointplot(data=penguins, x='flipper_length_mm', y='bill_length_mm', kind='reg')
plt.show()
```

### 산점도 + 히트맵 (seaborn 예제: layered_bivariate_plot)
점이 **빽빽한 곳은 히트맵**으로, **드문 곳은 점**으로 보여 줌

```python
rs = np.random.default_rng(0)
x = rs.normal(size=10000)
y = x * 0.6 + rs.normal(size=10000)

f, ax = plt.subplots(figsize=(6, 6))
sns.scatterplot(x=x, y=y, s=5, color='.15')
sns.histplot(x=x, y=y, bins=50, pthresh=.1, cmap='mako')
sns.kdeplot(x=x, y=y, levels=5, color='w', linewidths=1)
plt.show()
```

## 정리

| 목적 | 함수 |
|---|---|
| 두 변수 관계 | `sns.scatterplot` |
| 회귀선 | `sns.regplot`, `sns.lmplot` |
| 잔차 | `sns.residplot` |
| 3번째 변수 | `hue=`(색), `style=`(모양), `size=`(크기) |
| 범주 × 연속 | `sns.stripplot`, `sns.swarmplot` |
| 모든 변수 쌍 | `sns.pairplot` |
| 산점도 + 주변 분포 | `sns.jointplot`, `px.scatter(marginal_x=...)` |

- **회귀선만 보지 말고 원래 점도 함께 보기** (앤스컴 콰르텟)
