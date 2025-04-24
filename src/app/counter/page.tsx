'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/state/slices'
import { increment, decrement, incrementByAmount } from '@/state/slices/counterSlice'

export default function CounterPage() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Counter Demo</h1>
      <p className="text-lg mb-4">Count: {count}</p>
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          +5
        </button>
      </div>
    </div>
  )
} 