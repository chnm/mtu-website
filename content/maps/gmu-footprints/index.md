---
title: "Building Footprints of George Mason University"
date: 2022-05-31
updated: 2022-05-31
author: "Jason Heppler"
abstract: "This map displays the footprints of buildings on the George Mason University campus from its founding to the present day."
script: maps/gmu-footprints/main.js
styles: maps/gmu-footprints/style.css
layout: maps
thumbnail: gmu_footprints.png
thumbdesc: "A screenshot showing..."
---

This map displays the footprints of buildings on the George Mason University campus from its founding to the present day. It provides a visualization of the gradual expansion of the campus over time. 

**Click Play to watch how the campus expanded over time, or drag the time slider to a certain year to see the buildings that existed on campus during that year. Click on a building to view its name and year of construction.**

<div class="cell">
    <label for="year-slider" id="year-range" class="timeline-label" style="font-size: 1.8rem;">1960-2021</label>
    <label for="year-start" class="timeline-label float-left">1960</label>
    <label for="year-end" class="timeline-label float-right">2021</label>
    <input id="year-slider"
        type="range" 
        min="1960" 
        max="2021"
        step="1" 
        value="0"
        oninput="document.getElementById('year-range').innerHTML = this.value;"
        class="w-3/4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
</div>
<div class="flex justify-center rounded-lg text-lg mb-4" role="group">
    <button id="playTimeline" class="bg-sky-600 text-white active:bg-sky-600 hover:bg-sky-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Play</button>
    <button id="resetTimeline" class="bg-sky-600 text-white active:bg-sky-600 hover:bg-sky-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 inline-block" type="button">Reset</button>
</div>

<div id="visualization" style="height:500px; width:100%; margin-bottom: 2em;"></div>


## Suggested citation

Please use the following as a suggested citation:

{{< citation >}}