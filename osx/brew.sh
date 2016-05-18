#! /bin/bash

# Check for Homebrew, install if we don't have it
if test ! $(which brew); then
  echo "Installing homebrew..."
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

# Update homebrew recipes
brew update

# Install GNU core utilities (those that come with OS X are outdated)
brew install coreutils

# Install GNU `find`, `locate`, `updatedb`, and `xargs`, g-prefixed
brew install findutils

# Install Bash 4
brew install bash

# Install Vim how I like it
brew install vim --override-system-vi --with-lua --with-luajit

# Install more recent versions of some OS X tools
brew tap homebrew/dupes
brew install homebrew/dupes/grep

$PATH=$(brew --prefix coreutils)/libexec/gnubin:$PATH

# install binaries
binaries=(
  ack
  ctags
  git
  git-extras
  go --cross-compile-common
  gnu-sed --with-default-names
  gpg
  graphicsmagick
  node
  rename
  the_silver_searcher
  tmux
  trash
  tree
  zsh
#  ffmpeg
#  hub
#  python
#  sshfs
#  webkit2png
#  zopfli
)

echo "installing binaries..."
brew install ${binaries[@]}

brew cleanup

# install gui apps
brew install caskroom/cask/brew-cask

# Apps
apps=(
  1password
  alfred
  dash
  disk-inventory-x
  dropbox
  firefox
  flash
  flux
  google-chrome
  harvest
  iterm2
  macvim --HEAD
  qlcolorcode
  qlmarkdown
  qlprettypatch
  qlstephen
  quicklook-json
  sketch
  slack
  transmission
  vagrant
  vagrant-manager
  virtualbox
  vlc
#  tower
#  cloudup
#  nvalt
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
echo "installing apps..."
brew cask install --appdir="/Applications" ${apps[@]}
brew cask alfred link

brew tap caskroom/fonts

# fonts
fonts=(
  font-m-plus
  font-clear-sans
  font-roboto
)

# install fonts
echo "installing fonts..."
brew cask install ${fonts[@]}

