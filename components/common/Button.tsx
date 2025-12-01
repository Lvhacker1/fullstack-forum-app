import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'icon'
  isLoading?: boolean
}

const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
  const variants = {
    primary: 'bg-transparent text-blue-400 border border-blue-900 hover:border-blue-400 focus:ring-blue-900 shadow-[0_0_10px_rgba(59,130,246,0.1)]',
    secondary: 'bg-transparent text-slate-400 border border-slate-700 hover:border-slate-400 focus:ring-slate-700',
    danger: 'bg-transparent text-red-400 border border-red-900 hover:border-red-500 focus:ring-red-900',
    outline: 'bg-transparent border border-blue-900 text-blue-400 hover:border-blue-400 focus:ring-blue-500',
    icon: 'bg-transparent text-slate-400 hover:text-white border-none p-2',
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}>
      {isLoading ? (
        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  )
}

export default Button