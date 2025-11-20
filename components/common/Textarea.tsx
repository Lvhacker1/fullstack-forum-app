import { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = ({ className = '', ...props }: TextareaProps) => {
  return (
    <textarea
      className={`p-2 ${className}`}
      {...props}
    />
  )
}

export default Textarea