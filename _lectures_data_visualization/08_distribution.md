---
permalink: /lectures/data-visualization/08_distribution/
title: "08. 히스토그램·분포 시각화"
date: 2026-11-04
series: "데이터 시각화"
series_order: 8
part: 2
categories: 데이터분석
tags: [데이터시각화, seaborn, Plotly, Python, Colab]
description: "히스토그램·분포 시각화"
prev_post: /lectures/data-visualization/07_scatter-plot/
next_post: /lectures/data-visualization/09_text-viz/
---

> 준비: [공통 준비 셀](/lectures/data-visualization/#common-setup) 실행

## 학습 목표
- 히스토그램의 구성과 bins의 영향을 설명할 수 있음
- 분포 모양(치우침, 왜도, 첨도)을 해석할 수 있음
- KDE, 이변량 분포, 박스·바이올린 플롯을 그릴 수 있음

## 1. 히스토그램
- 가로축에 **계급(구간)**, 세로축에 **도수(개수, 빈도)**를 놓고, 이어 붙인 직사각형으로 그림
- 가로축과 세로축은 **연속**임 (그래서 막대 사이에 빈틈이 없음)
- 도수는 막대의 높이(세로 길이)로 나타냄

> "평균을 중심으로 양옆으로 줄어드는 종 곡선"은 히스토그램의 정의가 아니라 **정규분포 모양**에 대한 설명임. 아래 4절에서 따로 다룸

```python
penguins = sns.load_dataset('penguins')
sns.histplot(data=penguins, x='flipper_length_mm')
plt.show()
```

## 2. 계급의 크기 (bins)
bins가 너무 적으면 모양이 뭉개지고, 너무 많으면 들쭉날쭉해짐

```python
fig, axes = plt.subplots(1, 3, figsize=(12, 3))
for ax, b in zip(axes, [10, 25, 100]):
    sns.histplot(data=penguins, x='flipper_length_mm', bins=b, ax=ax)
    ax.set_title(f'bins = {b}')
plt.tight_layout()
plt.show()
```

## 3. 범주별 색 구분 / 여러 변수 한 번에
### 두 그룹의 분포 비교

```python
sns.histplot(data=penguins, x='flipper_length_mm', hue='species', element='step')
plt.show()
```

### 여러 feature의 분포를 한눈에

```python
penguins.hist(figsize=(10, 6), bins=20)      # 숫자 열마다 히스토그램
plt.tight_layout()
plt.show()

long = penguins.melt(value_vars=['bill_length_mm', 'bill_depth_mm', 'flipper_length_mm'])
sns.displot(data=long, x='value', col='variable', facet_kws={'sharex': False}, height=3)
plt.show()
```

### 실습: 2015 무단횡단 사상자 분포
> 데이터 준비: [10 문서 4절](/lectures/data-visualization/10_spatial-viz/#data-prep)

```python
fig, axes = plt.subplots(1, 3, figsize=(12, 3))
for ax, col in zip(axes, ['사상자수', '사망자수', '중상자수']):
    sns.histplot(data=jaywalk, x=col, discrete=True, ax=ax)   # 정수 값 → discrete=True
    ax.set_title(col)
plt.tight_layout()
plt.show()
```

> 대부분 지점은 값이 작고 일부 지점만 큰, **오른쪽 꼬리가 긴** 분포임

## 4. 히스토그램 모양으로 분포 읽기

| 모양 | 의미 |
|---|---|
| 종 모양 (정규분포) | 평균을 중심으로 양옆으로 서서히 줄어듦 |
| 왼쪽에 몰림 (오른쪽 꼬리) | 값이 전체 범위 중 **낮은 쪽**에 몰려 있음 |
| 오른쪽에 몰림 (왼쪽 꼬리) | 값이 **높은 쪽**에 몰려 있음 |
| 수평 | 값이 고르게 퍼진 균일분포 |

```python
rng = np.random.default_rng(0)
samples = {
    '정규분포': rng.normal(50, 10, 1000),
    '왼쪽에 몰림 (양의 왜도)': rng.exponential(10, 1000),
    '오른쪽에 몰림 (음의 왜도)': 100 - rng.exponential(10, 1000),
    '균일분포': rng.uniform(0, 100, 1000),
}
fig, axes = plt.subplots(1, 4, figsize=(16, 3))
for ax, (name, s) in zip(axes, samples.items()):
    sns.histplot(s, bins=30, ax=ax)
    ax.set_title(name)
plt.tight_layout()
plt.show()
```

### (참고) 왜도와 첨도

| 지표 | 의미 | 해석 |
|---|---|---|
| **왜도** (skewness) | 분포가 좌우 대칭인지, 어느 쪽으로 치우쳤는지 | **> 0**: 값이 왼쪽에 몰리고 **오른쪽 꼬리가 김** / **< 0**: 값이 오른쪽에 몰리고 **왼쪽 꼬리가 김** / = 0: 대칭 |
| **첨도** (kurtosis) | 분포의 봉우리가 얼마나 뾰족하고 꼬리가 두꺼운지 | **> 0**: 정규분포보다 **뾰족하고 꼬리가 두꺼움**(이상치가 많음) / **< 0**: 정규분포보다 **완만하고 꼬리가 얇음** |

> 첨도 > 0은 분산이 작아진다는 뜻이 아니라 정규분포보다 뾰족하고 꼬리가 두껍다는 뜻임. 여기서 첨도는 정규분포를 0으로 맞춘 **초과 첨도**(pandas `kurt()` 기준)임

```python
for name, s in samples.items():
    s = pd.Series(s)
    print(f'{name:16s} 왜도={s.skew():6.2f}  첨도={s.kurt():6.2f}')
```

## 5. KDE plot (커널 밀도 추정)
- 히스토그램을 매끄럽게(smoothing) 만든 **확률밀도 곡선**임
- 데이터 하나하나를 커널 함수(작은 종 모양)로 바꿔 모두 더함

```python
fig, axes = plt.subplots(1, 3, figsize=(12, 3))
sns.histplot(data=penguins, x='flipper_length_mm', ax=axes[0]).set_title('히스토그램')
sns.kdeplot(data=penguins, x='flipper_length_mm', ax=axes[1]).set_title('KDE')
sns.histplot(data=penguins, x='flipper_length_mm', kde=True, ax=axes[2]).set_title('히스토그램 + KDE')
plt.tight_layout()
plt.show()
```

### 대역폭(bandwidth)에 따른 차이
대역폭이 작으면 울퉁불퉁하고, 크면 지나치게 뭉개짐

```python
for bw in [0.25, 1, 3]:
    sns.kdeplot(data=penguins, x='flipper_length_mm', bw_adjust=bw, label=f'bw_adjust={bw}')
plt.legend()
plt.show()
```

## 6. 두 변수의 확률 분포 (이변량 분포)

```python
sns.kdeplot(data=penguins, x='bill_length_mm', y='bill_depth_mm', hue='species')
plt.show()

sns.kdeplot(data=penguins, x='bill_length_mm', y='bill_depth_mm', fill=True, cmap='mako')
plt.show()

sns.histplot(data=penguins, x='bill_length_mm', y='bill_depth_mm', bins=30, cbar=True)
plt.show()
```

## 7. 분포를 요약하는 그래프 — 박스 플롯, 바이올린 플롯

```python
tips = sns.load_dataset('tips')
fig, axes = plt.subplots(1, 2, figsize=(10, 4))
sns.boxplot(data=tips, x='day', y='total_bill', ax=axes[0]).set_title('박스 플롯')
sns.violinplot(data=tips, x='day', y='total_bill', ax=axes[1]).set_title('바이올린 플롯')
plt.tight_layout()
plt.show()
```

> 박스의 구성(Q1·중앙값·Q3, 이상치)은 [13 문서](/lectures/data-visualization/13_seaborn-charts/)에서 자세히 다룸

## 8. 분포 시각화의 확장

| 사례 | 설명 |
|---|---|
| 지도 히트맵 | 위치별 밀도를 지도 위에 색으로 → [10 문서](/lectures/data-visualization/10_spatial-viz/)의 `folium.plugins.HeatMap` |
| 웹 UX 클릭 히트맵 | 홈페이지에서 마우스 클릭 위치의 분포를 시각화해 UX 분석 |

## 정리

| 목적 | 함수 |
|---|---|
| 분포 | `sns.histplot(bins=...)` |
| 매끄러운 분포 | `sns.kdeplot(bw_adjust=...)`, `histplot(kde=True)` |
| 그룹별·변수별 | `hue=`, `sns.displot(col=...)` |
| 이변량 | `sns.kdeplot(x, y)`, `sns.histplot(x, y)` |
| 분포 요약 | `sns.boxplot`, `sns.violinplot` |
| 모양 수치 | `Series.skew()`, `Series.kurt()` |
