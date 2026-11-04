---
permalink: /lectures/python/06_libraries-install/
title: "06. 데이터분석 라이브러리와 패키지 설치"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 6
part: 2
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "데이터분석 라이브러리와 패키지 설치"
prev_post: /lectures/python/05_for-loop/
next_post: /lectures/python/07_series-dataframe/
---

> 원본: S30–33

## 학습 목표
- Pandas와 Matplotlib의 역할을 설명할 수 있다.
- Colab에서 패키지를 설치하고 import할 수 있다.

## 1. Pandas
- **NumPy**를 기반으로 만든 데이터 분석 라이브러리입니다.
- 표 형태 데이터를 다루기 쉬운 자료구조(**Series**, **DataFrame**)와 분석 도구를 제공합니다.

## 2. Matplotlib
- 여러 형식의 고품질 2D 그래프를 그리는 시각화 라이브러리입니다.
- 숫자를 **한눈에 이해되는 정보**로 바꿔 줍니다.
- 이 과정의 **Seaborn**([14 문서](/lectures/python/14_seaborn-analysis/))은 Matplotlib 위에 만들어졌습니다.

## 3. 패키지 설치 (Colab)
- `pip`는 파이썬의 패키지 관리 도구입니다.
- Colab 코드 셀에서는 앞에 **`!`**를 붙이면 터미널 명령으로 실행됩니다.
```python
!pip install pandas
!pip install -q folium      # -q: 설치 로그를 짧게
!pip install --upgrade seaborn
```
> Colab에는 **pandas, numpy, matplotlib, seaborn, folium이 기본 설치**되어 있습니다. 보통 설치 없이 import만 하면 됩니다.
> 설치된 버전 확인: `!pip show pandas` 또는 `pd.__version__`

## 4. 패키지 import
```python
import pandas                 # 별칭 없이 import → pandas.DataFrame()
import pandas as pd           # 별칭으로 import → pd.DataFrame()  (관례)
from pandas import DataFrame  # 패키지 안의 객체만 import → DataFrame()
```

### 이 과정의 표준 import 셀
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
```

## 정리
| 라이브러리 | 별칭 | 역할 |
|---|---|---|
| NumPy | `np` | 수치 계산 |
| Pandas | `pd` | 표 데이터 처리 |
| Matplotlib | `plt` | 기본 시각화 |
| Seaborn | `sns` | 통계 시각화 |
