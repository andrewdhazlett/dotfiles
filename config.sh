#! /bin/bash

# init and update git submodules
git submodule init;
git submodule update;

# get the directory where the repo was cloned 
DIR=`git rev-parse --show-toplevel`;

# set up links to submodule directories
ln -s $DIR/.oh-my-zsh $DIR/.vim ~

# set up links for config directories
# ln -s $DIR/.atom ~

# set up links for config files
ln -s $DIR/.aliases ~
ln -s $DIR/.bashrc ~
ln -s $DIR/git/.gitconfig ~
ln -s $DIR/.slate ~
ln -s $DIR/.tmux.conf ~
ln -s $DIR/.vimrc ~
ln -s $DIR/.zshrc ~

# npm install where necessary
cd $DIR/.vim/bundle/tern_for_vim && npm i
