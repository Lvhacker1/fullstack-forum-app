'use client'
import { useRouter } from 'next/navigation'
import Button from './Button'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
    label?: string
    href: string
}

const BackButton = ({ label = 'Back', href }: BackButtonProps) => {
    const router = useRouter()

    const handleClick = () => {
            router.push(href)
    }

  return (
    <Button variant="secondary" onClick={handleClick} className="flex items-center gap-2">
        <ArrowLeft size={20} />
        {label}
    </Button>
  )
}

export default BackButton