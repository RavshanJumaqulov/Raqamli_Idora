// import Icons from '@/assets/svg-icons'
import React from 'react'

const Error: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p style={{ color: 'red' }} className="text-error text-14 italic mt-2 flex items-center gap-1">
      {/* <Icons.Error /> */}
      {children}
    </p>
  )
}

export default Error
