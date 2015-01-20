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
set cursorline
set autowrite


" non-sucky autocomplete
set wildmode=longest,list
set wildignore=*.swp,*.bak

" set better split options
set splitbelow splitright

" set up tabs
set tabstop=2 softtabstop=2 shiftwidth=2 noexpandtab

" leader mappings
let mapleader=","
"   edit .vimrc
nnoremap <Leader>e. :vsplit $MYVIMRC<CR>
inoremap <Leader>e. <Esc>:vsplit $MYVIMRC<CR>i
"   source .vimrc
nnoremap <Leader>s. :source $MYVIMRC<CR>
inoremap <Leader>s. <Esc>:source $MYVIMRC<CR>i

" key mappings
"	  autocomplete
inoremap <C-Space> <C-n>
"   delete line
inoremap <C-d> <Esc>ddi
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
"		insert mode nav
inoremap <C-h> <left>
inoremap <C-j> <down>
inoremap <C-k> <up>
inoremap <C-l> <right>
"   no arrows allowed
nnoremap <Left> <nop>
nnoremap <Right> <nop>
nnoremap <Up> <nop>
nnoremap <Down> <nop>
inoremap <Left> <nop>
inoremap <Right> <nop>
inoremap <Up> <nop>
inoremap <Down> <nop>
vnoremap <Left> <nop>
vnoremap <Right> <nop>
vnoremap <Up> <nop>
vnoremap <Down> <nop>

" plugin remappings
"   unimpaired
"     bubble single lines
nmap <Esc>k [e
nmap <Esc>j ]e
"     bubble multiple lines
vmap <Esc>k [egv
vmap <Esc>j ]egv
"		UltiSnips
"			tab between triggers
let g:UltiSnipsExpandTrigger="<Tab>"
let g:UltiSnipsJumpForwardTrigger="<Tab>"
let g:UltiSnipsJumpBackwardTrigger="<S-Tab>"
"   UltiSnips/YCM/SuperTab song and dance
"			TODO: make YCM expand snippets on completion
let g:ycm_key_list_select_completion = ['<Down>']
let g:ycm_key_list_previous_completion = ['<Up>']

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

" coffeescript options
autocmd BufNewFile,BufReadPost *.coffee setl foldmethod=indent nofoldenable
autocmd BufNewFile,BufReadPost *.coffee setl shiftwidth=2 expandtab
let coffee_compile_vert = 1
let coffee_watch_vert = 1
