---
permalink: /lectures/python/05_for-loop/
title: "05. for 반복문"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 5
part: 1
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "for 반복문"
prev_post: /lectures/python/04_collections/
next_post: /lectures/python/06_libraries-install/
---

## 학습 목표
- `for` 문으로 리스트, 문자열, 딕셔너리의 값을 하나씩 처리할 수 있음
- `range()`, `enumerate()`를 쓸 수 있음
- 반복문 안에서 `if`로 조건을 처리할 수 있음

## 1. 기본 구조

```python
for 변수 in 반복할_대상:
    반복할 코드      # 들여쓰기 필수
```

- **반복할 대상**(리스트, 문자열, range 등)에서 값을 하나씩 꺼내 **변수**에 넣고 블록을 실행함

```python
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(fruit)
# apple
# banana
# cherry
```

## 2. range() — 숫자 범위 만들기

| 형태 | 만들어지는 값 |
|---|---|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8 |

```python
for i in range(1, 6):
    print(i, "번째 반복")
```

> 끝 숫자는 **포함하지 않음** (슬라이싱 `[a:b]`과 같은 규칙)

## 3. 여러 자료형 순회
### 문자열

```python
for ch in "hello":
    print(ch)
```

### 딕셔너리

```python
location = {'lat': 40.20547, 'lon': -74.76322}

for key in location:                 # 키만
    print(key)

for key, value in location.items():  # 키와 값 함께
    print(key, "=", value)
```

## 4. 위치(인덱스)와 값을 함께 쓰기
### 방법 1. `range(len(...))` — 실습 코드에서 자주 쓰는 패턴

```python
gu_list = ['강남구', '강동구', '강북구']
for i in range(len(gu_list)):
    print(i, gu_list[i])
```

> Part 3의 지도 시각화와 subplot 그리기에서 이 패턴을 씀

### 방법 2. `enumerate()` — 더 파이썬다운 방법

```python
for i, gu in enumerate(gu_list):
    print(i, gu)

for i, gu in enumerate(gu_list, start=1):   # 1부터 번호 매기기
    print(i, gu)
```

## 5. 반복 + 조건 (if)

```python
scores = [92, 58, 77, 45, 88]
for s in scores:
    if s >= 60:
        print(s, "합격")
    else:
        print(s, "불합격")
```

### 누적 계산

```python
total = 0
for s in scores:
    total += s          # total = total + s
print("합계:", total, "평균:", total / len(scores))
```

### break / continue

```python
for s in scores:
    if s < 50:
        print("50점 미만 발견:", s)
        break           # 반복을 즉시 끝냄

for s in scores:
    if s < 60:
        continue        # 이번 값은 건너뛰고 다음 값으로
    print(s)
```

## 6. 리스트 컴프리헨션 (맛보기)
`for`로 새 리스트를 만드는 코드를 한 줄로 줄여 씀

```python
squares = [x ** 2 for x in range(1, 6)]   # [1, 4, 9, 16, 25]
passed = [s for s in scores if s >= 60]   # [92, 77, 88]
```

## 7. Pandas와의 연결 (미리 보기)
DataFrame도 `for`로 한 행씩 처리할 수 있음 ([11 문서](/lectures/python/11_groupby-agg/))

```python
for index, row in df.iterrows():
    print(index, row["salary"], row["dept"])
```

> 다만 Pandas는 열 단위 연산(`df['salary'] * 1.1`)이 훨씬 빠름. `for`는 그래프를 여러 개 그릴 때처럼 **반복 작업이 꼭 필요한 경우**에 씀

## 실습

### [Exercise #5-1] 구구단
2단부터 9단까지 출력

<details markdown="1">
<summary>정답 예시</summary>

```python
for dan in range(2, 10):
    for n in range(1, 10):
        print(f"{dan} x {n} = {dan * n}")
    print()
```

</details>

### [Exercise #5-2] 신고 건수 집계
아래 딕셔너리에서 신고 건수가 1,000건 이상인 구만 출력하고, 전체 합계를 구

```python
reports = {'강남구': 1520, '강동구': 870, '강북구': 1105, '강서구': 640}
```

<details markdown="1">
<summary>정답 예시</summary>

```python
total = 0
for gu, cnt in reports.items():
    total += cnt
    if cnt >= 1000:
        print(gu, cnt)
print("합계:", total)
```

</details>

### [Exercise #5-3] 번호 붙여 출력
`['폭력', '절도', '강도']`를 `1. 폭력` 형식으로 출력 (`enumerate` 사용)

<details markdown="1">
<summary>정답 예시</summary>

```python
for i, crime in enumerate(['폭력', '절도', '강도'], start=1):
    print(f"{i}. {crime}")
```

</details>

## 정리

| 문법 | 용도 |
|---|---|
| `for x in 대상:` | 값을 하나씩 꺼내 반복 |
| `range(시작, 끝, 간격)` | 숫자 범위 (끝은 포함 안 함) |
| `dict.items()` | 키와 값을 함께 반복 |
| `range(len(...))` / `enumerate()` | 인덱스와 값을 함께 쓰기 |
| `break` / `continue` | 반복 끝내기 / 건너뛰기 |
