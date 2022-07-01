---
title: "Building Footprints of Old Dominion University"
date: 2022-06-09
updated: 2022-06-09
author: "Jason Heppler"
abstract: "This map displays the footprints of buildings on the Old Dominion University campus from its founding to the present day."
script: maps/odu-footprints/main.js
styles: maps/odu-footprints/style.css
layout: maps
thumbnail: odu_footprints.png
thumbdesc: "A screenshot showing..."
---

This map displays the footprints of buildings on the Old Dominion University campus from its founding to the present day. It provides a visualization of the gradual expansion of the campus over time. 

**Click Play to watch how the campus expanded over time, or drag the time slider to a certain year to see the buildings that existed on campus during that year. Click on a building to view its name and year of construction.**

<div class="cell">
    <label for="year-slider" id="year-range" class="timeline-label" style="font-size: 1.8rem;">1930-2021</label>
    <label for="year-start" class="timeline-label float-left">1930</label>
    <label for="year-end" class="timeline-label float-right">2021</label>
    <input id="year-slider"
        type="range" 
        min="1930" 
        max="2021"
        step="1" 
        value="0"
        oninput="document.getElementById('year-range').innerHTML = this.value;"
        class="w-3/4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
</div>
<div class="flex justify-center rounded-lg text-lg mb-4" role="group">
    <button id="playTimeline" class="bg-sky-600 text-white active:bg-sky-800 hover:bg-sky-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Play</button>
    <button id="resetTimeline" class="bg-sky-600 text-white active:bg-sky-800 hover:bg-sky-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 inline-block" type="button">Reset</button>
</div>

<div id="visualization" style="height:500px; width:100%; margin-bottom: 2em;"></div>

## Suggested citation

Please use the following as a suggested citation:

{{< citation >}}