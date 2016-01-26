echo 'set up node'
echo ''
cd $DIR/node && $DIR/node/install.sh

echo ''
echo 'set up tmux'
cd $DIR/tmuxconf && $DIR/tmuxconf/install.sh

echo ''
echo 'set up vim'
cd $DIR/vimrc && $DIR/vimrc/install.sh

echo ''
echo 'set up zsh'
cd $DIR/zsh && $DIR/zsh/install.sh

echo ''
echo 'set up links for config files'
ln -s $DIR/git/.gitconfig ~
ln -s $DIR/.npmrc ~

echo ''
echo 'update npm'
npm install -g npm@latest
