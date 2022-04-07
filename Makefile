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
	hugo --cleanDestinationDir --minify --baseURL https://scholarship.rrchnm.org/mtu
	@echo "Website finished building."

deploy : build-prod
	@echo "\nDeploying the site to dev with rsync ..."
	rsync --delete --itemize-changes --omit-dir-times \
		--checksum -avz --no-t --no-perms --exclude-from=rsync-excludes \
		public/ chnmdev:/websites/scholarship/mtu/ | egrep -v '^\.'
	@echo "Finished deploying the site to dev with rsync."

.PHONY : preview watchcss build-prod deploy