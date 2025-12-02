import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = ({ className = '', error = false, ...props }: TextareaProps) => {
  return (
    <textarea
      className={`
        px-4 py-3 rounded-lg bg-transparent border w-full 
        text-slate-200 placeholder:text-slate-600
        transition-all duration-200
        focus:outline-none focus:ring-1 focus:ring-offset-0
        disabled:opacity-50 disabled:cursor-not-allowed
        resize-y min-h-[150px]
        ${error 
          ? 'border-red-900 focus:border-red-500 focus:ring-red-500' 
          : 'border-slate-800 hover:border-slate-600 focus:border-blue-500 focus:ring-blue-500'
        }
        ${className}`}
      {...props}
    />
  )
}

export default Textarea