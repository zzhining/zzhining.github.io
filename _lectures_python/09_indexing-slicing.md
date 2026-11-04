---
permalink: /lectures/python/09_indexing-slicing/
title: "09. 인덱싱·슬라이싱"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 9
part: 2
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "인덱싱·슬라이싱"
prev_post: /lectures/python/08_explore-stats-sort/
next_post: /lectures/python/10_filter-modify-rename/
---

> 원본: S46–50

## 학습 목표
- 열과 행을 골라낼 수 있다.
- `loc`(레이블 기준)과 `iloc`(위치 기준)의 차이를 설명하고 쓸 수 있다.

## 1. 열 선택
```python
df['salary']              # 열 하나 → Series
df.salary                 # 같은 결과 (열 이름에 공백·특수문자가 없을 때만)
df[['rank', 'salary']]    # 열 여러 개 → DataFrame (대괄호 두 겹)
```

## 2. 행 선택 (위치 슬라이싱)
```python
df[10:20]                 # 10번째부터 19번째 행
```

## 3. loc vs iloc
| 구분 | `loc` | `iloc` |
|---|---|---|
| 기준 | **레이블**(인덱스 이름, 열 이름) | **정수 위치** |
| 슬라이싱 끝 | **포함** | **포함 안 함** |
| 형태 | `df.loc[행레이블, 열이름]` | `df.iloc[행위치, 열위치]` |

```python
df.loc[10:20, ['salary', 'dept']]     # 인덱스 10~20 (20 포함), salary·dept 열
df.iloc[10:20, [0, 3, 4, 5]]          # 위치 10~19 (20 제외), 0·3·4·5번째 열
df.iloc[1:3, 0:2]                     # 위치 1~2행, 0~1열
df.iloc[[0, 5], [1, 3]]               # 0·5번째 행, 1·3번째 열
```
> 기본 정수 인덱스(0, 1, 2…)에서는 `loc[10:20]`은 11행, `iloc[10:20]`은 10행이 나옵니다. 가장 흔한 실수입니다.

## 4. iloc 자주 쓰는 패턴
```python
df.iloc[0]          # 첫 행
df.iloc[-1]         # 마지막 행
df.iloc[:, 0]       # 첫 열
df.iloc[:, -1]      # 마지막 열
df.iloc[0:7]        # 처음 7행
df.iloc[:, 0:2]     # 처음 2열
```

## 실습

### [Exercise #6-2] 치안트렌드 데이터 자르기
다음 열과 행을 출력하시오.
1. `범죄발생수2021` 열
2. 1~2번 행
3. `범죄발생수2019`, `범죄발생수2021` 열
4. `범죄발생수2021` 열의 9번 행 값
5. 4~5번 행의 1번, 4번 열

<details>
<summary>정답 예시</summary>

```python
df['범죄발생수2021']
df.iloc[1:3]                                   # 또는 df.loc[1:2]
df[['범죄발생수2019', '범죄발생수2021']]
df.loc[9, '범죄발생수2021']
df.iloc[4:6, [1, 4]]
```
</details>

## 정리
- 열: `df['열']`, `df[['열1', '열2']]`
- 레이블 기준: `loc` (끝 포함) / 위치 기준: `iloc` (끝 제외)
