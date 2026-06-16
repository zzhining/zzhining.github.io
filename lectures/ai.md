---
layout: page
title: AI 강의자료 (IPA)
permalink: /lectures/ai/
---

<h1>AI 강의자료</h1>
<p>IPA 기반 AI 실무 커리큘럼입니다. AI 기초부터 모델 배포, 보안·윤리, 차세대 AI 기법까지 11개 모듈로 구성되어 있습니다.</p>

{% assign all_lectures = site.lectures_ai | sort: "module" %}

{% assign modules = "01|AI 기초 및 개요,02|생성형 AI 활용,03|데이터 엔지니어링 및 관리,04|AI 인프라 및 플랫폼,05|모델 개발,06|모델 배포 및 운영,07|애플리케이션 통합,08|보안 윤리 및 거버넌스,09|프로젝트,10|차세대 AI 기법 (지속가능성),11|차세대 AI 기법 (연합학습)" | split: "," %}

{% for mod in modules %}
  {% assign parts = mod | split: "|" %}
  {% assign mod_num = parts[0] %}
  {% assign mod_name = parts[1] %}
  {% assign mod_lectures = all_lectures | where: "module", mod_num | sort: "series_order" %}
  {% if mod_lectures.size > 0 %}
<div class="lecture-module">
  <h2 class="module-title">{{ mod_num }}. {{ mod_name }}</h2>
  <div class="lecture-grid">
    {% for lecture in mod_lectures %}
    <a class="lecture-card" href="{{ lecture.url | relative_url }}">
      <div class="lecture-card-body">
        <h3 class="lecture-card-title">{{ lecture.title }}</h3>
        {% if lecture.description %}<p class="lecture-card-desc">{{ lecture.description }}</p>{% endif %}
      </div>
    </a>
    {% endfor %}
  </div>
</div>
  {% endif %}
{% endfor %}
