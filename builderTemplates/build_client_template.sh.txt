#!/bin/bash

#SS2D
SS2DRootPath="/PATH/TO/SS2D/ROOT/";
SS2DSourcePath=${SS2DRootPath}"ss2d.js/src/";
ClosureLibraryPath=${SS2DRootPath}"tools/closure-library/";
CompilerPath=${SS2DRootPath}"tools/closure-compiler.jar";
externsPath=${SS2DRootPath}"tools/externs/";

#Game
GamePath="/PATH/TO/YOUR/PROJECT/ROOT/";
GameSourcePath=${GamePath}"src/";
GameNamespace="sample.client"
deployTarget=${GamePath}"clientApp/js/sample_client.js";

compilationMode="";
args=("$@")

# -d for debug output
if [[ ${args[0]} == "-d" ]]
then
	python ${ClosureLibraryPath}closure/bin/build/closurebuilder.py \
	--root=${ClosureLibraryPath} \
	--root=${SS2DSourcePath} \
	--root=${GameSourcePath} \
	--namespace=${GameNamespace} \
	--output_mode=compiled \
	--compiler_jar=${CompilerPath} \
	--compiler_flags="--formatting=pretty_print" \
	--compiler_flags="--externs=${externsPath}webkit_webaudio.js" \
	--compiler_flags="--externs=${externsPath}webaudio.js" \
	--compiler_flags="--define=RENDER_CONTEXT='2d'" \
	--compiler_flags="--define=COMPILING_CLIENT=true" \
	--compiler_flags="--define=COMPILING_SERVER=false" \
	--compiler_flags="--define=COMPILING_OFFLINE=false" \
	> ${deployTarget}
else
	python ${ClosureLibraryPath}closure/bin/build/closurebuilder.py \
	--root=${ClosureLibraryPath} \
	--root=${SS2DSourcePath} \
	--root=${GameSourcePath} \
	--namespace=${GameNamespace} \
	--output_mode=compiled \
	--compiler_jar=${CompilerPath} \
	--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
	--compiler_flags="--externs=${externsPath}webkit_webaudio.js" \
	--compiler_flags="--externs=${externsPath}webaudio.js" \
	--compiler_flags="--define=RENDER_CONTEXT='2d'" \
	--compiler_flags="--define=COMPILING_CLIENT=true" \
	--compiler_flags="--define=COMPILING_SERVER=false" \
	--compiler_flags="--define=COMPILING_OFFLINE=false" \
	--compiler_flags="--output_wrapper=(function(){%output%})();" \
	> ${deployTarget}
fi
