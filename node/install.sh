rm $HOME/.npmrc
ln -s $DIR/node/npmrc $HOME/.npmrc
mkdir $HOME/npm

echo ''
echo 'update npm'
npm install -g npm@latest
