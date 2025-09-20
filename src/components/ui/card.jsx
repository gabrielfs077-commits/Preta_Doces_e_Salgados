import React from 'react'

const Card = ({ className = '', children, ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-4 pb-2 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  )
}

const CardDescription = ({ className = '', children, ...props }) => {
  return (
    <p className={`text-sm text-gray-600 ${className}`} {...props}>
      {children}
    </p>
  )
}

const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-4 pt-2 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-4 pt-2 ${className}`} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

