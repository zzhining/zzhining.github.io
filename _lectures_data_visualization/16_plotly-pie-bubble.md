---
permalink: /lectures/data-visualization/16_plotly-pie-bubble/
title: "16. Pie·Bubble 차트"
date: 2026-11-04
series: "데이터 시각화"
series_order: 16
part: 4
categories: 데이터분석
tags: [데이터시각화, seaborn, Plotly, Python, Colab]
description: "Pie·Bubble 차트"
prev_post: /lectures/data-visualization/15_plotly-express/
next_post: /lectures/data-visualization/17_plotly-timeseries/
---

## 학습 목표
- `px.pie`와 `go.Pie`로 파이·도넛 차트를 만들고 꾸밀 수 있음
- `make_subplots`로 여러 파이를 비교할 수 있음
- `go.Scatter`로 버블 차트를 만들 수 있음

```python
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
```

## 1. Pie — Plotly Express
### 기본 파이 차트

```python
df = px.data.tips()      # 244행, day는 4가지 값
fig = px.pie(df, values='tip', names='day')    # day별 tip 합계의 비율
fig.show()
```

### 색상 팔레트 바꾸기

```python
fig = px.pie(df, values='tip', names='day',
             color_discrete_sequence=px.colors.sequential.RdBu)
fig.show()
```

### 범주마다 색 지정

```python
fig = px.pie(df, values='tip', names='day', color='day',
             color_discrete_map={'Thur': 'lightcyan',
                                 'Fri': 'cyan',
                                 'Sat': 'royalblue',
                                 'Sun': 'darkblue'})
fig.show()
```

## 2. Pie — Graph Objects

```python
labels = ['Oxygen', 'Hydrogen', 'Carbon_Dioxide', 'Nitrogen']
values = [4500, 2500, 1053, 500]
```

### 기본

```python
fig = go.Figure(data=[go.Pie(labels=labels, values=values)])
fig.show()
```

### textinfo 설정

```python
fig = go.Figure(data=[go.Pie(labels=labels, values=values,
                             textinfo='label+percent',          # 조각에 이름 + 퍼센트
                             insidetextorientation='radial')])  # 글자를 방사형으로
fig.show()
```

> `textinfo` 조합: `'label'`, `'value'`, `'percent'`, `'label+value+percent'` 등

### 도넛 차트

```python
fig = go.Figure(data=[go.Pie(labels=labels, values=values, hole=.3)])   # 가운데 구멍 30%
fig.show()
```

### 조각 분리하기

```python
fig = go.Figure(data=[go.Pie(labels=labels, values=values,
                             pull=[0, 0, 0.2, 0])])   # 3번째 조각을 반지름의 20%만큼 빼냄
fig.show()
```

## 3. subplot & scalegroup
- **subplot**: 화면을 나눠 그래프 여러 개를 그림
- **scalegroup**: 같은 그룹의 파이들은 **전체 값에 비례해 크기**가 정해짐. 전체 규모 차이까지 비교할 수 있음

```python
labels = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania']
fig = make_subplots(1, 2, specs=[[{'type': 'domain'}, {'type': 'domain'}]],
                    subplot_titles=['1980', '2007'])

fig.add_trace(go.Pie(labels=labels, values=[4, 7, 1, 7, 0.5],
                     scalegroup='one', name='World GDP 1980'), 1, 1)
fig.add_trace(go.Pie(labels=labels, values=[21, 15, 3, 19, 1],
                     scalegroup='one', name='World GDP 2007'), 1, 2)

fig.update_layout(title_text='World GDP')
fig.show()
```

> 파이 차트는 좌표축이 없어서 `specs`에 `'type': 'domain'`을 지정해야 함

## 4. Bubble 차트
### 기본

```python
fig = go.Figure(data=[go.Scatter(
    x=[1, 2, 3, 4], y=[10, 11, 12, 13],
    mode='markers',
    marker_size=[40, 60, 80, 100])
])
fig.show()
```

### 색상·투명도 지정

```python
fig = go.Figure(data=[go.Scatter(
    x=[1, 2, 3, 4], y=[10, 11, 12, 13],
    mode='markers',
    marker=dict(
        color=['rgb(93, 164, 214)', 'rgb(255, 144, 14)',
               'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        opacity=[1, 0.8, 0.6, 0.4],
        size=[40, 60, 80, 100],
    )
)])
fig.show()
```

### (참고) Express로 버블 차트

```python
df = px.data.gapminder().query('year == 2007')
fig = px.scatter(df, x='gdpPercap', y='lifeExp', size='pop', color='continent',
                 hover_name='country', log_x=True, size_max=60)
fig.show()
```

> 무단횡단 데이터 버블 차트 실습은 [07 문서](/lectures/data-visualization/07_scatter-plot/)를 참고

## 정리

| 목적 | 코드 |
|---|---|
| 빠른 파이 | `px.pie(df, values, names)` |
| 조각 텍스트 | `go.Pie(textinfo='label+percent')` |
| 도넛 | `go.Pie(hole=.3)` |
| 조각 분리 | `go.Pie(pull=[...])` |
| 여러 파이 비교 | `make_subplots(specs=[[{'type':'domain'}, ...]])` + `scalegroup` |
| 버블 | `go.Scatter(mode='markers', marker_size=...)`, `px.scatter(size=...)` |
