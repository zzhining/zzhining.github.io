---
layout: post
title: "비개발자를 위한 Claude Code 실습 가이드 2026 ④: 경쟁사 10곳을 동시에 조사한다"
date: 2026-05-06
categories: AI활용
tags: [ClaudeCode, AI리서치자동화, 경쟁사분석, 병렬에이전트, AI업무자동화, 비개발자AI]
description: "Claude Code의 서브에이전트와 웹서치 기능을 활용하면 경쟁사 10곳의 가격, 기능, 주요 메시지를 동시에 조사해서 하나의 비교표로 만들 수 있다. 비개발자가 그대로 따라할 수 있도록 URL 목록 파일 준비부터 결과 저장까지 단계별로 안내한다."
---

> 이 글은 **Claude Code 실습 시리즈**의 네 번째 편이다.  
> 📁 1편: [내 폴더를 AI가 직접 읽는다 — 로컬 파일 일괄 처리](/blog/claude-code-local-files)  
> 📊 2편: [엑셀을 AI가 직접 고친다 — 데이터 정제 자동화](/blog/claude-code-excel)  
> 🔁 3편: [매주 반복하는 보고서, 한 번만 만들면 된다 — 자동화 스케줄링](/blog/claude-code-automation)  
> 🌐 **4편: 경쟁사 10곳을 동시에 조사한다 — 병렬 리서치 자동화** ← 현재 글

---

경쟁사 조사 업무를 맡아본 적 있다면 이 과정을 알 것이다. 브라우저 탭을 10개 열고, 사이트마다 들어가서 가격 페이지를 찾고, 요금제 이름과 금액을 메모장에 옮기고, 특징 비교표를 엑셀에 만든다. 빠르게 해도 2~3시간이 걸리는 작업이다.

ChatGPT에 "이 10개 회사 가격 조사해줘"라고 요청하면 학습 데이터 기준의 오래된 정보를 준다. 실시간 사이트를 보는 게 아니다.

**Claude Code의 서브에이전트 기능을 활용하면 다르다.** "이 10개 회사 사이트를 각자 동시에 방문해서 가격 정보를 가져와 비교표로 만들어줘"라고 지시하면, 10개의 에이전트가 동시에 각 사이트를 탐색하고 결과를 하나의 파일로 합친다. 순차 처리 대비 약 5배 빠르다.

---

## 1. 이 가이드에서 만들 것

**실습 시나리오**

> **상황:** SaaS 프로젝트 관리 툴 시장 조사를 맡았다. 경쟁사 8곳의 요금제, 주요 기능, 타깃 고객 메시지를 비교해야 한다.  
> **목표:** 각 회사 홈페이지를 실시간으로 탐색해서 하나의 비교 문서를 자동으로 생성한다.  
> **ChatGPT 대비 차이:** ChatGPT는 한 번에 하나씩, 학습 데이터 기준으로 답한다. Claude Code는 지금 이 순간 실제 사이트를 동시에 탐색한다.

---

## 2. 핵심 개념 — 서브에이전트가 무엇인가

Claude Code는 하나의 AI가 순서대로 작업을 처리하는 것이 기본이다. 여기에 **서브에이전트(Sub-agent)**를 활용하면 여러 개의 독립된 AI 인스턴스가 동시에 다른 작업을 처리한다.

```
[나의 지시]
    │
    ├── 서브에이전트 1 → Notion 가격 페이지 탐색
    ├── 서브에이전트 2 → Asana 가격 페이지 탐색
    ├── 서브에이전트 3 → Monday.com 가격 페이지 탐색
    ├── ...
    └── 서브에이전트 8 → ClickUp 가격 페이지 탐색
                            │
                    [결과 취합 → 비교표 생성]
```

각 서브에이전트는 독립적인 컨텍스트 창을 갖는다. 덕분에 한 사이트의 탐색 로그가 다른 사이트 작업에 영향을 미치지 않는다. 결과만 메인 세션으로 돌아온다.

**비개발자 입장에서 알아야 할 것은 하나다.** 자연어로 "각각 별도 서브에이전트를 써서 병렬로 조사해줘"라고 지시하면 Claude Code가 알아서 처리한다. 코드를 작성하지 않아도 된다.

---

## 3. 웹서치 기능 활성화 확인

서브에이전트가 실제 웹사이트를 탐색하려면 웹서치 기능이 켜져 있어야 한다.

