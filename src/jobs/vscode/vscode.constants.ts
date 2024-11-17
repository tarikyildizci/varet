import escapedString from 'lib/escapedString'

export const defaultVSCodeSettingsJSON = escapedString(`{
    "typescript.preferences.importModuleSpecifierEnding": "minimal",
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": "always"
    }
  }
`)
