#!/bin/sh
# Get window name based on git repo name or current directory name

cd "$1" 2>/dev/null || exit 0

# Try to get git repo name, fall back to directory name
git_root=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -n "$git_root" ]; then
    basename "$git_root"
else
    basename "$(pwd)"
fi

