import React, { useState, useEffect, useCallback, memo } from 'react'

const IsolatedTextarea = memo(({ 
  value, 
  onChange, 
  placeholder, 
  className,
  ...props 
}) => {
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  const handleChange = useCallback((e) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }, [onChange])

  return (
    <textarea
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  )
})

IsolatedTextarea.displayName = 'IsolatedTextarea'

export default IsolatedTextarea

