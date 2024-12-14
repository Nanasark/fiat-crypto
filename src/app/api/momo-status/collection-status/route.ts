import { chainId } from "@/app/chain";
// import TransactionStorage from "@/app/transactionStorage";
import { NextRequest } from "next/server";
import { toWei } from "thirdweb";


const {
  ENGINE_URL,
  ENGINE_ACCESS_TOKEN,
  NEXT_PUBLIC_ICO_CONTRACT,
  BACKEND_WALLET_ADDRESS,
  TRANSACT_SECRET_KEY,
  TRANSACT_API_KEY,
} = process.env;


export async function POST(req: NextRequest) {
    if (
      !ENGINE_URL ||
      !ENGINE_ACCESS_TOKEN ||
      !NEXT_PUBLIC_ICO_CONTRACT ||
      !BACKEND_WALLET_ADDRESS ||
      !TRANSACT_SECRET_KEY ||
      !TRANSACT_API_KEY
    ) {
      throw "server misconfigured check your env file";
    }
  const body = await req.json();
  console.log("Received callback payload:", body);
  
    const { transactionId } = body;

  
  // const metadata = TransactionStorage.getTransaction(transactionId);
  try {
    const status = await fetch(
      `https://sandbox.offgridlabs.org/collections/mobile-money/status/${transactionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-TRANSAKT-API-KEY": TRANSACT_API_KEY!,
          "X-TRANSAKT-API-SECRET": TRANSACT_SECRET_KEY!,
        },
      }
    );

    const responseData = await status.json();
    if (status.ok) {
      await send(responseData);
    }
  } catch (error) {}
}

async function send(statusData: any) {
  const address = statusData.data.accountName
  const cediAmount = statusData.data.amount;


    const pricePerToken = 20;
    const amount = Math.floor(parseFloat(cediAmount) / pricePerToken);
    const sendingAmount = toWei(`${amount}`);
  

  if (!address) {
    throw "no user connected, Sign In";
  }

  try {
    if (statusData.data.status === "SUCCESS") {
     try {
       const tx = await fetch(
         `${ENGINE_URL}/contract/${chainId}/${NEXT_PUBLIC_ICO_CONTRACT}/write`,
   
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${ENGINE_ACCESS_TOKEN}`,
             "x-backend-wallet-address": BACKEND_WALLET_ADDRESS!,
           },
           body: JSON.stringify({
             functionName: "send",
             args: [`${address}`, sendingAmount.toString()],
           }),
         }
       );
   
       console.log("contract:", NEXT_PUBLIC_ICO_CONTRACT);
       if (!tx.ok) {
         throw "purchase failed";
       }
     
       if (tx.ok) {
       
         window.location.reload();
       }
     } catch (error) {
       console.log(error);
     }
    } else {
      console.log("Transaction failed or is pending:", statusData);
      // Handle failure or pending status
    }
  } catch (error) {
    console.error("Error handling transaction status:", error);
  }
}
