#! /bin/bash

# init and update git submodules
git submodule init;
git submodule update;

# get the directory where the repo was cloned 
DIR=`git rev-parse --show-toplevel`;

# set up links to submodule directories
ln -s $DIR/.oh-my-zsh $DIR/.vim ~

# set up links for config files
ln -s $DIR/.zshrc $DIR/.zsh_aliases $DIR/.vimrc $DIR/.tmux.conf ~

