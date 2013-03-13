#!/bin/bash

#SS2D
SS2DRootPath="../../../";
SS2DSourcePath=${SS2DRootPath}"ss2d.js/src/";
ClosureLibraryPath=${SS2DRootPath}"tools/closure-library/";
CompilerPath=${SS2DRootPath}"tools/closure-compiler.jar";
externsPath=${SS2DRootPath}"tools/externs/";

#Game
GameSourcePath="../src";
GameNamespace="phys.server"
deployTarget="../serverApp/physserver.js";

args=("$@")

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
	--compiler_flags="--externs=${externsPath}http.js" \
	--compiler_flags="--define=RENDER_CONTEXT='2d'" \
	--compiler_flags="--define=COMPILING_CLIENT=false" \
	--compiler_flags="--define=COMPILING_SERVER=true" \
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
	--compiler_flags="--externs=${externsPath}http.js" \
	--compiler_flags="--define=RENDER_CONTEXT='2d'" \
	--compiler_flags="--define=COMPILING_CLIENT=false" \
	--compiler_flags="--define=COMPILING_SERVER=true" \
	--compiler_flags="--define=COMPILING_OFFLINE=false" \
	--compiler_flags="--output_wrapper=(function(){%output%})();" \
	> ${deployTarget}
fi
