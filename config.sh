#! /bin/zsh

# init and update git submodules
git submodule update --init;

# get the directory where the repo was cloned 
DIR=`git rev-parse --show-toplevel`;
OSX_DIR=$DIR'/osx'

# set up links to submodule directories
ln -s $DIR/vim/.vim ~
ln -s $DIR/zsh/prezto ~/.zprezto
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
	ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done

# init prezto
source $DIR/zsh/prezto/init.zsh
# init powerline fonts
source $DIR/powerline-fonts/install.sh

# os-specific config

if [[ "$OSTYPE" == "linux-gnu" ]]; then
	ln -s $DIR/.linux_aliases ~
elif [[ "$OSTYPE" == "darwin"* ]]; then
	source $OSX_DIR/osx.sh
# elif [[ "$OSTYPE" == "cygwin" ]]; then
# elif [[ "$OSTYPE" == "msys" ]]; then
# elif [[ "$OSTYPE" == "win32" ]]; then
# elif [[ "$OSTYPE" == "freebsd"* ]]; then
# else
fi

# set up links for config files
ln -s $DIR/.aliases ~
ln -s $DIR/.bashrc ~
ln -s $DIR/git/.gitconfig ~
ln -s $DIR/.tmux.conf ~
ln -s $DIR/vim/.vimrc ~
ln -s $DIR/zsh/.zshrc ~

# npm install where necessary
cd $DIR/vim/.vim/bundle/tern_for_vim && npm i
