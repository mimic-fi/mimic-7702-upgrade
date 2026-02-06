import dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

export async function status(): Promise<void> {
  const RPC_URL = process.env.RPC_URL
  if (!RPC_URL) throw new Error('Missing RPC_URL env variable')

  const PRIVATE_KEY = process.env.PRIVATE_KEY
  if (!PRIVATE_KEY) throw new Error('Missing PRIVATE_KEY env variable')

  const MIMIC_SMART_ACCOUNT_ADDRESS = process.env.MIMIC_SMART_ACCOUNT_ADDRESS
  if (!MIMIC_SMART_ACCOUNT_ADDRESS) throw new Error('Missing MIMIC_SMART_ACCOUNT_ADDRESS env variable')

  const provider = new ethers.JsonRpcProvider(RPC_URL)
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

  const bytecode = await provider.getCode(wallet.address)
  if (bytecode === '0x') console.log(`❌ Wallet ${wallet.address} is not upgraded to a 7702 smart account`)
  else if (!bytecode.startsWith('0xef0100')) console.log(`❌ ${wallet.address} is not an EOA`)
  else {
    const [, implementation] = bytecode.split('0xef0100')
    if (`0x${implementation}` === MIMIC_SMART_ACCOUNT_ADDRESS.toLowerCase())
      console.log(`✅ ${wallet.address} upgraded to Mimic 7702`)
    else console.log(`⚠️ ${wallet.address} upgraded to 0x${implementation} instead of Mimic 7702`)
  }
}

status().catch(console.error)
