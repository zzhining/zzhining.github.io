---
permalink: /lectures/python/01_python-overview/
title: "01. 파이썬 개요와 라이브러리"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 1
part: 1
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "파이썬 개요와 라이브러리"
prev_post: /lectures/python/00_colab/
next_post: /lectures/python/02_io-syntax/
---

> 원본: S4–5

## 학습 목표
- 파이썬 언어의 특징을 설명할 수 있다.
- 라이브러리(모듈, 패키지)가 무엇인지 설명할 수 있다.

## 1. Python이란
| 특징 | 설명 |
|---|---|
| General-purpose | 웹, 자동화, 데이터 분석, AI 등 여러 분야에 쓰는 범용 언어 |
| Interpreted | 컴파일 없이 한 줄씩 해석해서 실행 |
| Interactive | 코드를 입력하면 결과를 바로 확인 (Colab 셀이 대표적인 예) |
| Object-oriented | 객체지향 프로그래밍을 지원 |
| High-level | 사람이 읽기 쉬운 문법 |

- 오픈소스이며 커뮤니티가 함께 발전시킵니다.
- 기본 배포판(표준 라이브러리)에 많은 모듈이 들어 있습니다.
- 1991년에 처음 공개되었습니다.

## 2. 라이브러리 (Library / Module / Package)
- 오픈소스 커뮤니티가 만든 **쓸모 있는 도구 모음**입니다.
- 필요한 기능을 직접 만들지 않고 `import`해서 씁니다.

| 분야 | 대표 라이브러리 |
|---|---|
| 수치 계산 | NumPy |
| 데이터 처리 | **Pandas** |
| 시각화 | **Matplotlib**, **Seaborn** |
| 지도 시각화 | **Folium** |
| 머신러닝 | scikit-learn |

> 굵게 표시한 라이브러리는 이 과정에서 직접 씁니다. 설치와 import는 [06 문서](/lectures/python/06_libraries-install/)에서 다룹니다.

## 정리
- 파이썬은 읽기 쉽고, 바로 실행해 볼 수 있으며, 라이브러리가 풍부해서 데이터사이언스에 널리 쓰입니다.
- 실습은 설치 없이 바로 쓰는 [Colab](/lectures/python/00_colab/)에서 진행합니다.
