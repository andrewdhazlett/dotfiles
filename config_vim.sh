#! /bin/sh
# TODO: differentiate 'full' and 'light' configs

OLD_DIR=`pwd`
VIM_DIR=$DIR'/vim'
PATHOGEN_DIR=$VIM_DIR'/.vim/bundle'

echo 'VIM: update submodules and install dependencies'
cd $PATHOGEN_DIR && git submodule update --init --recursive 

echo 'VIM: set up tern'
TERN_DIR=$PATHOGEN_DIR/'tern_for_vim'
cd $TERN_DIR && npm install
# link default project configuration
ln -s $VIM_DIR/.tern_project $TERN_DIR/node_modules/tern/defs

# TODO: ensure sufficient vim version and other deps before building YouCompleteMe
echo 'VIM: build YouCompleteMe'
# see https://github.com/Valloric/YouCompleteMe#full-installation-guide
YCM_BUILD_DIR=$VIM_DIR'/ycm_build'
YCM_DIR=$PATHOGEN_DIR'/YouCompleteMe'
cmake -G "Unix Makefiles" $YCM_BUILD_DIR $YCM_DIR/third_party/ycmd/cpp

# TODO: refactor
cd $YCM_BUILD_DIR
make ycm_support_libs

echo 'VIM: symlink to home dir'
ln -s $DIR/vim/* ~

# return to OLD_DIR
cd $OLD_DIR
