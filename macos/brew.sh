#! /bin/bash

# Check for Homebrew, install if we don't have it
if test ! $(which brew); then
  echo "Installing homebrew..."
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

# install binaries
binaries=(
  ack
  bash
  coreutils
  ctags
  docker-compose
  ffmpeg
  findutils
  git
  git-extras
  go
  gnu-sed
  gpg
  graphicsmagick
  grep
  neovim
  nginx
  node@12
  python3
  rename
  stow
  svn
  the_silver_searcher
  tmux
  trash
  tree
  zsh
  hub
  python
#  sshfs
#  webkit2png
#  zopfli
)

echo
echo "installing binaries..."
echo
echo
brew install ${binaries[@]}
brew upgrade ${binaries[@]}

# Apps
apps=(
  1password
  alacritty
  dash
  docker
  evernote
  fantastical
  firefox-developer-edition
  iterm2
  nvalt
  qlcolorcode
  qlmarkdown
  qlprettypatch
  qlstephen
  quicklook-json
  sketch
  slack
  transmission
  vlc
#  tower
#  cloudup
#  skype
#  screenflick
#  transmit
#  appcleaner
#  seil
#  spotify
#  arq
)

# Install apps to /Applications
# Default is: /Users/$user/Applications
echo
echo "installing apps..."
echo
echo
brew cask install --appdir="/Applications" ${apps[@]}
brew upgrade --cask ${apps[@]}

brew tap homebrew/cask-fonts

# fonts
fonts=(
  font-mplus
  font-clear-sans
  font-roboto
)

# install fonts
echo
echo "installing fonts..."
echo
echo
brew cask install ${fonts[@]}
brew upgrade --cask ${fonts[@]}

# clean up
echo
echo "cleaning up..."
echo
echo
brew cleanup
brew doctor