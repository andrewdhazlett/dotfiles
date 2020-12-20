#! /bin/bash

git submodule update --init --recursive

DIR=`git rev-parse --show-toplevel`

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

links=(
	$DIR/.npmrc
	$DIR/.tmux
	$DIR/.tmux.conf
	$DIR/.zprezto
	$DIR/zsh/.zpreztorc
	$DIR/zsh/.zshrc
	$DIR/git/.gitconfig
)
echo "linking ${links[@]}"
ln -s ${links[@]} ~

mkdir $HOME/npm
npm install -g npm@latest

ln -s $DIR/.zprezto/runcoms/zlogin ~/.zlogin
ln -s $DIR/.zprezto/runcoms/zprofile ~/.zprofile
