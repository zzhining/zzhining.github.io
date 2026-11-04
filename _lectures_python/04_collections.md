---
permalink: /lectures/python/04_collections/
title: "04. 컬렉션 자료형"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 4
part: 1
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "컬렉션 자료형"
prev_post: /lectures/python/03_numbers-strings-variables/
next_post: /lectures/python/05_for-loop/
---

## 학습 목표
- 리스트, 튜플, 딕셔너리의 차이를 설명할 수 있음
- 각 자료형의 주요 메서드를 쓸 수 있음

## 한눈에 비교

| 자료형 | 기호 | 변경 가능 | 접근 방법 | 용도 |
|---|---|---|---|---|
| 리스트 `list` | `[ ]` | O | 위치(인덱스) | 순서 있는 값 모음 |
| 튜플 `tuple` | `( )` | X | 위치(인덱스) | 바뀌면 안 되는 값 모음 |
| 딕셔너리 `dict` | `{ }` | O | 키(key) | 이름표가 붙은 값 모음 |

## 1. 리스트 (Lists)
- 값을 바꿀 수 있는(mutable) 순서 있는 모음임. 서로 다른 타입을 섞어 담을 수 있음

```python
var = []                                # 빈 리스트
var = ['one', 2, 'three', 'banana']

var[0]                # 'one'
var[1:3]              # [2, 'three']
var[1] = 'two'        # 값 바꾸기
```

| 메서드 | 기능 |
|---|---|
| `append(x)` | 맨 뒤에 추가 |
| `insert(i, x)` | i번째 위치에 추가 |
| `extend(list)` | 다른 리스트를 이어 붙이기 |
| `remove(x)` | 값 x 삭제 (처음 나온 것) |
| `pop(i)` | i번째 값을 꺼내고 삭제 (생략하면 마지막) |
| `clear()` | 전부 삭제 |
| `copy()` | 복사본 만들기 |

```python
fruits = ['apple', 'banana']
fruits.append('cherry')      # ['apple', 'banana', 'cherry']
fruits.insert(0, 'kiwi')     # ['kiwi', 'apple', 'banana', 'cherry']
fruits.pop()                 # 'cherry' 꺼냄
```

## 2. 튜플 (Tuples)
- 만든 뒤에는 바꿀 수 없는(immutable) 모음임

```python
var = ('one', 2, 'three', 'banana')
len(var)       # 4
var[0]         # 'one'
# var[0] = 1   # TypeError: 튜플은 수정할 수 없음
del var        # 튜플 전체 삭제는 가능
```

## 3. 딕셔너리 (Dictionaries)
- **키(key) : 값(value)** 쌍으로 저장하는 연관 배열임

```python
var = {}                                  # 빈 딕셔너리
var = {'lat': 40.20547, 'lon': -74.76322}

var['lat']             # 40.20547  키로 조회
var['lat'] = 40.2054   # 값 바꾸기
var['name'] = 'NJ'     # 새 키 추가
```

| 메서드·함수 | 기능 |
|---|---|
| `get(key, 기본값)` | 키로 조회 (키가 없으면 기본값, 에러 없음) |
| `pop(key)` | 키의 값을 꺼내고 삭제 |
| `keys()`, `values()`, `items()` | 키 / 값 / (키, 값) 목록 |
| `clear()`, `copy()` | 전부 삭제 / 복사 |
| `del d[key]`, `len(d)` | 항목 삭제 / 항목 개수 |

> 딕셔너리는 Pandas DataFrame을 만드는 기본 재료임 ([07 문서](/lectures/python/07_series-dataframe/))

## 정리
- 순서 + 수정 가능 → **리스트**
- 순서 + 수정 불가 → **튜플**
- 키로 찾기 → **딕셔너리**
- 이 자료형들을 하나씩 꺼내 처리하는 방법이 다음 [05 for 반복문](/lectures/python/05_for-loop/)임
