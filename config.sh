#! /bin/bash

echo 'init and update git submodules'
git submodule update --init --recursive

echo 'get the directory where the repo was cloned'
DIR=`git rev-parse --show-toplevel`
OSX_DIR=$DIR'/osx'
LINUX_DIR=$DIR'/linux'

echo 'init powerline fonts'
source $DIR/powerline-fonts/install.sh

echo 'os-specific config'

if [[ "$OSTYPE" == "linux-gnu" ]]; then
	ln -s $DIR/.linux_aliases ~
	source $LINUX_DIR/linux.sh
elif [[ "$OSTYPE" == "darwin"* ]]; then
	source $OSX_DIR/osx.sh
# elif [[ "$OSTYPE" == "cygwin" ]]; then
# elif [[ "$OSTYPE" == "msys" ]]; then
# elif [[ "$OSTYPE" == "win32" ]]; then
# elif [[ "$OSTYPE" == "freebsd"* ]]; then
# else
fi

echo 'set up vim'
source $DIR/config_vim.sh
echo 'set up zsh'
source $DIR/config_zsh.sh

echo 'set up links for config files'
ln -s $DIR/.aliases ~
ln -s $DIR/.bashrc ~
ln -s $DIR/git/.gitconfig ~
ln -s $DIR/.tmux.conf ~
#ln -s $DIR/zsh/.zshrc ~

echo 'npm install where necessary'
cd $DIR/vim/.vim/bundle/tern_for_vim && npm i
