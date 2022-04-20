# Authoring README 

Writing essays for the project can include a few different items to help with including interactive elements. Right now this includes a fly-to interaction, figures and captions, and footnotes.

**Fly-to interaction**: 

One of the key interactive components of the map is the ability to fly readers to specific locations in the map when they click on text in the essay. The text you wish to have be interactive should be wrapped in the following `<span>` tags and must include at a minimum the `data-lat` (latitude) and `data-lon` (longitude). Optionally, you may include a [zoom level](https://docs.mapbox.com/help/glossary/zoom-level/). If no zoom level is provided, the view will default to the initial zoom level set by the map.

```html
... narrative text that includes <span class="notation" data-id="1" data-zoom="18" data-lat="36.852267" data-lon="-76.291544">old Larchmont School on Hampton Boulevard as a possible site</span> that then continues on.
```

Find lat/lon with [bboxfinder](http://bboxfinder.com/#0.000000,0.000000,0.000000,0.000000).

**Figures**: 

For including figures, the following shortcode is used. The shortcode contains a unique ID for the image (`image1`, `image2`, etc), the name of the image, and the caption. The images for a particular essay must be contained in the `content/visualizations/essay-name` folder with the essay document.

```html
{{< figure id="image1" image="image.jpg" caption="Figure 1. Caption text." >}}
```

**Audio**: 

For including audio, the following shortcode is used. The shortcode contains a unique ID for the audio (`clip1`, `clip2`, etc), the name of the image, and the caption. The images for a particular essay must be contained in the `content/visualizations/essay-name` folder with the essay document.

```html
{{< audio id="clip1" src="image.jpg" caption="Caption text." >}}
```

**Footnotes**:

Footnote references can appear either at the end of the document or after the paragraph where the reference is contained.

```md
Narrative text goes here followed by a notation for the footnote.[^1]

[^1]: Author. *[Source](digitalcommons.odu.edu)*, Publisher, Place, 1980.
```