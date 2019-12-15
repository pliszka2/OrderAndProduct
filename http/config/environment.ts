const dotEnvPath = '.env'
require('dotenv').config({ path: dotEnvPath })

const REQUIRED_KEYS = ['NODE_PORT']

REQUIRED_KEYS.forEach(key => {
  if (!(key in process.env))
    throw new Error(`Missing required config key: ${key}`)
})

const { NODE_PORT } = process.env

export const CONFIG = {
  NODE_PORT,
}
