#! /bin/bash

TMUX_DIR=`pwd`
ln -s $TMUX_DIR/.tmux.conf ~
ln -s $TMUX_DIR/.tmux ~

# return to DIR
cd $DIR
