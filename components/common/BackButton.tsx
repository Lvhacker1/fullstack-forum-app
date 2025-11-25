'use client'
import { useRouter } from 'next/navigation'
import Button from './Button'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
    label?: string
    fallbackUrl?: string
}

const BackButton = ({ label = 'Back', fallbackUrl }: BackButtonProps) => {
    const router = useRouter()

    const handleBack = () => {
        if(window.history.length > 1) {
            router.back()
        } else if(fallbackUrl) {
            router.push(fallbackUrl)
        }
    }

  return (
    <Button variant="secondary" onClick={handleBack} className="flex items-center gap-2">
        <ArrowLeft size={20} />
        {label}
    </Button>
  )
}

export default BackButton