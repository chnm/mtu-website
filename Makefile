watchcss :
	# the new JIT feature of TailwindCSS 3 makes using it in Hugo slightly harder. 
	# We have to run this in a separate process.
	npx tailwindcss -i ./assets/css/app.scss -o ./assets/css/app.css --watch

convertimages : 
	# convert images to jpg 
	mogrify -format jpg *.HEIC

preview :
	@echo "Serving the preview site with Hugo ..."
	hugo serve --buildDrafts --buildFuture --disableFastRender 

build-prod :
	@echo "\nBuilding the site ..."
	npx tailwindcss -i ./assets/css/app.scss -o ./assets/css/app.css
	hugo --cleanDestinationDir --minify
	@echo "Website finished building."