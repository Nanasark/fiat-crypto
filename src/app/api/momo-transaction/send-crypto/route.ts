import TransactionStorage from "@/app/transactionStorage";
import { NextRequest, NextResponse } from "next/server";

//This api sends crypto to user after he has paid fiat to merchant

interface Customer {
  phoneNumber: string;
  accountName: string;
  network: string;
}

interface Metadata {
  transactionId: string;
  userId: string;
  customNote: string;
}

interface RequestData {
  customer: Customer;
  amount: number;
  currency: string;
  callbackUrl: string;
  metadata: Metadata;
}

const {
  ENGINE_URL,
  ENGINE_ACCESS_TOKEN,
  NEXT_PUBLIC_ICO_CONTRACT,
  BACKEND_WALLET_ADDRESS,
  TRANSACT_SECRET_KEY,
  TRANSACT_API_KEY
} = process.env;

export async function POST(request: NextRequest) {
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

  try {
    const data: RequestData = await request.json();
    const { customer, amount, currency, callbackUrl, metadata } = data;
    console.log(TRANSACT_SECRET_KEY);
    const response = await fetch(
      "https://sandbox.offgridlabs.org/collections/mobile-money",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-TRANSAKT-API-KEY": TRANSACT_API_KEY!,
          "X-TRANSAKT-API-SECRET": TRANSACT_SECRET_KEY!,
        },
        body: JSON.stringify({
          customer,
          amount,
          currency,
          callbackUrl,
        }),
      }
    );

    const responseData = await response.json();
    console.log(responseData);
    console.log(callbackUrl)

    if (response.ok) {
      const transactionId = responseData.data.transactionId;

      TransactionStorage.addTransaction(transactionId, metadata);

      return NextResponse.json({
        success: true,
        message: "Transaction initiated successfully",
        data: responseData,
      });
    }
    

    return NextResponse.json({
      success: true,
      message: "Operation completed successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Error initiating mobile money collection:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error initiating mobile money collection",
        data: {},
      },
      { status: 500 }
    );
  }
}