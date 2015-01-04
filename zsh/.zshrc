# Load my aliases
source ~/.aliases

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh # This loads NVM
# prefer homebrew versions of programs over system versions
export PATH=/usr/local/bin:$PATH
# use homebrew install of php cli
export PATH="$(brew --prefix homebrew/php/php54)/bin:$PATH"
