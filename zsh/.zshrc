# Source Prezto.
if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
fi


# useful aliases:
alias c="clear; ";
alias cla="c la";
alias cal="cla";
alias cd..="cd ..";
alias gi="git";

if [[ "$OSTYPE" == "linux-gnu" ]]; then
	alias la="ls -AFgo --group-directories-first"
elif [[ "$OSTYPE" == "darwin"* ]]; then
	alias la="ls -AFGghlo"
	alias vi="vim"
fi


# configure path:

if [[ "$OSTYPE" == "darwin"* ]]; then
	# prefer homebrew versions of programs over system versions
	export PATH=/usr/local/bin:$PATH
	# use homebrew go binary
	PATH+=":/usr/local/opt/go/libexec/bin"
	# use homebrew install of php cli
	export PATH="$(brew --prefix homebrew/php/php54)/bin:$PATH"
fi

# add globally installed node modules to $PATH
PATH+=":`npm prefix --global`/bin"

# add go binaries
PATH+=":$GOPATH/bin"

# environment variables:
GOPATH="$HOME/code/go"
