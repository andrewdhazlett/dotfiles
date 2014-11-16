runtime bundle/vim-pathogen/autoload/pathogen.vim
execute pathogen#infect( 'bundle/{}')

" set up color scheme
syntax on
set background=dark
colorscheme solarized

filetype plugin indent on

" set useful options
set autoindent
set number
set nocompatible
set backspace=2

" set better split options
set splitbelow splitright

" set up tabs
set tabstop=2 softtabstop=2 shiftwidth=2 noexpandtab

" set up word wrapping
" set tw=80
" set wrap

" set up gui
set guifont=Monaco:h13
