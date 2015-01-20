#! /bin/bash
echo 'set up links to submodule directories'
ln -s $DIR/zsh/prezto ~/.zprezto
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
	ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done

echo 'init prezto'
source $DIR/zsh/prezto/init.zsh
