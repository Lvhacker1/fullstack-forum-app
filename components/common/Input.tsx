import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {error?: boolean}

const Input = ({ className = '', error = false, ...props }: InputProps) => {
  return (
    <input
      className={`
        w-full px-3 py-2 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:bg-gray-50
        ${error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
          : 'border-gray-300 focus:border-blue-600 focus:ring-blue-100'
        }
        ${className}
      `}
      {...props}
    />
  )
}

export default Input