**Claude Code CLI에서 확인하는 방법**

터미널에서 Claude Code를 실행한 뒤 다음을 입력한다.

```
웹서치 기능을 사용할 수 있어?
```

"네, 웹서치 기능을 사용할 수 있습니다"라는 답변이 나오면 준비가 됐다. 사용 불가 메시지가 나오면 아래 방법으로 활성화한다.

**웹서치 활성화 방법**

```bash
/plugin marketplace add parallel-web/parallel-agent-skills
/plugin install parallel
```

설치 후 세션을 재시작한다(`/exit` 후 `claude`로 재실행).

> ℹ️ **Claude.ai 웹 버전 사용자라면**  
> 채팅 입력창 왼쪽 `+` 버튼을 클릭하고 **Web search**를 활성화하면 된다. 단, 웹 버전은 로컬 파일 저장이 안 되므로 결과를 직접 복사해야 한다.

---

## 4. 준비물 — 조사 대상 목록 파일 만들기

먼저 조사할 회사 목록을 텍스트 파일로 만든다. 메모장(윈도우) 또는 텍스트 편집기(맥)를 열고 아래 내용을 입력한 뒤 `competitors.txt`로 저장한다.

```
# 프로젝트 관리 SaaS 경쟁사 조사 목록
# 형식: 회사명 | 가격 페이지 URL

Notion | https://www.notion.so/pricing
Asana | https://asana.com/pricing
Monday.com | https://monday.com/pricing
ClickUp | https://clickup.com/pricing
Basecamp | https://basecamp.com/pricing
Linear | https://linear.app/pricing
Todoist | https://todoist.com/pricing
Trello | https://trello.com/pricing
```

> **팁:** URL을 모른다면 회사명만 적어도 된다. Claude Code가 직접 검색해서 가격 페이지를 찾아간다. 단, URL을 직접 제공하면 더 정확한 결과를 얻는다.

파일이 없어도 된다. 다음 섹션에서 프롬프트 안에 직접 목록을 넣는 방법도 함께 안내한다.

---

## 5. 실습 — 경쟁사 가격 비교표 자동 생성

파일이 저장된 폴더로 이동한 뒤 Claude Code를 실행한다.

```bash
cd "C:\Users\홍길동\Documents\research"   # 윈도우
cd /Users/honggildong/Documents/research   # 맥

claude
```

**프롬프트 1 — 파일을 사용하는 방식**

```
competitors.txt 파일을 읽어줘.
파일 안의 각 회사에 대해 별도 서브에이전트를 사용해서 병렬로 조사해줘.

각 회사에 대해 다음 정보를 수집해줘:
1. 요금제 종류 (Free / Pro / Business / Enterprise 등)
2. 각 요금제 월 금액 (USD 기준, 연간 결제 기준)
3. 무료 플랜 여부와 제한 사항
4. 핵심 기능 3가지
5. 주요 타깃 고객 (홈페이지 메인 카피 기준)

모든 조사가 완료되면 결과를 하나의 표로 정리해서
competitor_analysis.md 파일로 저장해줘.
조사 날짜도 파일 상단에 표시해줘.
```

**프롬프트 2 — 파일 없이 목록을 직접 넣는 방식**

파일 준비가 번거롭다면 목록을 프롬프트 안에 바로 입력해도 된다.

```
다음 8개 회사의 가격 페이지를 별도 서브에이전트를 사용해서 동시에 탐색해줘.

- Notion (https://www.notion.so/pricing)
- Asana (https://asana.com/pricing)
- Monday.com (https://monday.com/pricing)
- ClickUp (https://clickup.com/pricing)
- Basecamp (https://basecamp.com/pricing)
- Linear (https://linear.app/pricing)
- Todoist (https://todoist.com/pricing)
- Trello (https://trello.com/pricing)

각 사이트에서 수집할 정보:
1. 요금제 종류와 월 금액 (USD, 연간 결제 기준)
2. 무료 플랜 여부
3. 홈페이지 메인 문구(tagline) 1줄

수집이 완료되면 마크다운 표 형식으로 정리해서
competitor_pricing.md 파일로 저장해줘.
```

Enter를 누르면 Claude Code가 서브에이전트를 생성하고 각각 사이트 탐색을 시작한다.

---

## 6. 진행 과정 확인

