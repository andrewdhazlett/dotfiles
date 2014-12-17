runtime bundle/vim-pathogen/autoload/pathogen.vim
execute pathogen#infect( 'bundle/{}')
filetype plugin indent on

set nocompatible

" set up color scheme
set background=dark
colorscheme solarized

" various options
set hidden
set copyindent
set ignorecase smartcase
set history=1000 undolevels=1000
set title
set visualbell noerrorbells
set number relativenumber


" non-sucky autocomplete
set wildmode=longest,list
set wildignore=*.swp,*.bak

" set better split options
set splitbelow splitright

" set up tabs
set tabstop=2 softtabstop=2 shiftwidth=2 noexpandtab

" key remappings
let mapleader=","
"		tab to autocomplete
inoremap <Tab> <C-n>
"   semicolons are worthless in normal mode
nnoremap ; :
"   navigate wrapped lines
nnoremap j gj
nnoremap k gk
"		faster mode switching
inoremap jj <ESC>
"		faster split nav
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" airline options
let g:airline_powerline_fonts = 1

" ctrl-p options
let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlP'
let g:ctrlp_working_path_mode = 'ra'
set wildignore+=*/tmp/*,*.so,*.swp,*.zip     " MacOSX/Linux
" set wildignore+=*\\tmp\\*,*.swp,*.zip,*.exe  " Windows
let g:ctrlp_custom_ignore = '\v[\/]\.(git|hg|svn)$'
" let g:ctrlp_custom_ignore = {
"   \ 'dir':  '\v[\/]\.(git|hg|svn)$',
"   \ 'file': '\v\.(exe|so|dll)$',
"   \ 'link': 'some_bad_symbolic_links',
"   \ }
let g:ctrlp_user_command = 'find %s -type f'        " MacOSX/Linux
" let g:ctrlp_user_command = 'dir %s /-n /b /s /a-d'  " Windows

" set up word wrapping
" set tw=80
" set wrap

" coffeescript setup
autocmd BufNewFile,BufReadPost *.coffee setl foldmethod=indent nofoldenable
autocmd BufNewFile,BufReadPost *.coffee setl shiftwidth=2 expandtab
let coffee_compile_vert = 1
let coffee_watch_vert = 1

