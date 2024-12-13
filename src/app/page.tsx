"use client";

import Header from "@/components/header.";
import FiatPay from "@/components/fiatPay";
import { useReadContract } from "thirdweb/react";
import { tokenContract } from "./contract";
import { toEther } from "thirdweb";

export default function Home() {
  const { data: tokenBalance } = useReadContract({
    contract: tokenContract,
    method: "getContractTokenBalance",
  });

  let balance;
  if (tokenBalance) {
    balance = toEther(tokenBalance);
  }
  console.log(tokenBalance);
  return (
    <main className="bg-white w-screen flex flex-col gap-5">

      <div className="w-full p-3 flex flex-col gap-5">
        <div className="flex justify-center text-center w-[100%] gap-5 border-purple-600 rounded-[11px] border-[1px]">
          <p>$FTC Balance</p>
          <p>{balance?.toString()}</p>
        </div>
        <FiatPay />
      </div>
    </main>
  );
}
