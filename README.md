# Mapping the University

This repository contains the website for the Mapping the University project at the [Roy Rosenzweig Center for History and New Media](https://rrchnm.org).

## Installing

The website is built using Hugo, a static site generator. Follow the [installation instructions](https://gohugo.io/getting-started/installing/) for your platform. 

It also uses Node/npm for JavaScript dependencies. You will need to have those installed for your system.

Then run `npm install` in order to install the dependencies.

## Bundling and visualizations

Hugo handles bundling and minification of JavaScript and CSS. Each visualization for the site gets its own directory in `assets/viz/`. All assets related to a visualization should go in there, including CSS. There should be a single JavaScript entry point, usually named `main.js` for each visualization. Those entry points should be added to the YAML header of an individual visualization's page (for example, `script: viz/catholic-dioceses/main.js`).

The visualizations will be compiled as a part of the build steps defined in the `Makefile`.

## Previewing 

The `Makefile` contains rules for previewing, building, and deploying the site.

To preview the site locally, including draft and future content, you need to have two commands running: `make preview` which will run Hugo, and `make watchcss` to watch for changes to the CSS files. Because of Tailwind's JIT changes, you'll need to recompile anytime changes are made to CSS files.

To build for production, run `make build` (which will compile the CSS and minify the site) and to deploy run `make deploy`.