#! /bin/bash

# todo: make sure everything is links first and safely move real files somewhere
links=(
  .aliases
  .bashrc
	.gitconfig
	.macos_aliases
	.npmrc
	.tmux.conf
	.zlogin
	.zlogout
	.zprezto
	.zpreztorc
	.zprofile
	.zshrc 
)

cd ~/ && echo "removing ${links[@]}" && rm ${links[@]}
