---
layout: page
title: Data
permalink: /lectures/data/
---

<h1>Data Lectures</h1>
<p>데이터 분석 관련 강의 자료입니다.</p>

{% assign lectures = site.lectures_data | sort: "date" | reverse %}
{% if lectures.size > 0 %}
<div class="lecture-grid">
  {% for lecture in lectures %}
  <a class="lecture-card" href="{{ lecture.url | relative_url }}">
    <div class="lecture-card-image">
      <img src="{% if lecture.image %}{{ lecture.image | relative_url }}{% else %}{{ '/assets/image/gemini_image.png' | relative_url }}{% endif %}" alt="{{ lecture.title }}">
    </div>
    <div class="lecture-card-body">
      <h3 class="lecture-card-title">{{ lecture.title }}</h3>
      {% if lecture.description %}<p class="lecture-card-desc">{{ lecture.description }}</p>{% endif %}
      {% if lecture.date %}<span class="lecture-card-date">{{ lecture.date | date: "%Y-%m-%d" }}</span>{% endif %}
    </div>
  </a>
  {% endfor %}
</div>
{% else %}
<p>아직 강의 자료가 없습니다.</p>
{% endif %}
