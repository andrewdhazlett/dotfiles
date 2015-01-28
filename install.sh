#! /bin/bash

echo 'init and update git submodules'
git submodule update --init --recursive

echo 'get the directory where the repo was cloned'
DIR=`git rev-parse --show-toplevel`
OSX_DIR=$DIR'/osx'
LINUX_DIR=$DIR'/linux'

echo 'init powerline fonts'
source $DIR/powerline-fonts/install.sh

echo ''
echo 'os-specific config'
if [[ "$OSTYPE" == "linux-gnu" ]]; then
	ln -s $DIR/linux/.linux_aliases ~
	source $LINUX_DIR/linux.sh
elif [[ "$OSTYPE" == "darwin"* ]]; then
	source $OSX_DIR/osx.sh
fi

echo ''
echo 'set up vim'
cd $DIR/vimrc && $DIR/vimrc/install.sh

echo ''
echo 'set up zsh'
cd $DIR/zsh && $DIR/zsh/install.sh

echo 'set up links for config files'
ln -s $DIR/git/.gitconfig ~
ln -s $DIR/.tmux.conf ~

echo 'npm install where necessary'
cd $DIR/vim/.vim/bundle/tern_for_vim && npm i