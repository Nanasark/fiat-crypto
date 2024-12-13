"use client"

import { useState } from 'react'

export function StakeUnstakeForm({ merchantAddress }: { merchantAddress: string }) {
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleStake = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/merchants/stake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY as string
        },
        body: JSON.stringify({ merchantId: merchantAddress, amount }),
      })
      const data = await response.json()
      if (data.success) {
        alert('Staking successful!')
      } else {
        alert('Staking failed: ' + data.message)
      }
    } catch (error) {
      console.error('Error staking:', error)
      alert('An error occurred while staking')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnstake = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/merchants/unstake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY as string
        },
        body: JSON.stringify({ merchantId: merchantAddress, amount }),
      })
      const data = await response.json()
      if (data.success) {
        alert('Unstaking successful!')
      } else {
        alert('Unstaking failed: ' + data.message)
      }
    } catch (error) {
      console.error('Error unstaking:', error)
      alert('An error occurred while unstaking')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (ETH)</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleStake}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Stake'}
        </button>
        <button
          onClick={handleUnstake}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Unstake'}
        </button>
      </div>
    </div>
  )
}

