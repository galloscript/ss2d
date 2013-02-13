#!/bin/bash

#clone or update the Google Closure Library
if [ -d ./closure-library ]
then
	cd closure-library
	git checkout -- ./
	cd ..
else
	git clone http://code.google.com/p/closure-library/
fi

#remove previous version of the downloaded compiler
if [ -f ./closure-compiler.jar ]
then
    rm closure-compiler.jar
fi

#download the lastest Googloe Closure Compiler
curl -O http://closure-compiler.googlecode.com/files/compiler-latest.zip

#unzip the compiler
unzip compiler-latest.zip compiler.jar

#remove the zip file
rm compiler-latest.zip

#rename compiler
mv compiler.jar closure-compiler.jar
