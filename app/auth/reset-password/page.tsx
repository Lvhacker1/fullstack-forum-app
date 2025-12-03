'use client'
import { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import { resetPasswordPageText } from '@/lib/data/resetPasswordText'
import { ROUTES } from '@/lib/constants/routes'
import { CheckCircle, ArrowLeft } from 'lucide-react'

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            
            const data = await response.json()

            if (!response.ok) {
                setError(data.error || resetPasswordPageText.errorMessage)
                setLoading(false)
                return
            }

            setSuccess(true)
            setLoading(false)
            } catch (err) {
                setError(resetPasswordPageText.errorMessage)
                setLoading(false)
        }
    }
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                            <CheckCircle className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-4 text-white">
                        {resetPasswordPageText.successHeading}
                    </h1>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        {resetPasswordPageText.successMessage}
                    </p>
                    <Link href={ROUTES.LOGIN}>
                        <Button variant="primary" className="w-full">
                            {resetPasswordPageText.backToLogin}
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white">{resetPasswordPageText.heading}</h1>
            </div>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                        {resetPasswordPageText.emailLabel}
                    </label>
                    <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"/>
                </div>
                <div className="pt-2">
                    <Button type="submit" disabled={loading} className="w-full" variant="primary">
                        {loading ? resetPasswordPageText.loading : resetPasswordPageText.submitButton}
                    </Button>
                </div>
            </form>
            <div className="mt-6 text-center">
                <Link href={ROUTES.LOGIN} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    {resetPasswordPageText.backToLogin}
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ResetPasswordPage