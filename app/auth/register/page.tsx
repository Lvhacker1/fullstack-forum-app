'use client'
import { useState } from 'react'
import Link from 'next/link'
import register from '@/lib/actions/auth/register'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import { registerText } from '@/lib/data/registerText'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await register({ username, email, password })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">{registerText.title}</h1>
        </div>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300 ">{registerText.usernameLabel}</label>
            <Input
              placeholder={registerText.usernamePlaceholder}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300 ">{registerText.emailLabel}</label>
            <Input
              placeholder={registerText.emailPlaceholder}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300 ">{registerText.passwordLabel}</label>
            <Input
              placeholder={registerText.passwordPlaceholder}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}/>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? registerText.loading : registerText.submitButton}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          {registerText.alternativeText}{' '}
          <Link href={registerText.alternativeLink} className="inline-block text-blue-400 hover:text-blue-300 hover:underline transition-colors">
            {registerText.alternativeLinkText}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage