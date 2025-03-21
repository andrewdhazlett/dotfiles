#! /bin/bash

DIR=`git rev-parse --show-toplevel`

# link dotfiles to ~
links=(
	$DIR/.alacritty.yml
	$DIR/.alacritty-nord.yml
	$DIR/.bashrc
	$DIR/.gitattributes
	$DIR/.gitconfig
	$DIR/.gitignore
	$DIR/.npmrc
	$DIR/.tmux
	$DIR/.tmux.conf
	$DIR/.wezterm.lua
	$DIR/.zshrc
)
echo "linking dotfiles ${links[@]}"
ln -s ${links[@]} ~

# link .config files
links=(
	$DIR/karabiner
	$DIR/starship.toml
	$DIR/raycast
)
echo "linking .config files ${links[@]}"
mkdir ~/.config
ln -s ${links[@]} ~/.config

mkdir $HOME/npm
