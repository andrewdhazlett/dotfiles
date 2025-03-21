local wezterm = require 'wezterm'

local config = wezterm.config_builder()

config.bold_brightens_ansi_colors = 'BrightAndBold'
config.color_scheme = 'nordfox'
config.enable_tab_bar = false
config.font = wezterm.font 'Fira Code'
config.font_size = 14
config.text_background_opacity = 0.85
-- config.window_background_opacity = 0.8
config.window_background_opacity = .95
config.window_decorations = 'RESIZE'

return config
