import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {error?: boolean}

const Input = ({ className = '', error = false, ...props }: InputProps) => {
  return (
    <input
      className={`
        w-full px-4 py-2 rounded-lg border bg-transparent text-slate-200 placeholder:text-gray-500
        transition-all duration-200
        focus:outline-none focus:ring-1 focus:ring-offset-0
        disabled:opacity-50 disabled:cursor-not-allowed
        ${error 
          ? 'border-red-900 focus:border-red-500 focus:ring-red-500' 
          : 'border-slate-800 focus:border-slate-600 focus:ring-blue-500'
        }
        ${className}
      `}
      {...props}
    />
  )
}

export default Input