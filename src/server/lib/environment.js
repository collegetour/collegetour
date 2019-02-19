import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const getEnv = () => {
  if(fs.existsSync(path.join('.env'))) return path.join('.env')
  if(fs.existsSync(path.join('..','.env'))) return path.join('..','.env')
  return null
}

const env = getEnv()

if(env) dotenv.load({ path: env })
