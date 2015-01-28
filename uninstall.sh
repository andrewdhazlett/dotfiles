#! /bin/bash

# todo: make sure everything is links first and safely move real files somewhere
links=(
  .aliases
  .bashrc
	.gitconfig
	.osx_aliases
	.slate
	.tmux.conf
)

cd ~/ && echo "removing ${links[@]}" && rm ${links[@]}

DIR=`git rev-parse --show-toplevel`

echo ''
echo 'uninstall up vimrc'
cd $DIR/vimrc && $DIR/vimrc/uninstall.sh

echo ''
echo 'uninstall up zshrc'
cd $DIR/zsh && $DIR/zsh/uninstall.sh