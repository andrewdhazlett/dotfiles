#! /bin/bash

# todo: make sure everything is links first and safely move real files somewhere
links=(
	SpaceVim.d
	bashrc
	.gitconfig
	.npmrc
	.tmux
	.tmux.conf
	.vim
	.zlogin
	.zprezto
	.zpreztorc
	.zprofile
	.zshrc 
)

cd ~/ && echo "removing ${links[@]}" && rm ${links[@]}
