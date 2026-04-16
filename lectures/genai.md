---
layout: page
title: GenAI
permalink: /lectures/genai/
---

<h1>GenAI Lectures</h1>
<p>생성형 AI 관련 강의 자료입니다.</p>

{% assign lectures = site.lectures_genai | sort: "date" | reverse %}
{% if lectures.size > 0 %}
<ul class="post-list">
  {% for lecture in lectures %}
  <li>
    <a class="post-title" href="{{ lecture.url | relative_url }}">{{ lecture.title }}</a>
    {% if lecture.date %}<div class="post-date">{{ lecture.date | date: "%Y-%m-%d" }}</div>{% endif %}
    {% if lecture.description %}<p class="post-desc">{{ lecture.description }}</p>{% endif %}
  </li>
  {% endfor %}
</ul>
{% else %}
<p>아직 강의 자료가 없습니다.</p>
{% endif %}
