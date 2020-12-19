#! /bin/bash

echo ''
echo 'init and update git submodules'
git submodule update --init --recursive

echo ''
echo 'get the directory where the repo was cloned'
DIR=`git rev-parse --show-toplevel`

echo ''
echo 'os-specific config'
if [[ "$OSTYPE" == "linux-gnu" ]]; then
	LINUX_DIR=$DIR'/linux'
	ln -s $LINUX_DIR/.linux_aliases ~
	ln -s $LINUX_DIR/.tmux.conf.linux ~/.tmux.conf.local
	source $LINUX_DIR/linux.sh
elif [[ "$OSTYPE" == "darwin"* ]]; then
	MACOS_DIR=$DIR'/macos'
	ln -s $MACOS_DIR/.tmux.conf.macos ~/.tmux.conf.local
	source $MACOS_DIR/macos.sh
fi

echo 'set up node'
echo ''
rm $HOME/.npmrc
ln -s $DIR/.npmrc $HOME/.npmrc
mkdir $HOME/npm

echo ''
echo 'update npm'
npm install -g npm@latest

echo ''
echo 'set up tmux'
cd $DIR/tmuxconf && $DIR/tmuxconf/install.sh

echo ''
echo 'set up vim'
cd $DIR/vimrc && $DIR/vimrc/install.sh

echo ''
echo 'set up zsh'
cd $DIR/zsh && $DIR/zsh/install.sh

echo ''
echo 'set up links for config files'
ln -s $DIR/git/.gitconfig ~
ln -s $DIR/.npmrc ~

echo ''
echo 'update npm'
npm install -g npm@latest
