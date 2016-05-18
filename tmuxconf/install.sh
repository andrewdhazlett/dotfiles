#! /bin/bash

TMUX_DIR=`pwd`
ln -s $TMUX_DIR/.tmux.conf ~
ln -s $TMUX_DIR/.tmux ~

git clone https://github.com/tmux-plugins/tpm $TMUX_DIR/.tmux/plugins/tpm

# return to DIR
cd $DIR
