#!/bin/bash

#SS2D
SS2DRootPath="../../";
SS2DSourcePath=${SS2DRootPath}"ss2d.js/src/";
ClosureLibraryPath=${SS2DRootPath}"tools/closure-library/";
CompilerPath=${SS2DRootPath}"tools/closure-compiler.jar";
externsPath=${SS2DRootPath}"tools/externs/";

args=("$@")

if [[ ${args[0]} == "-min" ]]
then
	deployTarget="../lib/ss2dLib-server-min.js";
	python ${ClosureLibraryPath}closure/bin/build/closurebuilder.py \
	--root=${ClosureLibraryPath} \
	--root=${SS2DSourcePath} \
	--namespace=ss2dLib \
	--output_mode=compiled \
	--compiler_jar=${CompilerPath} \
	--compiler_flags="--define=RENDER_CONTEXT='2d'" \
	--compiler_flags="--define=COMPILING_CLIENT=false" \
	--compiler_flags="--define=COMPILING_SERVER=true" \
	--compiler_flags="--define=COMPILING_OFFLINE=false" \
	--compiler_flags="--define=COMPILING_ADVANCE=false" \
	--compiler_flags="--output_wrapper=var ss2d=ss2d||{}; %output%" \
	> ${deployTarget}
else
	deployTarget="../lib/ss2dLib-server.js";
	python ${ClosureLibraryPath}closure/bin/build/closurebuilder.py \
	--root=${ClosureLibraryPath} \
	--root=${SS2DSourcePath} \
	--namespace=ss2dLib \
	--output_mode=compiled \
	--compiler_jar=${CompilerPath} \
	--compiler_flags="--formatting=pretty_print" \
	--compiler_flags="--define=RENDER_CONTEXT='2d'" \
	--compiler_flags="--define=COMPILING_CLIENT=false" \
	--compiler_flags="--define=COMPILING_SERVER=true" \
	--compiler_flags="--define=COMPILING_OFFLINE=false" \
	--compiler_flags="--define=COMPILING_ADVANCE=false" \
	--compiler_flags="--output_wrapper=var ss2d=ss2d||{}; %output%" \
	> ${deployTarget}
fi

mv ${deployTarget} ${deployTarget}"_backup"
echo "/**"  > ${deployTarget}
echo "* @fileoverview SmoothStep2D Lib" >> ${deployTarget} 
echo "* @copyright David Gallardo Moreno (portalg@gmail.com)" >> ${deployTarget}
echo "*/" >> ${deployTarget}
cat ${deployTarget}"_backup" >> ${deployTarget}
rm  ${deployTarget}"_backup"
