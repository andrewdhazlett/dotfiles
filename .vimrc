runtime bundle/vim-pathogen/autoload/pathogen.vim
execute pathogen#infect( 'bundle/{}')

" set up color scheme
syntax on
set background=dark
colorscheme solarized

filetype plugin indent on

" set useful options
set ai
set nu
set nocompatible
set backspace=2

" set up tabs
set expandtab tabstop=2 shiftwidth=2 
retab

" set up word wrapping
set tw=80
set wrap
