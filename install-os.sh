DIR=`git rev-parse --show-toplevel`

echo ''
echo 'os-specific config'
if [[ "$OSTYPE" == "linux-gnu" ]]; then
	LINUX_DIR=$DIR'/linux'
	ln -s $LINUX_DIR/.linux_aliases ~
	ln -s $LINUX_DIR/.tmux.conf.linux ~/.tmux.conf.local
	source $LINUX_DIR/linux.sh
elif [[ "$OSTYPE" == "darwin"* ]]; then
	OSX_DIR=$DIR'/osx'
	ln -s $OSX_DIR/.tmux.conf.osx ~/.tmux.conf.local
	source $OSX_DIR/osx.sh
fi
