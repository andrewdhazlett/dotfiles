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

# link omp config; runtime state (auth, sessions, DBs) stays local.
# default profile = personal logins; `work` profile bills work API keys
echo "linking omp config"
mkdir -p ~/.omp/agent ~/.omp/profiles/work/agent
ln -s $DIR/omp/agent/config.yml ~/.omp/agent
ln -s $DIR/omp/profiles/work/agent/config.yml $DIR/omp/profiles/work/agent/models.yml ~/.omp/profiles/work/agent

# link worktrunk config; approvals.toml stays local
echo "linking worktrunk config"
mkdir -p ~/.config/worktrunk
ln -s $DIR/worktrunk/config.toml ~/.config/worktrunk

# link opencode config; auth, plugins, accounts, and herdr's tui.jsonc stay local.
# keep the oh-my-openagent pin identical in opencode.json and tui.json: on
# startup the plugin rewrites tui.json by temp-file rename when its TUI entry
# is missing, which would replace this symlink with a plain file
echo "linking opencode config"
mkdir -p ~/.config/opencode
ln -s $DIR/opencode/opencode.json $DIR/opencode/tui.json $DIR/opencode/profile-badge.ts ~/.config/opencode

# link global agent rules; omp (every profile) reads ~/.agents/AGENTS.md,
# opencode loads it through "instructions" in opencode.json
echo "linking global agent rules"
mkdir -p ~/.agents
ln -s $DIR/agents/AGENTS.md ~/.agents/AGENTS.md

mkdir $HOME/npm
