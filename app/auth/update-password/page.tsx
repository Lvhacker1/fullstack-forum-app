'use client'
import { updatePasswordPageText } from '@/lib/data/updatePasswordText'
import ErrorMessage from '@/components/common/ErrorMessage'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ROUTES } from '@/lib/constants/routes'
import createBrowserSupabaseClient from '@/lib/supabase/client'

const UpdatePasswordPage = () => {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [verifying, setVerifying] = useState(true)
    const searchParams = useSearchParams()

    useEffect(() => {
        const verifyToken = async () => {
            const supabase = createBrowserSupabaseClient()
            const errorParam = searchParams.get('error')
            if (errorParam) {
                setError('Link has expired. Please request a new password reset.')
                setVerifying(false)
                return
            }

            const { data: { session } } = await supabase.auth.getSession()
            
            if (!session) {
                setError('Session expired. Please request a new reset link.')
                setVerifying(false)
                return
            }
            setVerifying(false)
        }
        verifyToken()
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError(updatePasswordPageText.passwordMismatch)
        return
        }

        if (password.length < 6) {
            setError(updatePasswordPageText.passwordTooShort)
        return
        }
        setLoading(true)

        try {
            const supabase = createBrowserSupabaseClient()
            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            })

            if (updateError) {
                setError(updateError.message)
                setLoading(false)
                return
            }
            router.push(ROUTES.LOGIN)
        } catch (err) {
            setError(updatePasswordPageText.errorMessage)
            setLoading(false)
        }
    }

    if(verifying) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="text-center">
                <p className="text-blue-400 text-lg font-medium animate-pulse">Verifying...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">  
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                        {updatePasswordPageText.heading}
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {updatePasswordPageText.description}
                    </p>
                </div>
                {error && <ErrorMessage message={error} />}
                {!error.includes('expired') && !error.includes('Link') && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            {updatePasswordPageText.newPasswordLabel}
                        </label>
                        <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            {updatePasswordPageText.confirmPasswordLabel}
                        </label>
                        <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required/>
                    </div>
                    <div className="pt-2">
                        <Button type="submit" disabled={loading} className="w-full" variant="primary">
                            {loading ? updatePasswordPageText.loading : updatePasswordPageText.submitButton}
                        </Button>
                    </div>
                </form>
                )}
            </div>
        </div>
    )
}

export default UpdatePasswordPage