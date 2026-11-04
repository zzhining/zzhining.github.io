---
layout: page
title: Python 강의자료
permalink: /lectures/python/
---

<h1>데이터사이언스를 위한 Python 기초</h1>
<p>Google Colab 환경에서 Python 기초, Pandas 데이터 처리, 112 신고 치안데이터 실습까지 배우는 17개 문서 커리큘럼입니다.</p>

{% assign all_lectures = site.lectures_python | sort: "series_order" %}

{% assign part_names = "Part 0. 실습 환경|Part 1. Python 기초|Part 2. Pandas 데이터 처리|Part 3. 치안데이터 실습" | split: "|" %}
{% for part_name in part_names %}
{% assign idx = forloop.index0 %}
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
