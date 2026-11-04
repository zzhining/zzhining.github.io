---
permalink: /lectures/python/00_colab/
title: "00. Google Colab 실습 환경"
date: 2026-11-04
series: "데이터사이언스를 위한 Python 기초"
series_order: 0
part: 0
categories: 데이터분석
tags: [Python, 파이썬, Pandas, 데이터분석, Colab]
description: "Google Colab 실습 환경"
next_post: /lectures/python/01_python-overview/
---

## 학습 목표
- Colab이 무엇인지, 노트북과 셀이 무엇인지 설명할 수 있음
- 새 노트북을 만들고, 코드를 실행하고, 저장할 수 있음
- 내 PC 파일 업로드와 구글 드라이브 마운트로 실습 데이터를 불러올 수 있음

## 1. 준비물
- 인터넷에 연결된 컴퓨터
- 구글 계정 (생성: https://accounts.google.com/signup)
- Google Colab (접속: https://colab.research.google.com)

> 모두가 같은 환경에서 같은 결과를 보려고 Colab을 씀. 설치할 것이 없음

## 2. Colab이란
- 웹 브라우저에서 **무료로** 파이썬 코드를 작성·실행·저장하는 서비스임
- 구글이 주피터 노트북을 고쳐 만든 **클라우드 기반 노트북** 환경임
- 코드는 내 PC가 아니라 **구글 클라우드의 가상 서버(런타임)**에서 실행됨

### 화면 구성

| 영역 | 설명 |
|---|---|
| 노트 제목 | 클릭해서 파일 이름을 바꿈 |
| 메뉴 | 파일, 수정, 보기, 삽입, 런타임, 도구 |
| 사이드 메뉴 | 목차, 검색, **파일(폴더 아이콘)** |
| 노트 편집 영역 | 코드 셀과 텍스트 셀을 작성하는 곳 |
| 실행 버튼 | 셀 왼쪽의 ▶ 아이콘 |

## 3. 노트북과 셀
- **노트북**(`.ipynb`): Colab의 작성 단위임. 코드·실행 결과·설명을 한 문서에 담아 대화식으로 작업하므로 데이터 분석과 교육에 잘 맞음
- **셀**: 실행의 최소 단위임. 셀 안의 내용을 한 번에 실행하고 결과를 바로 아래에 보여 줌
  - **코드 셀**: 파이썬 코드를 작성·실행함
  - **텍스트 셀**: 마크다운으로 설명, 제목, 목록을 씀

## 4. 제한사항
- 런타임에 연결되기 전이나 연결이 끊어지면 오른쪽 위에 **[연결]** 버튼이 보임
- 무료 런타임은 메모리, 디스크, 동시 세션 수, 최대 실행 시간(최대 약 12시간)에 제한이 있음. 오래 아무것도 안 하면 연결이 끊김
- 연결이 끊기면 **변수와 업로드한 파일이 모두 사라짐.** 그래서 실습 데이터는 구글 드라이브에 두는 것을 권함
- 더 많은 자원이 필요하면 유료 요금제(Colab Pro 등)가 있음

> 사양과 제한은 구글 정책에 따라 자주 바뀜. 수업 직전에 [Colab FAQ](https://research.google.com/colaboratory/faq.html)에서 확인

## 5. 새 노트북 만들기 (실습)
1. **[파일] → [새 노트]**를 클릭함
2. `Untitled0.ipynb` 같은 이름의 노트북이 빈 코드 셀 하나와 함께 생김
3. 코드 셀에 다음을 입력하고 실행함 (`Ctrl + Enter` 또는 ▶ 클릭)
   ```python
   print('Hello World')
   ```
4. 제목을 클릭해 이름을 `Hello World`로 바꿈
5. 노트북은 구글 드라이브 **[내 드라이브] → [Colab Notebooks]** 폴더에 자동 저장됨. 직접 저장하려면 **[파일] → [저장]**(`Ctrl + S`)을 누름
6. 저장한 노트북 다시 열기
   - Colab에서 **[파일] → [노트 열기] → [Google Drive]** 탭
   - 또는 구글 드라이브에서 파일을 오른쪽 클릭 → **[연결 앱] → [Google Colaboratory]**

## 6. 단축키

| 단축키 | 기능 |
|---|---|
| `Ctrl + Enter` | 현재 셀 실행 |
| `Shift + Enter` | 셀 실행 후 다음 셀로 이동 |
| `Alt + Enter` | 셀 실행 후 아래에 새 셀 추가 |
| `Ctrl + M` → `B` / `A` | 아래 / 위에 코드 셀 추가 |
| `Ctrl + M` → `M` / `Y` | 텍스트 셀 / 코드 셀로 바꾸기 |
| `Ctrl + M` → `D` | 셀 삭제 |
| `Ctrl + /` | 선택한 줄 주석 처리·해제 |
| `Ctrl + M` → `H` | 단축키 전체 보기 |

## 7. GPU 사용하기
- **[런타임] → [런타임 유형 변경] → 하드웨어 가속기: GPU** 선택 후 저장
- 계정마다 GPU 사용량 제한이 있음. 이 과정의 실습은 **CPU로 충분**함

## 8. 데이터 업로드
### 방법 1. 내 PC에서 바로 업로드

```python
from google.colab import files
file_uploaded = files.upload()   # [파일 선택] 버튼이 나타남
```

- 업로드한 파일은 `/content/`에 저장되며, **런타임이 끊기면 사라짐.**
- 사이드 메뉴의 폴더 아이콘에 파일을 끌어다 놓아도 됨

### 방법 2. 구글 드라이브 마운트 (권장)
1. 구글 드라이브에 실습 폴더(예: `내 드라이브/python-ds/data`)를 만들고 데이터를 올림
2. Colab에서 다음 코드를 실행함
   ```python
   from google.colab import drive
   drive.mount('/content/drive')
   ```
3. "Google Drive 파일에 액세스하도록 허용하시겠습니까?"가 나오면 **[Google Drive에 연결]**을 누름
4. 계정을 선택하고 **[허용]**을 누름
5. 연결되면 `Mounted at /content/drive`가 출력됨
6. 사이드 메뉴의 폴더 아이콘에서 파일을 오른쪽 클릭 → **[경로 복사]** 후 코드에 붙여 넣음
   ```python
   import pandas as pd
   df = pd.read_csv('/content/drive/MyDrive/python-ds/data/치안트렌드.csv')
   ```

> **팁**: 작업 폴더를 데이터 폴더로 옮기면 이후 코드에서 파일 이름만 써도 됨
> ```python
> %cd /content/drive/MyDrive/python-ds/data
> ```
> 이 자료의 Part 2·3 코드는 모두 이렇게 옮겼다고 가정함

## 정리
- **Colab**: 구글 계정만 있으면 누구나 쓰는 브라우저 기반 파이썬 실행 환경
- **노트북**: 코드·결과·설명을 함께 담는 대화식 작성 단위
- **구글 드라이브**: 노트북은 `Colab Notebooks` 폴더에 자동 저장됨. 데이터도 드라이브에 두고 마운트해서 씀
