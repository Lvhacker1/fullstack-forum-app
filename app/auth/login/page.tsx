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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-[0px_2px_4px_2px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl font-bold mb-6 text-center">{loginText.title}</h1>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">{loginText.emailLabel}</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{loginText.passwordLabel}</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? loginText.loading : loginText.submitButton}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          {loginText.alternativeText}{' '}
          <Link href={loginText.alternativeLink} className="text-blue-600 hover:underline">
            {loginText.alternativeLinkText}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage