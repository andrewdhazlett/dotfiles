# Source Prezto.
if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
fi

# enable true color for nvim
export NVIM_TUI_ENABLE_TRUE_COLOR="1"
alias nvim='PYENV_ROOT=~/.pyenv \
            VIMRUNTIME=~/git/github.com/neovim/neovim/runtime \
            /usr/local/Cellar/neovim/0.4.3/bin/nvim'

export PATH='/usr/local/bin:'$PATH
export PATH='/usr/local/sbin:'$PATH
export PATH="/usr/local/opt/python@3/bin:$PATH"
export PATH="/usr/local/opt/python@2/bin:$PATH"
export PATH="$HOME/.cargo/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/Library/Python/3.6/bin:$PATH"
export PATH="$HOME/Library/Python/2.7/bin:$PATH"
export PATH="$HOME/go/bin:$PATH"
export PATH="`npm bin -g`:"$PATH
