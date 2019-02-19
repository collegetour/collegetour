import dotenv from 'dotenv'
import path from 'path'

const env = path.join('.env')

dotenv.load({ path: env })
