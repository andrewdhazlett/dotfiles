#! /bin/bash

git submodule update --init --recursive
git submodule foreach --recursive git add --renormalize .

DIR=`git rev-parse --show-toplevel`

links=(
	$DIR/.alacritty.yml
	$DIR/.bashrc
	$DIR/.gitattributes
	$DIR/.gitconfig
	$DIR/.gitignore
	$DIR/.npmrc
	$DIR/.tmux
	$DIR/.tmux.conf
	$DIR/.zprezto
	$DIR/.zpreztorc
	$DIR/.zshrc
)
echo "linking ${links[@]}"
ln -s ${links[@]} ~

mkdir $HOME/npm

ln -s $DIR/.zprezto/runcoms/zlogin ~/.zlogin
ln -s $DIR/.zprezto/runcoms/zprofile ~/.zprofile
