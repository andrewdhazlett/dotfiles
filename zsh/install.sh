#! /bin/zsh

DIR=`pwd`
ZSH_DIR=$DIR'/zsh'

echo ''
echo 'set up links to submodule directories'
ln -s $ZSH_DIR/.aliases ~
ln -s $ZSH_DIR/.zlogin ~
ln -s $ZSH_DIR/.zlogout ~
ln -s $ZSH_DIR/.zprezto ~
ln -s $ZSH_DIR/.zpreztorc ~
ln -s $ZSH_DIR/.zprofile ~
ln -s $ZSH_DIR/.zshrc ~
