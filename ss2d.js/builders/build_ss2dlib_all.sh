#!/bin/bash

./build_ss2dlib.sh
./build_ss2dlib_client.sh
./build_ss2dlib_server.sh

./build_ss2dlib.sh -min
./build_ss2dlib_client.sh -min
./build_ss2dlib_server.sh -min
