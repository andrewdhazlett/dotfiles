#! /bin/zsh

DIR=`git rev-parse --show-toplevel`

echo 'set up links to submodule directories'
ln -s $DIR/zsh/.zlogin ~
ln -s $DIR/zsh/.zlogout ~
ln -s $DIR/zsh/.zprezto ~
ln -s $DIR/zsh/.zpreztorc ~
ln -s $DIR/zsh/.zprofile ~
ln -s $DIR/zsh/.zshrc ~
