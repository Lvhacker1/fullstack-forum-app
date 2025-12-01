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
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link href={ROUTES.HOME} className="text-2xl font-bold text-white">
            {headerText.title}
          </Link>
          <Button variant="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <p className="text-slate-300 font-medium text-sm">{headerText.welcomeMessage}, {user.username || user.email}</p>
                <Button variant="danger" onClick={handleLogout} className="text-sm py-1.5">{headerText.logOutText}</Button>
              </>
            ) : (
              <>
                <Link 
                  href={headerText.loginLink}
                  className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors">
                  {headerText.loginText}
                </Link>
                <Link 
                  href={headerText.registerLink} 
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent text-blue-400 border border-blue-900 hover:border-blue-500 focus:ring-blue-900 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                  {headerText.registerText}
                </Link>
              </>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2 duration-500">
            {user ? (
              <>
              <p className="text-slate-300 font-medium text-center">{headerText.welcomeMessage}, {user.username || user.email}</p>
              <Button variant="danger" onClick={handleLogout}>{headerText.logOutText}</Button>
              </>
            ) : (
              <>
                <Link 
                  href={headerText.loginLink}
                  className="block w-full px-4 py-2 text-slate-400 hover:text-white rounded-lg text-center transition-colors font-medium"
                  onClick={() => setIsOpen(false)}>
                  {headerText.loginText}
                </Link>
                <Link 
                  href={headerText.registerLink}
                  className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent text-blue-400 border border-blue-900 hover:border-blue-500 focus:ring-blue-900 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                  onClick={() => setIsOpen(false)}>
                  {headerText.registerText}
                </Link>
              </>
            )}
          </div>
        )}
    </header>
  )
}

export default Header