#! /bin/bash

# todo: make sure everything is links first and safely move real files somewhere
links=(
  .aliases
  .bashrc
	.gitconfig
	.osx_aliases
	.slate
	.tmux.conf
	.vim
	.vimrc
	.zshrc 
	.zprezto
)

cd ~/ && echo "removing ${links[@]}" && rm ${links[@]}

