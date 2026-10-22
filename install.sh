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

# link worktrunk config; approvals.toml stays local
echo "linking worktrunk config"
mkdir -p ~/.config/worktrunk
ln -s $DIR/worktrunk/config.toml ~/.config/worktrunk

# link global agent rules; omp (every profile) reads ~/.agents/AGENTS.md,
# opencode loads it via "instructions" in ~/.config/opencode/opencode.json
echo "linking global agent rules"
mkdir -p ~/.agents
ln -s $DIR/agents/AGENTS.md ~/.agents/AGENTS.md

mkdir $HOME/npm
