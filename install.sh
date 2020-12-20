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

links=(
	$DIR/.npmrc
	$DIR/.tmux
	$DIR/.tmux.conf
	$DIR/zsh/.zprezto
	$DIR/zsh/.zpreztorc
	$DIR/zsh/.zshrc
	$DIR/git/.gitconfig
)
echo "linking ${links[@]}"
ln -s ${links[@]} ~

echo ''
echo 'set up node'
rm $HOME/.npmrc
mkdir $HOME/npm
npm install -g npm@latest

echo ''
echo 'set up zsh'
ln -s $DIR/zsh/.zprezto/runcoms/zlogin ~/.zlogin
ln -s $DIR/zsh/.zprezto/runcoms/zprofile ~/.zprofile
