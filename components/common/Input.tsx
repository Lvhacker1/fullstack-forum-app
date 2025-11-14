import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      className={`px-3 py-2  w-full border rounded-md ${className}`}
      {...props}
    />
  )
}

export default Input