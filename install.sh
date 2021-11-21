#! /bin/bash

git submodule update --init --recursive
git submodule foreach --recursive git add --renormalize .

DIR=`git rev-parse --show-toplevel`

links=(
	$DIR/.alacritty.yml
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
ln -s $DIR/.zprezto/runcoms/zlogin ~/.zlogin
ln -s $DIR/.zprezto/runcoms/zprofile ~/.zprofile
