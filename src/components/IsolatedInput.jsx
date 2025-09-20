import React, { useCallback, memo } from 'react'

const IsolatedInput = memo(({ 
  value, 
  onChange, 
  placeholder, 
  className, 
  type = "text",
  ...props 
}) => {
  const handleChange = useCallback((e) => {
    const newValue = e.target.value
    if (onChange) {
      onChange(newValue)
    }
  }, [onChange])

  return (
    <input
      type={type}
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  )
})

IsolatedInput.displayName = 'IsolatedInput'

export default IsolatedInput

