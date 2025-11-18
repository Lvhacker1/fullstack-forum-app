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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 p-2">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-[0px_2px_4px_2px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl font-bold mb-6 text-center">{registerText.title}</h1>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">{registerText.usernameLabel}</label>
            <Input
              placeholder={registerText.usernamePlaceholder}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{registerText.emailLabel}</label>
            <Input
              placeholder={registerText.emailPlaceholder}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{registerText.passwordLabel}</label>
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
        <p className="mt-4 text-center text-sm">
          {registerText.alternativeText}{' '}
          <Link href={registerText.alternativeLink} className="inline-block text-blue-600 hover:underline hover:scale-105 transition-transform duration-200">
            {registerText.alternativeLinkText}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage