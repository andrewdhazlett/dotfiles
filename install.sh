#! /bin/bash

DIR=`git rev-parse --show-toplevel`

# link dotfiles to ~
links=(
	$DIR/.alacritty.yml
	$DIR/.alacritty-nord.yml
	$DIR/.bashrc
	$DIR/.gitattributes
	$DIR/.gitconfig
	$DIR/.gitconfig-personal
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

# link omo (OmO Native) config; runtime state (auth, sessions, caches) stays local.
# default agent dir = personal subscription logins; the work profile
# (OMO_CODING_AGENT_DIR + OMO_PROFILE=work from the work-repos .envrc) bills
# work API keys. settings.json is seeded by copy, not linked: omo rewrites it
# by temp-file rename, which would replace a symlink with a plain file
echo "linking omo config"
mkdir -p ~/.omo/agent/extensions ~/.omo/profiles/work/agent/extensions
ln -s $DIR/omo/omo.jsonc ~/.omo
ln -s $DIR/omo/profiles/work/agent/models.json ~/.omo/profiles/work/agent
for agent in ~/.omo/agent ~/.omo/profiles/work/agent; do
  ln -s $DIR/agents/AGENTS.md $agent
  ln -s $DIR/omo/profile-badge.ts $agent/extensions
done
[ -e ~/.omo/agent/settings.json ] || cp $DIR/omo/agent/settings.json ~/.omo/agent
[ -e ~/.omo/profiles/work/agent/settings.json ] || cp $DIR/omo/profiles/work/agent/settings.json ~/.omo/profiles/work/agent

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
# opencode loads it through "instructions" in opencode.json, omo reads the
# per-agent-dir copies linked above
echo "linking global agent rules"
mkdir -p ~/.agents
ln -s $DIR/agents/AGENTS.md ~/.agents/AGENTS.md

mkdir $HOME/npm
