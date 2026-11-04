---
permalink: /lectures/python/13_report-preprocessing/
title: "13. 신고 데이터 전처리"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 13
part: 3
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "신고 데이터 전처리"
prev_post: /lectures/python/12_project-intro/
next_post: /lectures/python/14_seaborn-analysis/
---

> 원본: S64–68

## 학습 목표
- 컬럼정의서로 헤더 없는 데이터에 열 이름을 붙일 수 있다.
- 조건 필터링, 인덱스 지정, 열 제거로 분석용 데이터를 만들 수 있다.

> 전제: [12 문서](/lectures/python/12_project-intro/)의 준비 셀과 한글 폰트 셀을 실행했다.

## 1. 컬럼이름 추가
### 컬럼정의서에서 열 이름 가져오기
```python
columns = pd.read_excel('범죄 빈발지 데이터(행정동단위)_컬럼정의서.xls')
col_lst = columns.컬럼한글명.tolist()     # 리스트로 바꾸기
col_lst
```
> `.xls`(구 엑셀 형식)를 읽으려면 `xlrd` 패키지가 필요합니다. 에러가 나면 `!pip install -q xlrd`를 먼저 실행하세요.

### 신고 빈발지 데이터에 열 이름 붙이기
```python
report = pd.read_csv('범죄 빈발지 데이터(행정동단위).csv', header=None)  # 헤더 없음
# 에러 나면: pd.read_csv(..., header=None, encoding='cp949')
report.columns = col_lst
report.head()
```

## 2. 조건에 따른 데이터 필터링
서울 데이터만 뽑습니다.
```python
seoul = report[report.시도 == '서울특별시']
seoul.head()
```

## 3. 인덱스 지정
시군구(구 이름)를 인덱스로 씁니다.
```python
seoul = seoul.set_index('시군구')
seoul.head()
```
> 원본은 `seoul.set_index('시군구', inplace=True)`입니다. 필터링 결과에 `inplace=True`를 쓰면 `SettingWithCopyWarning`이 날 수 있어서, 다시 대입하는 방식으로 바꿨습니다.

## 4. 불필요한 컬럼 제거
신고년도, 시도, 총 신고수를 지웁니다.
```python
seoul_2021 = seoul.drop(['신고년도', '시도', ' 총 신고수'], axis=1)  # ' 총 신고수' 앞 공백 주의
seoul_2021.head()
```
- `axis=1`: 열 방향으로 삭제 (`axis=0`은 행)
- 남는 열: 8개 신고 종류 (가정폭력 ~ 폭력)

## 확인
```python
seoul_2021.shape     # (25, 8) — 서울 25개 구 × 신고 종류 8개
seoul_2021.dtypes    # 모두 숫자형인지 확인
```

## 정리
| 단계 | 코드 |
|---|---|
| 열 이름 붙이기 | `report.columns = col_lst` |
| 서울만 고르기 | `report[report.시도 == '서울특별시']` |
| 인덱스 지정 | `seoul.set_index('시군구')` |
| 열 제거 | `seoul.drop([...], axis=1)` |

결과 `seoul_2021`은 이후 [14](/lectures/python/14_seaborn-analysis/)~[16](/lectures/python/16_crime-merge-correlation/) 문서에서 계속 씁니다.
