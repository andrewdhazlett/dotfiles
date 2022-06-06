#! /bin/bash

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
	$DIR/.zshrc
)
echo "linking ${links[@]}"
ln -s ${links[@]} ~

mkdir $HOME/npm
