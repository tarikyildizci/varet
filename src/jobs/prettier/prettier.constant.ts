import escapeSpecialChars from 'lib/escapedString.js'

export const defaultPrettierrcConfig = escapeSpecialChars(`{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80
}
`)
