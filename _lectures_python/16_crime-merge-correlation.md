---
permalink: /lectures/python/16_crime-merge-correlation/
title: "16. 범죄 데이터 병합과 상관분석"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 16
part: 3
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "범죄 데이터 병합과 상관분석"
prev_post: /lectures/python/15_folium-map/
---

## 학습 목표
- 서울시 5대 범죄 데이터를 분석할 수 있는 형태로 전처리함
- `concat`과 `merge`로 데이터를 합칠 수 있음
- 신고 수와 실제 범죄 발생의 관계를 상관분석과 산점도로 확인함

> 전제: [13 문서](/lectures/python/13_report-preprocessing/)에서 `seoul_2021`을 만들었음

## 분석 흐름
- **전처리**: 열 삭제 → 열 이름 변경 → 행 삭제 → 인덱스 설정 → 정수 변환 → 발생·검거 추출 및 병합 → 신고 데이터와 병합
- **분석**: 범죄 신고와 발생의 상관관계, 산점도

## 1. 데이터: 서울시 5대 범죄 발생현황 통계

| 항목 | 내용 |
|---|---|
| 통계명 | 5대 범죄 발생현황 |
| 통계 종류 | 경찰청의 5대 범죄 발생·검거 현황 (일반·보고통계) |
| 작성 목적 | 범죄 검거 현황과 유형별 변화 추이 조사 |
| 출처 | https://data.seoul.go.kr/dataList/316/S/2/datasetView.do |

## 2. 전처리
### 데이터 불러오기와 열 삭제

```python
crime = pd.read_excel('5대+범죄+발생현황_20230731232037.xlsx')
crime.head()

crime = crime.iloc[:, 1:]     # 첫 번째 열(자치구 상위 구분) 삭제
crime.head()
```

> 파일 이름의 숫자는 내려받은 날짜·시각임. 직접 내려받았다면 파일 이름에 맞게 고칠 것

### 열 이름 변경

```python
crime.columns = ['구', '발생합계', '검거합계',
                 '살인발생', '살인검거', '강도발생', '강도검거',
                 '강간강제추행발생', '강간강제추행검거',
                 '절도발생', '절도검거', '폭력발생', '폭력검거']
crime.head()
```

### 행 삭제

```python
crime = crime.iloc[4:, :]     # 위쪽 4행(헤더 설명·소계) 삭제
crime.head()
```

> 내려받은 시점에 따라 위쪽 설명 행 수가 다를 수 있음. `crime.head(6)`으로 먼저 확인한 뒤 숫자를 정할 것

### 인덱스 설정

```python
crime = crime.set_index('구')
crime.head()
```

### 정수 변환

```python
crime.dtypes                  # 변환 전: object (문자)
crime = crime.astype('int')
crime.dtypes                  # 변환 후: int64
```

> 값에 `-`나 쉼표가 섞여 있으면 `astype('int')`가 실패함. 그럴 때는 다음처럼 바꿈
> ```python
> crime = crime.replace({'-': 0, ',': ''}, regex=True).astype('int')
> ```

## 3. 범죄 발생·검거 추출 및 병합

```python
crime_occur  = crime[['살인발생', '강도발생', '강간강제추행발생', '절도발생', '폭력발생']]
crime_arrest = crime[['살인검거', '강도검거', '강간강제추행검거', '절도검거', '폭력검거']]

crime_2021 = pd.concat([crime_occur, crime_arrest], axis=1)   # 옆으로 붙이기
crime_2021.head()
```

## 4. 신고 데이터와 범죄 데이터 병합
두 데이터 모두 인덱스가 구 이름이므로 **인덱스 기준**으로 합침

```python
df = pd.merge(seoul_2021, crime_2021,
              left_index=True, right_index=True, how='inner')
df.head()
df.shape    # (25, 18) 예상: 신고 8열 + 발생 5열 + 검거 5열
```

### concat vs merge

| 함수 | 합치는 기준 | 주 용도 |
|---|---|---|
| `pd.concat([a, b], axis=1)` | 인덱스 위치를 맞춰 붙임 | 같은 행 구성의 열을 이어 붙이기 |
| `pd.merge(a, b, on=... / left_index=...)` | 키 열이나 인덱스 값 | 서로 다른 데이터를 키로 연결 |

## 5. 분석
### 범죄 신고와 발생의 상관관계

```python
plt.figure(figsize=(10, 10))
sns.heatmap(df.corr(numeric_only=True), annot=True, fmt='.2f')
plt.show()
```

> **수정**: pandas 2.x 대응으로 `numeric_only=True`를 붙였음

**해석**: 다른 신고는 범죄 발생과 관련이 거의 없고, **강도 신고만 범죄 발생과 관련**이 있음

> 상관관계는 인과관계가 아님. 25개 구라는 작은 표본에서 나온 결과이므로 결론을 내릴 때 주의해야 함

### 범죄 신고와 발생의 산점도

```python
sns.pairplot(df)
plt.show()
```

> 18개 열의 pairplot은 그래프가 324개라 오래 걸림. 관심 있는 열만 골라 그리면 빠름
> ```python
> sns.pairplot(df[['강도 신고수', '강도발생', '폭력 신고수', '폭력발생']])
> plt.show()
> ```

## 정리

| 단계 | 코드 |
|---|---|
| 불필요한 열·행 제거 | `iloc[:, 1:]`, `iloc[4:, :]` |
| 타입 변환 | `astype('int')` |
| 열 붙이기 | `pd.concat([...], axis=1)` |
| 인덱스로 병합 | `pd.merge(a, b, left_index=True, right_index=True)` |
| 관계 확인 | `sns.heatmap(df.corr(numeric_only=True))`, `sns.pairplot()` |
