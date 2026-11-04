---
permalink: /lectures/data-visualization/06_comparison-chart/
title: "06. 비교 시각화"
date: 2026-11-04
series: "데이터 시각화"
series_order: 6
part: 2
categories: 데이터분석
tags: [데이터시각화, seaborn, Plotly, Python, Colab]
description: "비교 시각화"
prev_post: /lectures/data-visualization/05_bar-chart/
next_post: /lectures/data-visualization/07_scatter-plot/
---

> 준비: [공통 준비 셀](/lectures/data-visualization/#common-setup) 실행

## 학습 목표
- 비교 시각화가 필요한 이유를 설명할 수 있음
- heatmap, clustermap, treemap, 레이더 차트, 나이팅게일 차트, 파이 차트, 평행 좌표계를 그릴 수 있음

## 1. 왜 비교 시각화인가
- **여러 변수**를 비교하거나, 변수가 많고 세부 분류가 많을 때 **전체를 한 번에** 비교함
- 변수가 많으면 처음 부딪히는 문제는 **어디서부터 볼지(시작점)** 정하는 것임. 변수와 세부 분류에 압도되면 분석이 막힘
- 효과: 전체를 한 번 훑어본 뒤 흥미로운 점을 짚고, 다른 점을 찾아 나갈 방향을 줌
- 기법: 히트맵, 스타 차트·나이팅게일 차트, 평행 좌표계 등

## 2. 히트맵 (Heatmap)
- 칸 하나의 **색**으로 값을 나타내 여러 변수를 비교함
- 한 행을 왼쪽에서 오른쪽으로 읽으면 한 대상의 모든 변수를, 한 열을 위아래로 읽으면 한 변수의 모든 대상을 봄

### 원본 데이터 vs 히트맵 — 연도·월별 탑승객

```python
flights = sns.load_dataset('flights')
pivot = flights.pivot(index='month', columns='year', values='passengers')
pivot                     # 숫자 표: 흐름이 잘 안 보임

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, fmt='d', cmap='YlGnBu')
plt.show()
```

> 해마다 늘어나는 추세(→)와 7~8월에 몰리는 계절성(↓)이 한눈에 보임

### 활용 사례 (1) 그룹별·기간별 비교
항공사별·월별 지연 데이터 대신 같은 구조의 `flights` 데이터를 씀. 절대값 대신 **연도 안에서의 비율**로 바꾸면 계절 패턴이 더 잘 보임

```python
ratio = pivot / pivot.sum()          # 열(연도)마다 합이 1이 되도록
sns.heatmap(ratio, cmap='Reds', annot=True, fmt='.1%')
plt.show()
```

### 활용 사례 (2) 상관계수로 영향력 있는 변수 찾기
`mpg`(자동차 연비) 데이터를 씀

```python
mpg = sns.load_dataset('mpg')
corr = mpg.corr(numeric_only=True)
mask = np.triu(np.ones_like(corr, dtype=bool))      # 위쪽 삼각형 숨기기 (중복 제거)

sns.heatmap(corr, mask=mask, annot=True, fmt='.2f',
            cmap='coolwarm', vmin=-1, vmax=1, center=0)
plt.show()
```

> `mpg`(연비)와 가장 강하게 관련된 변수는 `weight`(무게)임(음의 상관)

### 유의사항: 데이터가 너무 많으면 → 색 대신 크기를 씀
변수가 많으면 색만으로는 혼란스럽음. 값의 크기를 **원의 크기**로 같이 보여 주면 읽기 쉽음 (seaborn 예제: heat_scatter)

```python
long = corr.stack().reset_index(name='r')
long.columns = ['x', 'y', 'r']
long['abs_r'] = long['r'].abs()

g = sns.relplot(data=long, x='x', y='y', hue='r', size='abs_r',
                palette='vlag', hue_norm=(-1, 1), sizes=(20, 400),
                edgecolor='0.7', height=5)
g.set(xlabel='', ylabel='')
g.ax.tick_params(axis='x', rotation=90)
plt.show()
```

## 3. 클러스터맵 (Clustermap)
- 히트맵의 행과 열을 **계층적 군집**으로 다시 배열하고 덴드로그램을 함께 그림. 비슷한 것끼리 모임

```python
iris = sns.load_dataset('iris')
species = iris.pop('species')
lut = dict(zip(species.unique(), ['r', 'g', 'b']))

sns.clustermap(iris, row_colors=species.map(lut), standard_scale=1, cmap='mako')
plt.show()
```

> 왼쪽 색 띠(품종)가 군집 결과와 거의 맞아떨어짐

## 4. 트리맵 (Treemap)
- **면적 기반** 시각화로, 사각형의 크기가 값을 나타냄
- 바깥 사각형은 대분류, 안쪽 사각형은 세부 분류임. **계층(트리) 구조 데이터**에 좋음

```python
import plotly.express as px

df = px.data.gapminder().query('year == 2007')
fig = px.treemap(df, path=[px.Constant('World'), 'continent', 'country'],
                 values='pop', color='lifeExp', color_continuous_scale='RdBu')
fig.show()
```

> seaborn에는 트리맵이 없어서 plotly를 씀 ([15 문서](/lectures/data-visualization/15_plotly-express/)). 사각형을 클릭하면 그 안으로 들어감

## 5. 거미줄 차트 (레이더 차트, 스타 차트)
- 중심에서 바깥으로 축을 여러 개 그리고, 변수 값을 **중심으로부터의 거리**로 표시함
- 중심은 최솟값, 바깥 끝은 최댓값임
- 대상 몇 개의 **여러 지표를 한 번에 비교**할 때 좋음 (예: 선수 능력치)

### 실습: 2015 무단횡단 데이터 — 시도별 사고 현황
> 데이터 준비는 [10 문서 4절](/lectures/data-visualization/10_spatial-viz/#data-prep)을 참고. 여기서는 `jaywalk` DataFrame과 `시도` 열을 만들었다고 가정함

```python
import plotly.graph_objects as go

cols = ['발생건수', '사상자수', '사망자수', '중상자수', '경상자수', '부상신고자수']
by_sido = jaywalk.groupby('시도')[cols].sum()
top5 = by_sido.sort_values('발생건수', ascending=False).head(5)
scaled = top5 / top5.max()                     # 지표마다 단위가 달라 0~1로 맞춤

fig = go.Figure()
for sido, row in scaled.iterrows():
    fig.add_trace(go.Scatterpolar(r=list(row) + [row.iloc[0]],     # 처음 값을 끝에 붙여 도형을 닫음
                                  theta=cols + [cols[0]],
                                  name=sido, fill='toself', opacity=0.5))
fig.update_layout(polar=dict(radialaxis=dict(range=[0, 1])),
                  title='발생건수 상위 5개 시도의 사고 지표 (최댓값=1)')
fig.show()
```

> **해석**: 시도별 사고 규모와 구성(사망·중상 비중)을 한 번에 비교할 수 있음

## 6. 나이팅게일 차트 (로즈 다이어그램)
- 부채꼴의 **면적**으로 값을 비교함. 각도로 범주(예: 월)를, 반지름으로 크기를 나타냄
- 2차원이면서 여러 변수를 표현함

```python
wind = px.data.wind()                       # 풍향(direction) × 풍속 구간(strength) × 빈도
fig = px.bar_polar(wind, r='frequency', theta='direction', color='strength',
                   color_discrete_sequence=px.colors.sequential.Plasma_r)
fig.show()
```

## 7. 파이 차트 (Pie chart)
- 전체를 100%로 놓고 **부분 간의 비율**을 보여 줌
- 조각의 각도 = 값이 전체 360°에서 차지하는 비율
- 눈으로 면적을 어림해 비교해야 해서 해석이 어려울 때가 있음. 조각 수는 최소로 줄이고, **텍스트와 퍼센트**를 함께 넣음

```python
tips = sns.load_dataset('tips')
counts = tips['day'].value_counts()

plt.pie(counts, labels=counts.index, autopct='%1.1f%%', startangle=90,
        explode=[0.05] + [0] * (len(counts) - 1))     # 첫 조각 살짝 분리
plt.title('요일별 방문 비율')
plt.show()
```

> 인터랙티브 파이·도넛 차트는 [16 문서](/lectures/data-visualization/16_plotly-pie-bubble/)를 참고

## 8. 평행 좌표계 (Parallel coordinates)
- **대상이 많은** 데이터에서 집단적인 경향을 쉽게 찾게 해 줌
- 축 여러 개를 평행하게 세움. 각 축의 위쪽은 최댓값, 아래쪽은 최솟값임
- 대상 하나가 축을 가로지르는 **선 하나**가 됨
- 분석 초기에 많은 변수 사이의 경향을 찾을 때, 또는 경향을 설득력 있게 전달할 때 씀
- 예시(미국 주별 교육 지표): 읽기·수학·쓰기 점수가 높을수록 SAT 응시율이 낮은 패턴을 찾을 수 있음

### 기본 (pandas)

```python
from pandas.plotting import parallel_coordinates

iris = sns.load_dataset('iris')
parallel_coordinates(iris, 'species', color=['tab:blue', 'tab:orange', 'tab:green'], alpha=0.4)
plt.show()
```

### 인터랙티브 (plotly) — 축을 드래그해 범위를 골라 볼 수 있음

```python
df = px.data.iris()
fig = px.parallel_coordinates(df, color='species_id',
                              dimensions=['sepal_length', 'sepal_width', 'petal_length', 'petal_width'],
                              color_continuous_scale=px.colors.diverging.Tealrose)
fig.show()
```

### 실습: 2015 무단횡단 데이터

```python
cols = ['발생건수', '사상자수', '사망자수', '중상자수', '경상자수', '부상신고자수']
fig = px.parallel_coordinates(jaywalk, dimensions=cols, color='발생건수',
                              color_continuous_scale='Reds')
fig.show()
```

> **해석**: 발생 건수가 많은 지점일수록 사상자 수도 많은 경향이 있음

## 정리

| 차트 | 비교 대상 | 함수 |
|---|---|---|
| 히트맵 | 행 × 열의 값 | `sns.heatmap` |
| 클러스터맵 | 비슷한 행·열 묶기 | `sns.clustermap` |
| 트리맵 | 계층 구조의 비중 | `px.treemap` |
| 레이더 차트 | 소수 대상의 여러 지표 | `go.Scatterpolar`, `px.line_polar` |
| 나이팅게일 차트 | 방향·주기별 크기 | `px.bar_polar` |
| 파이 차트 | 부분 / 전체 비율 | `plt.pie`, `px.pie` |
| 평행 좌표계 | 다수 대상의 다변수 경향 | `parallel_coordinates`, `px.parallel_coordinates` |
