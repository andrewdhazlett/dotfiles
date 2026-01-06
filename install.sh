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
	$DIR/nvim
	$DIR/raycast
	$DIR/starship.toml
)
echo "linking .config files ${links[@]}"
mkdir -p ~/.config
ln -s ${links[@]} ~/.config

mkdir $HOME/npm
