---
permalink: /lectures/python/08_explore-stats-sort/
title: "08. 탐색·통계·정렬"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 8
part: 2
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "탐색·통계·정렬"
prev_post: /lectures/python/07_series-dataframe/
next_post: /lectures/python/09_indexing-slicing/
---

> 원본: S40–45

## 학습 목표
- DataFrame의 일부 행과 속성을 확인할 수 있다.
- 데이터 타입을 확인하고 바꿀 수 있다.
- 기술통계를 구하고 값 기준으로 정렬할 수 있다.

## 1. 데이터 미리 보기
```python
df.head()      # 상위 5행
df.head(2)     # 상위 2행
df.tail()      # 하위 5행
df.tail(3)     # 하위 3행
```

## 2. 속성 확인
| 코드 | 결과 |
|---|---|
| `df.shape` | (행 수, 열 수) |
| `df.index` | 인덱스 |
| `df.columns` | 열 이름 |
| `df.dtypes` | 열별 데이터 타입 |
| `df.ndim` | 차원 수 |
| `df.size` | 전체 원소 개수 (행 × 열) |
| `df.values` | 값 (NumPy 배열) |
| `df.info()` | 요약 정보 (타입, 결측 아닌 값 개수, 메모리) |
| `df.count()` | 열별 결측 아닌 값 개수 |

> `shape`, `columns`처럼 **괄호가 없는 것은 속성**, `info()`처럼 **괄호가 있는 것은 메서드**입니다.

## 3. 데이터 타입
| Pandas 타입 | Python 타입 |
|---|---|
| `object` | `str` (문자) |
| `int64` | `int` (정수) |
| `float64` | `float` (실수) |

`astype()`으로 타입을 바꿉니다.
```python
df['Population'] = df['Population'].astype('float')
df = df.astype({'Population': 'int64'})
```

## 4. 기술통계
```python
df.describe()                   # 숫자 열의 개수·평균·표준편차·최소·사분위·최대
df.mean(numeric_only=True)      # 평균
df.median(numeric_only=True)    # 중앙값
df.sum()                        # 합계
df.min()                        # 최솟값
df.max()                        # 최댓값
df.var(numeric_only=True)       # 분산
df.std(numeric_only=True)       # 표준편차
```
> **pandas 2.x 변경사항**: 문자 열이 섞인 DataFrame에서 `mean()`, `median()`, `var()`, `std()`를 그냥 부르면 `TypeError`가 납니다. `numeric_only=True`를 붙이거나, 숫자 열만 골라서 계산하세요.
> ```python
> df[['salary', 'service']].mean()
> ```

## 5. 정렬
기본은 오름차순입니다.
```python
df_sorted = df.sort_values(by='salary')                       # salary 오름차순
df_sorted.head()

df_sorted = df.sort_values(by='salary', ascending=False)      # 내림차순

df_sorted = df.sort_values(by=['service', 'salary'],
                           ascending=[True, False])           # service 오름차순, 같으면 salary 내림차순
df_sorted.head(10)
```

## 실습

### [Exercise #6-1] 치안트렌드 데이터 탐색
> 데이터: `치안트렌드.csv` (열: 범죄유형, 범죄예측2022최소값/평균/최대값, 범죄발생수2019/2020/2021)

1. `치안트렌드.csv`를 DataFrame으로 읽으시오.
2. 처음 5행, 마지막 3행을 출력하시오.
3. 데이터 타입, 인덱스, 열 이름, 값을 확인하시오.
4. 각 열의 통계 요약을 출력하시오.
5. 열 하나를 골라 내림차순으로 정렬하시오.

<details>
<summary>정답 예시</summary>

```python
import pandas as pd

df = pd.read_csv('치안트렌드.csv')   # 에러 나면 encoding='cp949'

df.head()
df.tail(3)

df.dtypes
df.index
df.columns
df.values

df.describe()

df.sort_values(by='범죄발생수2021', ascending=False)
```
</details>

## 정리
- 미리 보기: `head()`, `tail()` / 구조: `shape`, `dtypes`, `info()`
- 타입 변환: `astype()`
- 통계: `describe()` (문자 열이 섞여 있으면 `numeric_only=True`)
- 정렬: `sort_values(by=..., ascending=...)`
