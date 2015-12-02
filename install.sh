#! /bin/bash

echo ''
echo 'init and update git submodules'
git submodule update --init --recursive

echo ''
echo 'get the directory where the repo was cloned'
DIR=`git rev-parse --show-toplevel`

echo ''
echo 'init powerline fonts'
source $DIR/powerline-fonts/install.sh

./install-os.sh
./install-config.sh
