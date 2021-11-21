#! /bin/bash

./uninstall.sh

git submodule update --init --recursive
git submodule foreach --recursive git add --renormalize .

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
	$DIR/.bashrc
	$DIR/.npmrc
	$DIR/.zprezto
	$DIR/git/.gitconfig
	$DIR/tmuxconf/.tmux
	$DIR/tmuxconf/.tmux.conf
	$DIR/zsh/.zpreztorc
	$DIR/zsh/.zshrc
)
echo "linking ${links[@]}"
ln -s ${links[@]} ~

mkdir $HOME/npm
ln -s $DIR/.vim ~/.SpaceVim
ln -s $DIR/.zprezto/runcoms/zlogin ~/.zlogin
ln -s $DIR/.zprezto/runcoms/zprofile ~/.zprofile
