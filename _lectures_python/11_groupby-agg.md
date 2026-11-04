---
permalink: /lectures/python/11_groupby-agg/
title: "11. 그룹·집계"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 11
part: 2
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "그룹·집계"
prev_post: /lectures/python/10_filter-modify-rename/
next_post: /lectures/python/12_project-intro/
---

## 학습 목표
- `groupby`로 그룹별 통계를 구할 수 있음
- 고윳값 빈도와 개수를 셀 수 있음
- `agg()`로 여러 통계를 한 번에 구할 수 있음

## 1. groupby — 그룹별 계산
같은 값끼리 묶은 뒤 그룹마다 통계를 구하거나 함수를 적용함 (split → apply → combine)

```python
df_rank = df.groupby(['dept'])              # dept로 묶기
df_rank.mean(numeric_only=True)             # 그룹별 숫자 열 평균

df.groupby('dept', sort=False)[['salary']].mean()   # 그룹별 salary 평균만 (그룹 정렬 안 함)
```

> **pandas 2.x**: 문자 열이 남아 있으면 `mean()`이 `TypeError`를 냄. `numeric_only=True`를 붙이거나 계산할 열을 먼저 고를 것

## 2. 고윳값 (Unique Values)

```python
df['dept'].value_counts()     # 값별 빈도표 (많은 순)
df['dept'].nunique()          # 서로 다른 값의 개수
df.nunique()                  # 열별 고윳값 개수 (axis=0, 기본값)
df.nunique(axis=1)            # 행별 고윳값 개수
df['dept'].unique()           # 고윳값 목록
```

## 3. agg — 여러 통계를 한 번에

```python
df[['salary', 'service']].agg(['min', 'mean', 'max'])

df.groupby('dept').agg({'salary': ['mean', 'max'],
                        'service': 'sum'})       # 열마다 다른 통계
```

> 예시 `flights[['dep_delay','arr_delay']].agg(['min','mean','max'])`도 같은 방식임

## 4. 반복 (iterrows)
한 행씩 꺼내 처리함. `for` 문법은 [05 문서](/lectures/python/05_for-loop/)를 참고

```python
for index, row in df.iterrows():
    print(index, row["salary"], row["dept"])
```

> `iterrows()`는 느림. 계산은 열 단위 연산이나 `groupby`/`agg`로 하고, `for`는 출력이나 그래프 그리기에 쓸 것

## 정리

| 목적 | 코드 |
|---|---|
| 그룹별 평균 | `df.groupby('열').mean(numeric_only=True)` |
| 빈도표 | `df['열'].value_counts()` |
| 고윳값 개수 | `df['열'].nunique()` |
| 여러 통계 | `df[열들].agg(['min', 'mean', 'max'])` |
| 행 반복 | `for i, row in df.iterrows():` |
