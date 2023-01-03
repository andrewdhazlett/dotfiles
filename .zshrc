# enable true color for nvim
# export NVIM_TUI_ENABLE_TRUE_COLOR="1"

# set up completions
# - case-insensitive path-completion
zstyle ':completion:*' matcher-list 'm:{[:lower:][:upper:]}={[:upper:][:lower:]}' 'm:{[:lower:][:upper:]}={[:upper:][:lower:]} l:|=* r:|=*' 'm:{[:lower:][:upper:]}={[:upper:][:lower:]} l:|=* r:|=*' 'm:{[:lower:][:upper:]}={[:upper:][:lower:]} l:|=* r:|=*'
# - partial completion suggestions
zstyle ':completion:*' list-suffixes
zstyle ':completion:*' expand prefix suffix
# - load the completions
autoload -Uz compinit && compinit

# set up aliases
alias -g la='ls -la'

export PATH="/opt/homebrew/bin:"$PATH
export PATH="$(brew --prefix)/sbin:$PATH"
export PATH="$HOME/.cargo/bin:$PATH"
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/go/bin:$PATH"
export PATH="$HOME/npm/bin:$PATH"

eval "$(starship init zsh)"
