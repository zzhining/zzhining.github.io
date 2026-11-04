---
permalink: /lectures/data-visualization/13_seaborn-charts/
title: "13. seaborn 주요 그래프"
date: 2026-11-04
series: "데이터 시각화"
series_order: 13
part: 3
categories: 데이터분석
tags: [데이터시각화, seaborn, Plotly, Python, Colab]
description: "seaborn 주요 그래프"
prev_post: /lectures/data-visualization/12_eda/
next_post: /lectures/data-visualization/14_plotly-overview/
---

> 준비: [공통 준비 셀](/lectures/data-visualization/#common-setup) 실행, [12 문서](/lectures/data-visualization/12_eda/)의 `nano` 데이터 생성

## 학습 목표
- seaborn 함수의 분류 체계를 설명할 수 있음
- 히스토그램, 막대, 카운트, 박스, 바이올린, 선, 히트맵을 그리고 해석할 수 있음

## 1. seaborn 사용법

```python
import seaborn as sns
```

- matplotlib 기반의 **고수준(high-level)** 통계 시각화 라이브러리임
- `data=DataFrame`, `x='열'`, `y='열'`, `hue='열'`처럼 **열 이름으로** 그림
- 연습용 내장 데이터: `sns.load_dataset('tips')`, `'flights'`, `'iris'`, `'penguins'` 등 (목록: `sns.get_dataset_names()`)

## 2. seaborn의 주요 그래프

| 분류 | 용도 | Axes 함수 | Figure 함수 |
|---|---|---|---|
| Relational | 연속 데이터의 관련성 | `scatterplot`, `lineplot` | `relplot` |
| Categorical | 범주별 데이터 비교 | `stripplot`, `swarmplot`, `boxplot`, `violinplot`, `boxenplot`, `pointplot`, `barplot`, `countplot` | `catplot` |
| Distribution | 데이터 분포 | `histplot`, `kdeplot`, `ecdfplot`, `rugplot` | `displot` |
| Regression | 분포 + 회귀선 | `regplot`, `residplot` | `lmplot` |
| Matrix | 여러 변수 비교 | `heatmap`, `clustermap` | |
| Multi-plot grid | 그래프 여러 개 | | `FacetGrid`, `PairGrid`(`pairplot`), `JointGrid`(`jointplot`) |

> `distplot`은 seaborn 0.11부터 폐기 예정이고 0.14에서 제거됨. **`histplot`(단일 그래프) / `displot`(Figure 단위)**을 쓸 것
> ```python
> # sns.distplot(df['x'])                 # 옛 방식 (경고 또는 에러)
> sns.histplot(df['x'], kde=True)         # 새 방식
> ```

**Axes 함수 vs Figure 함수**
- **Axes 함수**(`histplot` 등): 그래프 하나를 그림. `ax=`로 `plt.subplots` 칸에 넣을 수 있음
- **Figure 함수**(`displot` 등): `col=`, `row=`로 그래프를 여러 칸에 나눠 그림

## 3. 히스토그램
- 가로축은 계급, 세로축은 도수임. 이어 붙인 직사각형으로 연속 변수의 분포를 보여 줌
- 정규분포면 평균을 중심으로 양옆으로 줄어드는 종 모양이 됨

```python
sns.histplot(data=nano, x='temp', bins=5, kde=True)
plt.show()
```

## 4. 막대 그래프
- 수치를 길이로 표현함. 가로축은 시점이나 범주, 세로축은 값의 크기임
- 한 범주에 값이 여러 개면 **평균** 막대와 퍼짐을 보여 주는 **오차 막대(검은 선)**가 생김

```python
sns.barplot(data=nano, x='nano_parcticle', y='temp')
plt.show()
```

**유의사항**
- 막대 값의 차이가 작으면 y축 범위를 조정하거나 다른 그래프를 고름
- 가로축에는 범주형 데이터를 씀
- 강조할 막대는 색을 달리할 수 있음
→ 사례 코드: [05 막대 그래프](/lectures/data-visualization/05_bar-chart/)

## 5. 카운트 플롯
- 세로축이 **가로축 범주별 개수**임

```python
sns.countplot(data=nano, x='stir_rpm')
plt.show()
```

| 히스토그램 | 카운트 플롯 |
|---|---|
| **연속** 변수를 계급으로 나눠 도수의 추이를 봄 | **범주**별 개수를 봄 |

## 6. 박스 플롯 (Box plot)
- 범주별로 값의 분포를 비교하기 좋음. 사분위수로 분포를 요약하고, **이상치**를 찾음

```python
tips = sns.load_dataset('tips')       # 은나노 샘플은 8행이라 분포 비교용으로 tips 사용
sns.boxplot(data=tips, x='day', y='total_bill')
plt.show()
```

```
      ●            ← 이상치 (Q3 + 1.5×IQR보다 큼)
      ┬            ← 수염 끝 (이상치를 뺀 최댓값)
    ┌───┐  ← Q3 (75%)
    │───│  ← 중앙값 (50%)
    └───┘  ← Q1 (25%)
      ┴            ← 수염 끝 (이상치를 뺀 최솟값)
```

| 요소 | 의미 |
|---|---|
| 박스 아래 끝 | 값을 작은 순으로 정렬해 4등분했을 때 25% 지점 (**Q1**) |
| 박스 가운데 선 | 50% 지점 (**중앙값**) |
| 박스 위 끝 | 75% 지점 (**Q3**) |
| IQR | Q3 − Q1 (박스 길이) |
| 수염 | Q1 − 1.5×IQR ~ Q3 + 1.5×IQR 안의 최솟값·최댓값 |
| 점 | 수염 밖의 **이상치** |

## 7. 바이올린 플롯 (Violin plot)
- 박스 플롯에 KDE 곡선을 더해 분포 모양을 **매끄럽게** 보여 줌
- 면적이 넓은 곳은 값이 많고, 좁은 곳은 값이 적음

```python
sns.violinplot(data=tips, x='day', y='total_bill', hue='sex', split=True, inner='quart')
plt.show()
```

## 8. 선 그래프
- 연속적인 변화를 선으로 보여 줌. 변화, 트렌드, 변화율이 중요할 때 씀
- 예: 온도 변화에 따른 회전 속도의 변화 추이
- 한 x값에 y가 여러 개면 평균선과 신뢰구간 **면**으로 표시됨

```python
sns.lineplot(data=nano, x='temp', y='stir_rpm', marker='o')
plt.show()
```

→ 더 많은 예: [04 선 그래프](/lectures/data-visualization/04_line-chart/)

## 9. 히트맵
- 칸 하나의 색으로 값을 나타내 여러 변수를 비교함
- 전체를 훑어본 뒤 흥미로운 점을 짚는 출발점이 됨
- **상관계수 히트맵**으로 영향력 있는 변수를 찾음

```python
corr = nano.corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', vmin=-1, vmax=1)
plt.show()

corr['nano_parcticle'].drop('nano_parcticle').sort_values()   # 생성 여부와의 상관계수 순위
```

> 8행 샘플에서 나온 상관계수는 믿을 수 없음. 전체 데이터로 다시 확인

## 10. 한 번에 그려 보기 (EDA 대시보드)

```python
fig, axes = plt.subplots(2, 3, figsize=(15, 8))
sns.histplot(data=nano, x='temp', kde=True, ax=axes[0, 0])
sns.barplot(data=nano, x='nano_parcticle', y='temp', ax=axes[0, 1])
sns.countplot(data=nano, x='stir_rpm', ax=axes[0, 2])
sns.boxplot(data=nano, y='react_time', ax=axes[1, 0])
sns.lineplot(data=nano, x='temp', y='stir_rpm', marker='o', ax=axes[1, 1])
sns.heatmap(nano.corr(), cmap='coolwarm', center=0, ax=axes[1, 2])
plt.tight_layout()
plt.show()
```

## 정리

| 그래프 | 함수 | 핵심 |
|---|---|---|
| 히스토그램 | `histplot` | 연속 변수 분포 |
| 막대 | `barplot` | 범주별 평균 + 오차 막대 |
| 카운트 | `countplot` | 범주별 개수 |
| 박스 | `boxplot` | 사분위수, 이상치 |
| 바이올린 | `violinplot` | 분포 모양 |
| 선 | `lineplot` | 변화 추이 |
| 히트맵 | `heatmap` | 변수 간 비교, 상관관계 |
