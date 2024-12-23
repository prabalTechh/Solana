import {
  Keypair,
  Connection,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

import dotenv from 'dotenv/config'

const payer = Keypair.fromSecretKey(
    Uint8Array.from(
      process.env.PRIVATE_KEY.split(',').map((byte) => Number(byte.trim()))
    )
  );
  

const connection = new Connection("https://api.devnet.solana.com");

async function main() {
  const newAcc = Keypair.generate();
  const transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
        fromPubkey: payer.publicKey, // Ensure this is a Keypair's public key
        toPubkey: newAcc.publicKey, // Ensure this is another valid Keypair's public key
        lamports: 0.00001 * 1000000000, // Ensure this is a valid number
      })
      
  );

  await connection.sendTransaction(transaction, [payer]);
  console.log(`Transferred to ${newAcc.publicKey.toBase58()}`);
}

main();
