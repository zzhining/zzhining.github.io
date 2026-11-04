---
layout: page
title: 데이터 시각화 강의자료
permalink: /lectures/data-visualization/
---

<h1>데이터 시각화</h1>
<p>시각화 이론부터 seaborn, Plotly 실습까지 배우는 18개 문서 커리큘럼입니다. 실습 환경은 Google Colab(seaborn 0.13, plotly 5 이상 기준)입니다. Python 문법이 낯설면 먼저 <a href="/lectures/python/">데이터사이언스를 위한 Python 기초</a>를 학습합니다.</p>

{% assign all_lectures = site.lectures_data_visualization | sort: "series_order" %}
{% assign part_names = "Part 1. 시각화 이론|Part 2. 차트 유형|Part 3. Python 실습 - seaborn|Part 4. Python 실습 - Plotly|부록" | split: "|" %}
{% for part_name in part_names %}
{% assign idx = forloop.index %}
<div class="lecture-module">
  <h2 class="module-title">{{ part_name }}</h2>
  <div class="lecture-grid">
    {% for lecture in all_lectures %}
    {% if lecture.part == idx %}
    <a class="lecture-card" href="{{ lecture.url | relative_url }}">
      <div class="lecture-card-body">
        <h3 class="lecture-card-title">{{ lecture.title }}</h3>
      </div>
    </a>
    {% endif %}
    {% endfor %}
  </div>
</div>
{% endfor %}

## 공통 준비 셀 {#common-setup}

Part 2~4의 코드는 아래 셀을 먼저 실행한 상태를 전제로 함

```python
# 한글 폰트 (Colab)
!apt-get -qq install -y fonts-nanum > /dev/null

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import seaborn as sns

fm.fontManager.addfont('/usr/share/fonts/truetype/nanum/NanumBarunGothic.ttf')
plt.rc('font', family='NanumBarunGothic')
plt.rc('axes', unicode_minus=False)
```

> seaborn은 테마를 바꾸면 폰트 설정이 초기화됨. `sns.set_theme()`을 쓸 때는 `sns.set_theme(font='NanumBarunGothic')`처럼 폰트를 함께 지정할 것
