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
TMUX_DIR=`pwd`/tmuxconf
ln -s $TMUX_DIR/.tmux.conf ~
ln -s $TMUX_DIR/.tmux ~

echo ''
echo 'set up zsh'
ZSH_DIR=`pwd`/zsh
# link prezto
ln -s $ZSH_DIR/.zprezto ~
# link internal prezto conf
ln -s $ZSH_DIR/.zprezto/runcoms/zlogin ~/.zlogin
ln -s $ZSH_DIR/.zprezto/runcoms/zprofile ~/.zprofile
# link custom config
ln -s $ZSH_DIR/.zpreztorc ~
ln -s $ZSH_DIR/.zshrc ~

echo ''
echo 'set up links for config files'
ln -s $DIR/git/.gitconfig ~
ln -s $DIR/.npmrc ~

echo ''
echo 'update npm'
npm install -g npm@latest
