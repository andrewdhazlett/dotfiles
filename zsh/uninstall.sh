#! /bin/bash

# todo: make sure everything is links first and safely move real files somewhere
links=(
	.zlogin
	.zlogout
	.zprezto
	.zpreztorc
	.zprofile
	.zshrc 
)

echo "removing ${links[@]}" && rm ~/${links[@]}

