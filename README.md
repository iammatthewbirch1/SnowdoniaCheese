# Snowdonia Cheese project
Here is my submission for the Snowdonia Cheese website designed by e3creative. 
I chose to do the 'Desktop 3' layout, as I felt as though I could demonstrate more development knowledge with it's form-factor.

# Instructions
## Option 1 (testing)
Download Zip, which will include both src and dist folders, usually I would gitignore the dist, however I wanted to make this easier for initial setup.\
Decompress and open index.html in Chrome.
## Option 2 (development)
To clone the file\
	Run: `git clone https://github.com/iammatthewbirch1/SnowdoniaCheese.git`\
Delete the dist folder and then open command prompt on the file path and install the package dependencies\
	Run: `npm install`\
To begin development, and initialize browser-sync\
	Run: `gulp`\
Other gulp processes include\
	A process which does not minify the javascript, so you can debug: `gulp dev`\
	And one that doesn't build but initialises browser sync: `gulp browser-sync`