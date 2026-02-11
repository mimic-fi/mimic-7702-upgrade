import dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

async function downgrade(): Promise<void> {
  const RPC_URL = process.env.RPC_URL
  if (!RPC_URL) throw new Error('Missing RPC_URL env variable')

  const PRIVATE_KEY = process.env.PRIVATE_KEY
  if (!PRIVATE_KEY) throw new Error('Missing PRIVATE_KEY env variable')

  const provider = new ethers.JsonRpcProvider(RPC_URL)
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
  const nonce = await provider.getTransactionCount(wallet.address)
  const authorization = await wallet.authorize({ address: ethers.ZeroAddress, nonce: nonce + 1 })

  const tx = await wallet.sendTransaction({
    to: wallet.address,
    value: 0,
    gasLimit: 1e6,
    authorizationList: [authorization],
  })
  console.log(`⏳ Transaction sent: ${tx.hash}`)

  await tx.wait()
  console.log('\n✅ Account downgraded successfully!')
}

downgrade().catch(console.error)