실행 중 터미널에 다음과 같은 메시지가 나타난다.

```
Spawning 8 sub-agents for parallel research...

[Agent 1] Visiting notion.so/pricing...
[Agent 2] Visiting asana.com/pricing...
[Agent 3] Visiting monday.com/pricing...
[Agent 4] Visiting clickup.com/pricing...
...

[Agent 1] Notion: Free / Plus $16 / Business $15... ✓
[Agent 3] Monday.com: Free / Basic $12 / Standard $14... ✓
[Agent 2] Asana: Personal (Free) / Starter $13.49... ✓
...

All agents complete. Compiling results...
Saving competitor_pricing.md... Done.
```

순차 처리였다면 사이트당 평균 2~3분, 8개면 최소 16~24분이 걸린다. 병렬 처리 시 가장 오래 걸리는 에이전트 하나의 시간, 즉 2~4분 내에 완료된다.

---

## 7. 결과물 확인 및 활용

생성된 `competitor_pricing.md`를 열면 다음과 같은 형태로 정리돼 있다.

```markdown
# 경쟁사 가격 비교표
조사 날짜: 2026-05-14

| 회사 | Free 플랜 | 기본 유료 플랜 | 비즈니스 플랜 | 주요 특징 | 타깃 메시지 |
|---|---|---|---|---|---|
| Notion | ✓ (개인) | Plus $16/월 | Business $15/월* | 올인원 워크스페이스, AI 기능 내장 | "Write, plan, organize. All in one place." |
| Asana | ✓ (최대 10명) | Starter $13.49/월 | Advanced $30.49/월 | 프로젝트 타임라인, 자동화 | "Work smarter. Reach your goals faster." |
| Monday.com | ✓ (최대 2명) | Basic $12/좌석 | Standard $14/좌석 | 시각적 보드, 100+ 통합 | "Where teamwork gets done." |
...

*연간 결제 기준. 월간 결제 시 20~30% 높음.
```

이 파일을 엑셀에서 열거나, 팀 보고서에 그대로 붙여넣을 수 있다.

---

## 8. 심화 시나리오 — 더 깊이 파고드는 프롬프트

기본 가격 조사 외에도 다양한 리서치 작업에 같은 방식을 쓸 수 있다.

**고객 후기 수집**

```
다음 5개 회사의 G2 또는 Capterra 리뷰 페이지를 
각각 서브에이전트로 동시에 방문해줘.

각 회사에 대해 수집할 정보:
1. 전체 평점 (별점)
2. 최근 리뷰 3개의 핵심 내용 (긍정 / 부정)
3. 가장 많이 언급되는 장점과 단점 각 2개

결과를 customer_reviews.md로 저장해줘.

- Notion G2: https://www.g2.com/products/notion/reviews
- Asana G2: https://www.g2.com/products/asana/reviews
- Monday G2: https://www.g2.com/products/monday-com/reviews
- ClickUp G2: https://www.g2.com/products/clickup/reviews
- Linear G2: https://www.g2.com/products/linear/reviews
```

**채용 공고로 회사 전략 파악**

```
다음 5개 회사의 채용 페이지를 서브에이전트로 동시에 탐색해줘.
각 회사가 현재 어떤 직무를 가장 많이 채용 중인지 파악하고,
이를 통해 각 회사가 지금 어느 방향에 투자하고 있는지 추론해줘.

결과를 hiring_signals.md로 저장해줘.

- Notion 채용: https://www.notion.so/about#open-roles
- Asana 채용: https://asana.com/jobs
- Monday.com 채용: https://monday.com/jobs
- ClickUp 채용: https://clickup.com/careers
- Linear 채용: https://linear.app/careers
```

**언론 보도 동향 파악**

```
웹서치를 사용해서 다음 5개 회사의 최근 3개월 주요 뉴스를 조사해줘.
각 회사를 별도 서브에이전트로 처리해줘.

수집할 내용:
1. 최근 3개월 내 주요 뉴스 제목 3개
2. 제품 업데이트 또는 신기능 발표 여부
3. 투자 유치, 인수합병 등 비즈니스 이슈

결과를 news_monitoring.md로 저장해줘.
회사 목록: Notion, Asana, Monday.com, ClickUp, Linear
```

---

## 9. 실전 프롬프트 모음 — 직군별

