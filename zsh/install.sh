#! /bin/zsh

ZSH_DIR=`pwd`

echo ''
echo 'set up zsh links'
# link prezto
ln -s $ZSH_DIR/.zprezto ~

# link internal prezto conf
ln -s $ZSH_DIR/.zprezto/runcoms/zlogin ~/.zlogin
ln -s $ZSH_DIR/.zprezto/runcoms/zprofile ~/.zprofile

# link custom config
ln -s $ZSH_DIR/.zpreztorc ~
ln -s $ZSH_DIR/.zshrc ~
