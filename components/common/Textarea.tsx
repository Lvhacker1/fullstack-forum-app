import { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = ({ className = '', ...props }: TextareaProps) => {
  return (
    <textarea
      className={`p-2 border rounded-md w-full  border-gray-400 bg-gray-50 focus:outline-none focus:border-black focus:bg-white transition placeholder-gray-400 ${className}`}
      {...props}
    />
  )
}

export default Textarea