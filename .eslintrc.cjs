// Updated by trungquandev.com's author on May 13 2023
// Sample Eslint config for React project
module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,

    'no-console': 1,  // không viết console trong code 
    'no-lonely-if': 1, // khi viết if else thì không viết if ở trong else
    'no-unused-vars': 1, // không khai báo biến mà không s dụng
    'no-trailing-spaces': 1, // không thừa  quá nhiềU dấu cách trong code
    'no-multi-spaces': 1, // không thừu quá nhiều khoản trống trong code
    'no-multiple-empty-lines': 1, // không để cách quá nhiều dòng trong code
    'space-before-blocks': ['error', 'always'], // phỉa có khoảng trống trước dấu {} trong code
    'object-curly-spacing': [1, 'always'], // khi tạo 1 OBJECT phải có 1 khoảng trống trước và sau dấu {}
    'indent': ['warn', 2], // chỉ được thụt lề 2 khoảng trống
    'semi': [1, 'never'], // không được sử dụng dấu chấm phẩy trong code
    'quotes': ['error', 'single'], // strign phải bỏ trong dấu nháy đơn
    'array-bracket-spacing': 1, // không được để khoảng trống trong dấu [] khi tạo 1 array
    'linebreak-style': 0, 
    'no-unexpected-multiline': 'warn', // không được để xuất hiện những dòng không ngờ tới hoạc không sử dụng
    'keyword-spacing': 1,
    'comma-dangle': 1,
    'comma-spacing': 1, // không được để khoảng trống trước dấu phẩy và phải có 1 khoảng trống sau dấu phẩy
    'arrow-spacing': 1 // phải được để khoảng trống trước và sau dấu => khi tạo 1 arrow function
  }
}