**마케터 — 경쟁사 콘텐츠 전략 분석**

```
다음 5개 회사의 블로그 또는 콘텐츠 허브를 서브에이전트로 동시에 방문해줘.
각 회사의 최근 블로그 글 5개 제목과 주제 카테고리를 수집하고
어떤 키워드와 토픽에 집중하고 있는지 정리해서 content_strategy.md로 저장해줘.
```

**영업 담당 — 잠재 고객사 사전 조사**

```
미팅 전 다음 3개 회사에 대해 서브에이전트로 동시에 사전 조사를 해줘.
각 회사의 홈페이지와 최근 뉴스를 탐색해서 다음을 정리해줘:
1. 주요 사업 영역과 제품/서비스
2. 최근 6개월 이슈 또는 변화 사항
3. 예상 페인포인트 (우리 제품이 도움이 될 수 있는 영역)
결과를 pre_meeting_brief.md로 저장해줘.

회사 목록:
- A사: https://...
- B사: https://...
- C사: https://...
```

**HR 담당 — 업계 연봉 벤치마크**

```
다음 직무의 연봉 정보를 잡플래닛, 크레딧잡, 링크드인에서 서브에이전트로 동시에 조사해줘.
직무: 데이터분석가, UX디자이너, 마케터 (경력 3~5년 기준)
수집 항목: 업계 평균 연봉, 상위 25% 연봉, 주요 복리후생 트렌드
결과를 salary_benchmark.md로 저장해줘.
```

---

## 10. 자주 하는 실수와 해결법

**"사이트를 읽을 수 없습니다" 오류가 일부 에이전트에서 발생할 때**

일부 사이트는 자동화된 탐색을 차단한다. 이 경우 해당 회사만 수동으로 확인하고, 나머지 결과는 그대로 사용한다. 프롬프트에 "접근이 차단된 사이트는 건너뛰고 가능한 사이트만 처리해줘"라고 추가하면 오류 없이 진행된다.

**결과 정보가 오래됐거나 부정확해 보일 때**

웹서치 기능이 비활성화됐거나 캐시된 정보를 읽은 경우다. 프롬프트에 "오늘 날짜 기준 실시간 정보를 기반으로 조사해줘. 사이트를 직접 방문해서 확인해줘"라는 문장을 추가한다.

**파일이 생성됐는데 일부 회사 정보가 비어있을 때**

해당 회사 서브에이전트가 시간 초과됐거나 사이트 구조가 복잡해서 정보를 찾지 못한 경우다. 비어있는 회사만 대상으로 프롬프트를 다시 실행한다.

```
competitor_pricing.md 파일을 읽어줘.
정보가 비어있거나 불완전한 회사만 찾아서
해당 사이트를 다시 방문해서 누락된 정보를 채워줘.
```

**이전 세션을 이어서 추가 조사하고 싶을 때**

```bash
claude --resume
```

이전 결과 파일이 있는 상태에서 추가 항목을 요청하면 기존 파일에 내용을 더해준다.

---

## 11. ChatGPT와 무엇이 다른가

| 상황 | ChatGPT | Claude Code |
|---|---|---|
| 조사 방식 | 학습 데이터 기반 (실시간 아님) | 실제 사이트 실시간 탐색 |
| 여러 회사 동시 조사 | 한 번에 하나씩 순차 처리 | 서브에이전트로 동시 병렬 처리 |
| 소요 시간 (8개사) | 30분 이상 | 3~5분 |
| 결과물 저장 | 직접 복사 필요 | 파일 자동 저장 |
| 정보 최신성 | 학습 시점 기준 | 조사 당일 기준 |

네 편에 걸쳐 살펴본 Claude Code 활용의 공통점이 있다. **내가 반복해서 하던 일을 Claude Code에 위임하는 것**이다. 폴더 읽기, 파일 수정, 자동 스케줄링, 그리고 이번 편의 병렬 리서치까지. 이 네 가지를 조합하면 하루 업무의 상당 부분이 자동화되는 구조가 만들어진다.

---

> 📌 **다음 편 예고**  
> 5편: "PDF 100페이지를 5분 만에 실무 자료로" — 문서 변환 파이프라인

---

`#ClaudeCode` `#AI리서치자동화` `#경쟁사분석` `#병렬에이전트` `#AI업무자동화` `#비개발자AI활용` `#생성형AI`