#! /bin/sh
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y gcc make build-essential cmake nodejs mongodb python-dev redis-server
#ln -s /usr/bin/nodejs /usr/bin/node
#ln -s $LINUX_DIR/.linux_aliases ~
