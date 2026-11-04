---
permalink: /lectures/data-visualization/09_text-viz/
title: "09. 텍스트 시각화"
date: 2026-11-04
series: "데이터 시각화"
series_order: 9
part: 2
categories: 데이터분석
tags: [데이터시각화, seaborn, Plotly, Python, Colab]
description: "텍스트 시각화"
prev_post: /lectures/data-visualization/08_distribution/
next_post: /lectures/data-visualization/10_spatial-viz/
---

> 준비: [공통 준비 셀](/lectures/data-visualization/#common-setup) 실행 (한글 폰트 필요)

## 학습 목표
- 워드클라우드의 원리와 설정값(최소 빈도, 불용어)을 설명할 수 있음
- Colab에서 한글 워드클라우드를 만들 수 있음
- 워드 임베딩 시각화의 개념을 설명할 수 있음

## 1. 워드클라우드 (Word Cloud, 단어구름)
- 문서에서 단어가 **얼마나 자주** 쓰였는지를 기준으로 시각화함
- 자주 쓴 단어는 크게, 드물게 쓴 단어는 작게 표시함
- 문서를 다 읽지 않아도 무슨 이야기인지 한눈에 알 수 있음
- 키워드를 보이게 하면 잘 드러나지 않던 관계와 추세가 보임
- 사례: [Top 500 Passwords Visualized](https://informationisbeautiful.net/visualizations/top-500-passwords-visualized/)

### 생성 시 설정값

| 설정 | 의미 |
|---|---|
| 최소 단어 빈도 | N번 이상 나온 단어만 표시 |
| 불용어 (stopwords) | 이해에 필요 없는 단어(조사, '것', '수' 등)를 미리 지정해 제외 |
| 최대 단어 수 | 표시할 단어 개수 상한 |
| 폰트 | **한글은 한글 폰트 경로를 꼭 지정** (지정하지 않으면 □로 나옴) |

## 2. 실습: 한글 워드클라우드

```python
# Colab에는 wordcloud가 설치되어 있음. 없으면: !pip install -q wordcloud
from wordcloud import WordCloud
from collections import Counter
import re

text = """
데이터 시각화는 데이터를 차트 그래프 지도로 표현해 정보를 빠르게 전달한다.
시각화는 데이터 탐색과 설명에 모두 쓰인다. 좋은 시각화는 인사이트를 준다.
히트맵 산점도 막대 그래프 선 그래프 히스토그램은 대표적인 시각화 방법이다.
데이터 분석가는 시각화로 이상치와 추세를 찾는다. 시각화 도구로는 파이썬과 태블로가 있다.
"""

# 1) 단어 나누기 (한글 2글자 이상)
words = re.findall(r'[가-힣]{2,}', text)

# 2) 불용어 제거
stopwords = {'모두', '쓰인다', '있다', '이다', '대표적인'}
words = [w for w in words if w not in stopwords]

# 3) 빈도 계산 + 최소 빈도 필터
freq = Counter(words)
min_count = 1
freq = {w: c for w, c in freq.items() if c >= min_count}

# 4) 워드클라우드
wc = WordCloud(font_path='/usr/share/fonts/truetype/nanum/NanumBarunGothic.ttf',
               background_color='white', width=800, height=400,
               max_words=100, colormap='viridis')
wc.generate_from_frequencies(freq)

plt.figure(figsize=(10, 5))
plt.imshow(wc, interpolation='bilinear')
plt.axis('off')
plt.show()
```

> 실제 한국어 문서는 조사가 붙어 있어서(예: '데이터를', '데이터는') 위처럼 단순히 나누면 같은 단어가 따로 셈. 형태소 분석기(예: `kiwipiepy`)로 **명사만 뽑은 뒤** 빈도를 세면 결과가 훨씬 좋아짐
> ```python
> !pip install -q kiwipiepy
> from kiwipiepy import Kiwi
> kiwi = Kiwi()
> nouns = [t.form for t in kiwi.tokenize(text) if t.tag in ('NNG', 'NNP') and len(t.form) > 1]
> ```

### 빈도 막대그래프로 함께 보기
워드클라우드는 크기 비교가 정확하지 않음. 정확한 순위는 막대그래프로 확인함

```python
top = pd.Series(freq).sort_values(ascending=False).head(10)
sns.barplot(x=top.values, y=top.index, color='steelblue')
plt.xlabel('빈도')
plt.show()
```

## 3. 워드 임베딩 프로젝터
- **워드 임베딩**: 단어를 의미 정보까지 담은 **벡터**로 바꾸는 것임 (예: Word2Vec)
- 의미가 비슷한 단어는 벡터 공간에서 가까이 놓임 (예: '왕' − '남자' + '여자' ≈ '여왕')
- 수백 차원 벡터를 PCA, t-SNE 같은 방법으로 2D/3D로 줄여 시각화함
- 도구: [TensorFlow Embedding Projector](https://projector.tensorflow.org/) — 브라우저에서 바로 Word2Vec 예제를 돌려 볼 수 있음
- 사례: [Book Embedding](https://towardsdatascience.com/neural-network-embeddings-explained-4d028e6f0526) — 위키백과 책 정보를 임베딩해, 장르가 비슷한 책끼리 모이는 것을 보여 줌

## 정리

| 기법 | 표현 대상 | 도구 |
|---|---|---|
| 워드클라우드 | 단어 **빈도** | `wordcloud` (한글은 `font_path` 필수) |
| 워드 임베딩 시각화 | 단어 **의미**의 거리 | Embedding Projector |
