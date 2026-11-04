---
permalink: /lectures/python/14_seaborn-analysis/
title: "14. 신고 유형·구별 시각화"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 14
part: 3
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "신고 유형·구별 시각화"
prev_post: /lectures/python/13_report-preprocessing/
next_post: /lectures/python/15_folium-map/
---

> 원본: S69–71, S80–85

## 학습 목표
- Seaborn으로 막대그래프와 heatmap을 그릴 수 있다.
- `for`와 `subplot`으로 그래프 여러 개를 한 화면에 그릴 수 있다.
- 상관관계 heatmap을 해석할 수 있다.

> 전제: [13 문서](/lectures/python/13_report-preprocessing/)에서 `seoul_2021`을 만들었다.

## 1. Seaborn
- Matplotlib을 기반으로 한 시각화 라이브러리입니다.
- 보기 좋고 정보가 풍부한 **통계 그래프**를 짧은 코드로 그립니다.
```python
# Colab에는 기본 설치되어 있음. 업데이트가 필요할 때만:
# !pip install --upgrade seaborn
import seaborn as sns
import matplotlib.pyplot as plt
```

## 2. 신고 종류에 따라 신고 수가 다른가?
```python
seoul_total = seoul_2021.sum()        # 열(신고 종류)별 합계
seoul_total

sns.barplot(x=seoul_total.index, y=seoul_total)
plt.xticks(rotation=90)
plt.show()
```

## 3. 구에 따라 신고 수가 다른가?
```python
gu_total = seoul_2021.sum(axis=1)     # 행(구)별 합계
gu_total.head()

sns.barplot(x=gu_total.index, y=gu_total)
plt.xticks(rotation=90)
plt.show()
```
> **수정**: 원본 `sns.barplot(gu_total.index, gu_total)`은 seaborn 0.12부터 에러가 납니다. `x=`, `y=`를 꼭 써야 합니다.

## 4. 구별·신고 종류별 신고 수
### 전체 heatmap
```python
plt.figure(figsize=(10, 12))
sns.heatmap(seoul_2021, annot=True, fmt='g')   # fmt='g': 숫자를 지수 표기 없이
plt.show()
```

### 가정폭력 신고가 많은 5개 구
```python
tab = seoul_2021['가정폭력신고수'].sort_values(ascending=False).head()
sns.barplot(x=tab.index, y=tab)
plt.show()
```

### 신고 종류별 신고가 많은 5개 구 (subplot 2×4)
```python
col_lst = list(seoul_2021.columns)
plt.figure(figsize=(16, 8))
for i in range(len(col_lst)):                       # 신고 종류 8개를 차례로
    tab = seoul_2021[col_lst[i]].sort_values(ascending=False).head()
    plt.subplot(2, 4, i + 1)                        # 2행 4열 중 i+1번째 칸
    plt.title(col_lst[i])
    sns.barplot(x=tab, y=tab.index)                 # 가로 막대
plt.tight_layout()
plt.show()
```
> `for i in range(len(...))` 패턴은 [05 문서](/lectures/python/05_for-loop/)를 참고하세요. `plt.subplot`의 칸 번호는 **1부터** 시작하므로 `i + 1`을 씁니다.

### 강남구에서 신고가 많은 신고 종류
```python
tab = seoul_2021.iloc[0].sort_values(ascending=False).head()   # 0번째 행 = 강남구
sns.barplot(x=tab.index, y=tab)
plt.show()
```
> 특정 구를 이름으로 고르려면 `seoul_2021.loc['강남구']`가 더 안전합니다.

### 구별 신고가 많은 5개 신고 종류 (subplot 9×3)
```python
gu_lst = list(seoul_2021.index)
plt.figure(figsize=(20, 20))
for i in range(len(gu_lst)):                        # 25개 구를 차례로
    tab = seoul_2021.iloc[i].sort_values(ascending=False).head(5)
    plt.subplot(9, 3, i + 1)                        # 9×3 = 27칸 ≥ 25개 구
    plt.title(gu_lst[i])
    sns.barplot(x=tab, y=tab.index)
plt.tight_layout()
plt.show()
```

## 5. 신고 종류끼리 관련이 있나?
```python
plt.figure(figsize=(8, 6))
sns.heatmap(seoul_2021.corr(numeric_only=True), annot=True)
plt.show()
```
> **수정**: pandas 2.x에서는 문자 열이 하나라도 있으면 `corr()`이 에러를 냅니다. `numeric_only=True`를 붙였습니다.

### 상관계수 읽는 법
| 값 | 의미 |
|---|---|
| +1에 가까움 | 한쪽이 늘면 다른 쪽도 늚 (양의 상관) |
| 0 근처 | 관계가 거의 없음 |
| −1에 가까움 | 한쪽이 늘면 다른 쪽은 줆 (음의 상관) |

## 정리
| 목적 | 코드 |
|---|---|
| 막대그래프 | `sns.barplot(x=..., y=...)` |
| 표 전체 색 지도 | `sns.heatmap(df, annot=True, fmt='g')` |
| 여러 그래프 | `for` + `plt.subplot(행, 열, 번호)` + `plt.tight_layout()` |
| 상관관계 | `sns.heatmap(df.corr(numeric_only=True), annot=True)` |
