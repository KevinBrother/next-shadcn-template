import bizBaseConfig from '@aientry/eslint-config/nextjs.js'

export default [
  ...bizBaseConfig,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**'],
  },
]
