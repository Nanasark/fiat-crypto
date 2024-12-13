

import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { StakeUnstakeForm } from "@/components/dashboard/stake-unstake-form";

export default async function DashboardPage() {
  const contractBalance = 10000;


  // Assuming we have the merchant's address available
  const merchantAddress = "0x1234..."; // This should be dynamically set based on the logged-in merchant
  const merchantBalance = 100;


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Total Revenue</h2>
          <p className="text-2xl font-bold">$45,231.89</p>
          <p className="text-xs text-gray-500">+20.1% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">Transactions</h2>
          <p className="text-2xl font-bold">+2350</p>
          <p className="text-xs text-gray-500">+180.1% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">
            Contract Balance
          </h2>
          <p className="text-2xl font-bold">{contractBalance} ETH</p>
          <p className="text-xs text-gray-500">Total staked amount</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">
            Your Staked Balance
          </h2>
          <p className="text-2xl font-bold">{merchantBalance} ETH</p>
          <p className="text-xs text-gray-500">Your total staked amount</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <Overview />
        </div>
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
          <RecentSales />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Stake or Unstake Crypto</h2>
        <StakeUnstakeForm merchantAddress={merchantAddress} />
      </div>
    </div>
  );
}
