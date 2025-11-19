'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { homePageText } from '@/lib/data/homePage'
import { ROUTES } from '@/lib/constants/routes'
import type { AuthUser } from '@/lib/types/auth'

interface HeaderProps {
  user: AuthUser | null
}

const Header = ({ user }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href={ROUTES.HOME} className="text-2xl font-bold">
            {homePageText.title}
          </Link>
          <button className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex gap-4">
            {user ? (
              <p className="text-gray-700">{homePageText.welcomeMessage}, {user.username || user.email}</p>
            ) : (
              <>
                <Link 
                  href={homePageText.loginLink}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700">
                  {homePageText.loginText}
                </Link>
                <Link 
                  href={homePageText.registerLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {homePageText.registerText}
                </Link>
              </>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-2">
            {user ? (
              <p className="text-gray-700">{homePageText.welcomeMessage}, {user.username || user.email}</p>
            ) : (
              <>
                <Link 
                  href={homePageText.loginLink}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 text-center"
                  onClick={() => setIsOpen(false)}>
                  {homePageText.loginText}
                </Link>
                <Link 
                  href={homePageText.registerLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                  onClick={() => setIsOpen(false)}>
                  {homePageText.registerText}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header