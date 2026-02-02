-- AstroLSP allows you to customize the features in AstroNvim's LSP configuration engine
-- Configuration documentation can be found with `:h astrolsp`

---@type LazySpec
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    -- Configuration table of features provided by AstroLSP
    features = {
      codelens = true,
      inlay_hints = false,
      semantic_tokens = true,
    },
    -- customize lsp formatting options
    formatting = {
      -- control auto formatting on save
      format_on_save = {
        enabled = false,
      },
      disabled = {
        -- disable tsserver formatting so prettier handles it
        "tsserver",
        "ts_ls",
      },
      timeout_ms = 1000,
    },
  },
}
