#! /bin/bash

# init and update git submodules
git submodule init;
git submodule update;

# get the directory where the repo was cloned 
DIR=`git rev-parse --show-toplevel`;
OSX_DIR=$DIR'/osx'

# set up links to submodule directories
ln -s $DIR/vim/.vim ~
ln -s $DIR/zsh/oh-my-zsh ~

# os-specific config

if [[ "$OSTYPE" == "linux-gnu" ]]; then
	ln -s $DIR/.linux_aliases ~
elif [[ "$OSTYPE" == "darwin"* ]]; then
	source $OSX_DIR/osx.sh
# elif [[ "$OSTYPE" == "cygwin" ]]; then
# elif [[ "$OSTYPE" == "msys" ]]; then
# elif [[ "$OSTYPE" == "win32" ]]; then
# elif [[ "$OSTYPE" == "freebsd"* ]]; then
# else
fi

# set up links for config files
ln -s $DIR/.aliases ~
ln -s $DIR/.bashrc ~
ln -s $DIR/git/.gitconfig ~
ln -s $DIR/.tmux.conf ~
ln -s $DIR/vim/.vimrc ~
ln -s $DIR/zsh/.zshrc ~

# npm install where necessary
cd $DIR/vim/.vim/bundle/tern_for_vim && npm i
