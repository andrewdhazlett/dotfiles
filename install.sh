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

# link omp config; runtime state (auth, sessions, DBs) stays local
echo "linking omp config"
mkdir -p ~/.omp/agent ~/.omp/profiles/personal/agent
ln -s $DIR/omp/agent/config.yml $DIR/omp/agent/models.yml ~/.omp/agent
ln -s $DIR/omp/profiles/personal/agent/config.yml ~/.omp/profiles/personal/agent

mkdir $HOME/npm
