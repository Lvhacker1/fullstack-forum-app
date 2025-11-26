'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { headerText } from '@/lib/data/headerText'
import { ROUTES } from '@/lib/constants/routes'
import type { AuthUser } from '@/lib/types/auth'
import { useRouter } from 'next/navigation'
import logout from '@/lib/actions/auth/logout'
import Button from '@/components/common/Button'

interface HeaderProps {
  user: AuthUser | null
}

const Header = ({ user }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push(ROUTES.HOME)
    router.refresh()
  }

  

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href={ROUTES.HOME} className="text-2xl font-bold">
            {headerText.title}
          </Link>
          <Link href={ROUTES.SEARCH} className="text-2xl font-bold">
            {headerText.searchText}
          </Link>
          <button className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex gap-4">
            {user ? (
              <>
                <p className="text-gray-700">{headerText.welcomeMessage}, {user.username || user.email}</p>
                <Button variant="danger" onClick={handleLogout}>{headerText.logOutText}</Button>
              </>
            ) : (
              <>
                <Link 
                  href={headerText.loginLink}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700">
                  {headerText.loginText}
                </Link>
                <Link 
                  href={headerText.registerLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {headerText.registerText}
                </Link>
              </>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-2">
            <Link href={ROUTES.SEARCH} className="px-4 py-2 text-gray-800 hover:bg-gray-50 rounded text-center" onClick={() => setIsOpen(false)}>
              {headerText.searchText}
            </Link>
            {user ? (
              <>
              <p className="text-gray-700">{headerText.welcomeMessage}, {user.username || user.email}</p>
              <Button variant="danger" onClick={handleLogout}>{headerText.logOutText}</Button>
              </>
            ) : (
              <>
                <Link 
                  href={headerText.loginLink}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 text-center"
                  onClick={() => setIsOpen(false)}>
                  {headerText.loginText}
                </Link>
                <Link 
                  href={headerText.registerLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                  onClick={() => setIsOpen(false)}>
                  {headerText.registerText}
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