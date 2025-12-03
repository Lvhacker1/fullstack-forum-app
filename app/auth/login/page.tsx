'use client'
import { useState } from 'react'
import Link from 'next/link'
import login from '@/lib/actions/auth/login'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import { loginText } from '@/lib/data/loginText'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login({ email, password })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">{loginText.title}</h1>
        </div>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300 ">{loginText.emailLabel}</label>
            <Input
              placeholder={loginText.emailPlaceholder}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300 ">{loginText.passwordLabel}</label>
            <Input
              placeholder={loginText.passwordPlaceholder}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
          </div>
          <div className="text-right">
            <Link href="/auth/reset-password" className="inline-block text-blue-400 hover:text-blue-300 hover:underline transition-colors text-sm">
              {loginText.forgotPassword}
            </Link>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? loginText.loading : loginText.submitButton}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          {loginText.alternativeText}{' '}
          <Link href={loginText.alternativeLink} className="inline-block text-blue-400 hover:text-blue-300 hover:underline transition-colors">
            {loginText.alternativeLinkText}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage