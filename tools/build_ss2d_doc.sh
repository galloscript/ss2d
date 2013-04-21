#!/bin/bash

cd jsdoc-toolkit
java -jar jsrun.jar app/run.js -a -r=6 -E="libs" -t=templates/jsdoc  ../../ss2d.js/src/
