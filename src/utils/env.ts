export const isDev = () => process.env.NODE_ENV?.toLowerCase() === 'development'
export const isProd = () => process.env.NODE_ENV?.toLowerCase() === 'production'
export const isStaging = () => process.env.NODE_ENV?.toLowerCase() === 'staging'
export const isTest = () => process.env.NODE_ENV?.toLowerCase() === 'test'
