#!/bin/sh
# Check if TPM and all plugins are installed, output warning message if missing

TPM_DIR="$HOME/.tmux/tmux-plugins"
TPM="$TPM_DIR/tpm"

# Check if TPM exists
if [ ! -d "$TPM" ]; then
  echo "⚠️  TPM not found. Install: git clone https://github.com/tmux-plugins/tpm $TPM_DIR/tpm"
  exit 1
fi

# List of plugins to check
# TPM uses the repo name (last part after slash) as the directory name
plugins="tmux-plugins/tpm
tmux-plugins/tmux-sensible
tmux-plugins/tmux-resurrect
tmux-plugins/tmux-continuum
arcticicestudio/nord-tmux"

missing=""
for plugin_name in $plugins; do
  # Extract directory name (repo name after last slash)
  dir_name="${plugin_name##*/}"

  # Skip tpm itself (already checked)
  if [ "$dir_name" = "tpm" ]; then
    continue
  fi

  if [ ! -d "$TPM_DIR/$dir_name" ]; then
    if [ -z "$missing" ]; then
      missing="$plugin_name"
    else
      missing="$missing, $plugin_name"
    fi
  fi
done

if [ -n "$missing" ]; then
  echo "⚠️  Missing plugins: $missing. Install: $TPM/bin/install_plugins"
  exit 1
fi

# All plugins present
exit 0
