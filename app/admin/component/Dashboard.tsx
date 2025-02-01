import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='mt-32'>
      <Link href="/admin/order">Order</Link>
    </div>
  )
}

export default Dashboard
