# Source Prezto.
if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
fi

# enable true color for nvim
# export NVIM_TUI_ENABLE_TRUE_COLOR="1"
export PATH='/opt/homebrew/bin':$PATH
export PATH='/usr/local/bin:'$PATH
export PATH='/usr/local/sbin:'$PATH
export PATH="$HOME/.cargo/bin:$PATH"
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/go/bin:$PATH"
export PATH="$HOME/npm/bin:$PATH"
