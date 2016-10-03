# Source Prezto.
if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
fi

# useful aliases:
alias c="clear; ";
alias cla="c la";
alias cal="cla";
alias gi="git";
alias g="git";

# enable true color for nvim
alias v='NVIM_TUI_ENABLE_TRUE_COLOR=1 nvim'
alias vi='NVIM_TUI_ENABLE_TRUE_COLOR=1 nvim'
alias vim='NVIM_TUI_ENABLE_TRUE_COLOR=1 nvim'

# configure path:

if [[ "$OSTYPE" == "darwin"* ]]; then
	# prefer homebrew versions of programs over system versions
	export PATH=/usr/local/bin:/usr/local/sbin:$PATH
	# use homebrew go binary
	PATH+=":/usr/local/opt/go/libexec/bin"
fi

# add globally installed node modules to $PATH
PATH+=":`npm prefix --global`/bin"

# add go binaries
PATH+=":$GOPATH/bin"

# environment variables:
GOPATH="$HOME/code/go"
