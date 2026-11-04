---
permalink: /lectures/data-visualization/10_spatial-viz/
title: "10. 공간 시각화"
date: 2026-11-04
series: "데이터 시각화"
series_order: 10
part: 2
categories: 데이터분석
tags: [데이터시각화, seaborn, Plotly, Python, Colab]
description: "공간 시각화"
prev_post: /lectures/data-visualization/09_text-viz/
next_post: /lectures/data-visualization/11_chart-selection/
---

> 준비: [공통 준비 셀](/lectures/data-visualization/#common-setup) 실행

## 학습 목표
- 공간 시각화의 종류(점 지도, 단계구분도, 카토그램, Flow Map)를 설명할 수 있음
- 위도·경도 데이터로 folium 버블 지도, 단계구분도, 히트맵을 만들 수 있음

## 1. 데이터를 지도 위에 시각화
- 대한민국 전도나 시·도·군 경계를 단순하게 보여 주고, 데이터와 지도의 관계를 버블, 클러스터, 히트맵 등으로 표현함
- 사례: 서울시 동대문구 안심식당 현황
- **지오코딩(Geocoding)**: 주소나 지명(산, 호수 이름 등)으로 **위도·경도 좌표**를 얻는 것임. 얻은 좌표를 레이어 하나 이상으로 구성해 시각화함

## 2. 지도 유형

| 유형 | 설명 | folium/plotly |
|---|---|---|
| **점(버블) 지도** | 위치에 점이나 원을 찍고, 원 크기로 값을 표시 | `folium.CircleMarker` |
| **단계구분도** (등치지역도, choropleth) | 값의 크기에 따라 지역마다 색을 다르게 칠함. 범주형은 서로 다른 색, 연속형은 한 색의 명도를 단계별로 | `folium.Choropleth`, `px.choropleth` |
| **카토그램** (변량비례도, cartogram) | 값에 따라 지역의 **면적을 왜곡**함. 값이 큰 지역이 크게 보임. 땅은 크지만 값은 작은 지역 때문에 생기는 착시를 보정 | (전용 도구 필요) |
| **Flow Map** | 이동을 화살표로 표시. 화살표 방향은 이동 방향, 너비는 양 | `folium.PolyLine`, `plotly go.Scattergeo` |
| **히트맵** | 점의 밀도를 색으로 표시 | `folium.plugins.HeatMap` |

## 3. 실습 데이터: 2015 무단횡단 사고다발지

| 열 | 설명 |
|---|---|
| 다발지식별자, 다발지그룹식별자 | 사고다발지 ID |
| 법정동코드, 스팟코드 | 위치 코드 |
| 관할경찰서 | 예: 부산부산북부2, 서울서울마포1 |
| 다발지명 | 예: 부산광역시 북구 … (첫 단어가 시도) |
| 발생건수, 사상자수, 사망자수, 중상자수, 경상자수, 부상신고자수 | 사고 지표 |
| 경도, 위도 | 다발지 중심 좌표 |
| 다발지역폴리곤 | 다발지 영역 (GeoJSON 문자열) |

> 출처: 도로교통공단 교통사고분석시스템(TAAS) 사고다발지역 데이터. 파일 이름과 열 이름은 내려받은 버전에 따라 다를 수 있으니 `jaywalk.columns`로 먼저 확인

## 4. 데이터 불러오기와 전처리 {#data-prep}

```python
# 드라이브 마운트 후 데이터 폴더로 이동 (Python 기초 00 문서 참고)
# from google.colab import drive; drive.mount('/content/drive')
# %cd /content/drive/MyDrive/data-viz/data

jaywalk = pd.read_csv('2015무단횡단.csv', encoding='cp949')   # UTF-8 파일이면 encoding 생략
jaywalk.head()

# 파생변수: 다발지명의 첫 단어 → 시도
jaywalk['시도'] = jaywalk['다발지명'].str.split().str[0]
jaywalk['시도'].value_counts()
```

> 이 `jaywalk` DataFrame과 `시도` 열은 [06](/lectures/data-visualization/06_comparison-chart/)(레이더·평행좌표), [07](/lectures/data-visualization/07_scatter-plot/)(버블), [08](/lectures/data-visualization/08_distribution/)(히스토그램) 문서의 실습에서도 씀

## 5. 실습 ①: 다발지 위치를 버블로

```python
import folium

m = folium.Map(location=[36.5, 127.8], zoom_start=7, tiles='cartodbpositron')

for _, row in jaywalk.iterrows():
    folium.CircleMarker(
        location=[row['위도'], row['경도']],
        radius=row['발생건수'] ** 0.5 * 2,            # 면적이 발생건수에 비례하도록 제곱근
        color='crimson', fill=True, fill_opacity=0.5, weight=0,
        tooltip=f"{row['다발지명']}<br>발생 {row['발생건수']}건 / 사상자 {row['사상자수']}명"
    ).add_to(m)
m
```

> 원의 **반지름**을 값에 비례하게 하면 면적은 제곱으로 커져서 차이가 과장됨. 그래서 제곱근을 씀

## 6. 실습 ②: 시도별 단계구분도

```python
import requests

geo_url = 'https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_geo_simple.json'
sido_geo = requests.get(geo_url).json()            # properties.name = '서울특별시' 등

sido_sum = jaywalk.groupby('시도', as_index=False)['발생건수'].sum()

m = folium.Map(location=[36.5, 127.8], zoom_start=7, tiles='cartodbpositron')
folium.Choropleth(
    geo_data=sido_geo,
    data=sido_sum,
    columns=['시도', '발생건수'],
    key_on='feature.properties.name',
    fill_color='YlOrRd', fill_opacity=0.7, line_opacity=0.3,
    legend_name='무단횡단 사고 발생건수',
    name='시도별 발생건수'
).add_to(m)
m
```

> 데이터의 시도 이름과 GeoJSON의 `name`이 **글자까지 같아야** 색이 칠해짐. 2013년 경계 데이터라 '세종특별자치시' 등 이후 바뀐 이름은 맞지 않을 수 있음

## 7. 실습 ③: 레이어 겹치기와 켜고 끄기
folium `FeatureGroup`과 `LayerControl`로 레이어를 추가하고 켜고 끌 수 있게 만듬

```python
from folium.plugins import HeatMap

m = folium.Map(location=[36.5, 127.8], zoom_start=7, tiles='cartodbpositron')

# Layer 1: 시도별 단계구분도
folium.Choropleth(geo_data=sido_geo, data=sido_sum, columns=['시도', '발생건수'],
                  key_on='feature.properties.name', fill_color='YlOrRd',
                  fill_opacity=0.5, name='Layer 1: 시도별 발생건수').add_to(m)

# Layer 2: 다발지 버블
bubbles = folium.FeatureGroup(name='Layer 2: 다발지 버블')
for _, row in jaywalk.iterrows():
    folium.CircleMarker([row['위도'], row['경도']], radius=row['발생건수'] ** 0.5 * 2,
                        color='navy', fill=True, fill_opacity=0.5, weight=0,
                        tooltip=f"{row['다발지명']}: {row['발생건수']}건").add_to(bubbles)
bubbles.add_to(m)

# Layer 3: 밀도 히트맵
heat = folium.FeatureGroup(name='Layer 3: 히트맵', show=False)
HeatMap(jaywalk[['위도', '경도', '발생건수']].values.tolist(), radius=15).add_to(heat)
heat.add_to(m)

folium.LayerControl(collapsed=False).add_to(m)     # 오른쪽 위에서 레이어 켜고 끄기
m
```

```python
m.save('jaywalk_map.html')        # 브라우저에서 열 수 있는 HTML로 저장
```

### 결과 해석
**서울과 수도권**에서 무단횡단 사고가 가장 많이 났고, 그다음은 **부산, 울산, 대구** 등 대도시임

```python
sido_sum.sort_values('발생건수', ascending=False).head(10)   # 수치로 확인
```

## 8. (참고) plotly로 지도 그리기

```python
import plotly.express as px

fig = px.scatter_map(jaywalk, lat='위도', lon='경도', size='발생건수', color='사상자수',
                     hover_name='다발지명', zoom=6, height=600,
                     map_style='carto-positron')
fig.show()
```

> plotly 5.24 미만에서는 `px.scatter_mapbox(..., mapbox_style='carto-positron')`을 쓸 것

## 정리

| 목적 | 코드 |
|---|---|
| 위치 + 크기 | `folium.CircleMarker(radius=...)` |
| 지역별 색 | `folium.Choropleth(geo_data, data, columns, key_on)` |
| 밀도 | `folium.plugins.HeatMap` |
| 레이어 켜고 끄기 | `folium.FeatureGroup` + `folium.LayerControl` |
| 저장 | `m.save('파일.html')` |

- 서울 구 단위 지도 실습은 [Python 기초 15 문서](/lectures/python/15_folium-map/)를 참고
