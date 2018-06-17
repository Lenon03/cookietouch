# install the plugins and build the static site
cd src && gitbook install && gitbook build

# copy the static site files into the current directory.
cd .. && cp -R src/_book/* .

# remove 'node_modules' and '_book' directory
git clean -fx node_modules
git clean -fx src/_book
