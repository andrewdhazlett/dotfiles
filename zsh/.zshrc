#
# Executes commands at the start of an interactive session.
#
# Authors:
#   Sorin Ionescu <sorin.ionescu@gmail.com>
#

# Source Prezto.
if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
fi

source ~/.aliases

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh # This loads NVM

if [[ "$OSTYPE" == "darwin"* ]]; then
	# prefer homebrew versions of programs over system versions
	export PATH=/usr/local/bin:$PATH
	# use homebrew install of php cli
	export PATH="$(brew --prefix homebrew/php/php54)/bin:$PATH"
fi
