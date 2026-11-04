---
permalink: /lectures/python/10_filter-modify-rename/
title: "10. 필터링·값 변경·열 이름"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 10
part: 2
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "필터링·값 변경·열 이름"
prev_post: /lectures/python/09_indexing-slicing/
next_post: /lectures/python/11_groupby-agg/
---

## 학습 목표
- 조건(Boolean 인덱싱)으로 원하는 행을 골라낼 수 있음
- 특정 위치의 값을 바꾸고 새 열을 만들 수 있음
- 열 이름을 바꿀 수 있음

## 1. 필터링 (Boolean 인덱싱)
조건식의 결과(True/False)로 행을 골라냄

```python
df_sub = df[df['salary'] > 120000]                  # salary가 120000보다 큰 행
df_f   = df[df['gender'] == 'Female']               # gender가 Female인 행
df[df['dept'].isin(['IT', 'operations'])]           # dept가 목록 안에 있는 행
```

## 2. 비교·논리 연산자

| 비교 연산자 | 의미 |
|---|---|
| `>` / `>=` | 크다 / 크거나 같음 |
| `<` / `<=` | 작다 / 작거나 같음 |
| `==` / `!=` | 같다 / 다름 |

| Pandas 논리 연산자 | 의미 | 예 |
|---|---|---|
| `&` | 그리고 (and) | `df[(df.salary > 100000) & (df.gender == 'Female')]` |
| `\|` | 또는 (or) | `df[(df.dept == 'IT') \| (df.dept == 'HR')]` |
| `~` | 아니다 (not) | `df[~df.dept.isin(['IT'])]` |

> 조건을 여러 개 쓸 때는 **각 조건을 괄호로 감싸야** 함. Pandas에서는 `and`/`or` 대신 `&`/`|`를 씀

## 3. 값 바꾸기와 새 열 만들기

```python
import numpy as np

df.loc[9, 'salary'] = 150000          # 9번 행의 salary 값 바꾸기
df.loc[9, 'salary'] = np.nan          # 결측값(NaN)으로
df['bonus'] = 0                       # 열 전체를 같은 값으로 (없으면 새 열 생성)
df['total'] = df['salary'] + df['bonus']   # 열끼리 계산해 새 열
```

## 4. 열 이름 바꾸기

```python
df.columns = ['Leader', 'Time', 'Score']                      # 전체 열 이름 한 번에 (개수가 맞아야 함)
df.rename(columns={'Leader': 'Commander'}, inplace=True)      # 일부만 바꾸기
```

> `inplace=True`는 원본을 직접 바꿈. `df = df.rename(columns={...})`처럼 다시 대입하는 방식을 더 권장함

## 실습

### [Exercise #6-3] 필터링
1. `범죄발생수2021`이 1000보다 큰 행
2. `범죄유형`이 폭력, 방화, 마약 중 하나인 행

<details markdown="1">
<summary>정답 예시</summary>

```python
df[df['범죄발생수2021'] > 1000]
df[df['범죄유형'].isin(['폭력', '방화', '마약'])]
```

</details>

### [Exercise #6-4] 값 바꾸기
1. 9번 행의 `범죄발생수2021` 값을 12746으로 바꿀 것
2. 9번 행의 `범죄발생수2021` 값을 결측값(`np.nan`)으로 바꿀 것
3. `범죄예측2022최소값` 열 전체를 5로 바꿀 것
4. `범죄발생수2019~2021`의 평균으로 `평균범죄수3년` 열을 만들 것. 소수 둘째 자리까지 반올림(`np.round`)

<details markdown="1">
<summary>정답 예시</summary>

```python
import numpy as np

df.loc[9, '범죄발생수2021'] = 12746
df.loc[9, '범죄발생수2021'] = np.nan
df['범죄예측2022최소값'] = 5
df['평균범죄수3년'] = np.round(
    df[['범죄발생수2019', '범죄발생수2020', '범죄발생수2021']].mean(axis=1), 2)
```

- `mean(axis=1)`: 행 방향(가로)으로 평균
</details>

### [Exercise #6-5] 열 이름 바꾸고 저장하기
1. `평균범죄수3년`을 `범죄수평균`으로 바꿀 것
2. 열 이름 전체를 `'crime_type', '2022_min', '2022_mean', '2022_max', '2019', '2020', '2021', 'avg'`로 바꿀 것
3. 결과를 CSV 파일로 저장

<details markdown="1">
<summary>정답 예시</summary>

```python
df = df.rename(columns={'평균범죄수3년': '범죄수평균'})
df.columns = ['crime_type', '2022_min', '2022_mean', '2022_max',
              '2019', '2020', '2021', 'avg']
df.to_csv('치안트렌드_결과.csv', index=False, encoding='utf-8-sig')
```

</details>

## 정리
- 필터: `df[조건]`, 여러 조건은 `(조건1) & (조건2)`
- 목록 포함 여부: `isin([...])`
- 값 바꾸기: `df.loc[행, 열] = 값` / 새 열: `df['새열'] = ...`
- 열 이름: `df.columns = [...]`, `df.rename(columns={...})`
