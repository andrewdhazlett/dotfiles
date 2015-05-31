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
  ctags
  graphicsmagick
#  webkit2png
  rename
#  zopfli
#  ffmpeg
#  python
#  sshfs
  trash
  node
  tree
  ack
  the_silver_searcher
#  hub
  git
  git-extras
)

echo "installing binaries..."
brew install ${binaries[@]}

brew cleanup

# install gui apps
brew install caskroom/cask/brew-cask

# Apps
apps=(
  alfred
  dash
  dropbox
  google-chrome
#  qlcolorcode
#  screenflick
#  slack
#  transmit
#  appcleaner
  firefox
#  hazel
#  qlmarkdown
#  seil
#  spotify
  vagrant
  vagrant-manager
#  arq
  flash
  iterm2
#  qlprettypatch
#  shiori
#  sublime-text3
  virtualbox
#  atom
  flux
  mailbox
#  qlstephen
#  sketch
#  tower
  vlc
#  cloudup
#  nvalt
#  quicklook-json
#  skype
  transmission
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

