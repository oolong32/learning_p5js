#!

# create new p5.js project

# set argument to variable name
if test $1
then
	name=$1
else
	name=`date "+%Y%m%d"`_test
fi

# make instance of "empty" project, set name to argument
cp -r ~/p5js/code/empty $name
ln -s ~/p5js/code/libraries ${name}/libraries 

echo "Right on, madam/sir. Your new p5.js project is ready."
