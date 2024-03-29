import React from 'react'
import './style.css'

export const Loading: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <svg viewBox="25 25 50 50" className="loading-svg">
      <circle
        className={`small-loading ${color ? color : 'white'}`}
        cx="50"
        cy="50"
        r="20"
      ></circle>
    </svg>
  )
}

export const MainLoading: React.FC<{ className?: string; margin?: string }> = ({
  className,
  margin,
}) => {
  return (
    <div className={`loading-container ${className}`} style={{ margin: margin ? margin : '' }}>
      <div className="main-loading"></div>
    </div>
  )
}
