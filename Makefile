
preview :
	@echo "Serving the preview site with Hugo ..."
	hugo serve --buildDrafts --buildFuture --disableFastRender 

build-prod :
	@echo "\nBuilding the site ..."
	hugo --cleanDestinationDir --minify
	@echo "Website finished building."