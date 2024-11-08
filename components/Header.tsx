'use client'

import { useState, useEffect } from 'react'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-3 z-50 rounded-full px-5 py-3 ${scrolled ? ' bg-white/60 shadow-md backdrop-blur-lg dark:bg-gray-950/60' : 'bg-transparent'}`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div className="h-6 text-lg font-semibold">{siteMetadata.headerTitle}</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary relative hidden px-3 py-2 text-sm font-medium transition-colors sm:inline-block"
              >
                <span className="relative z-10">{link.title}</span>
                <span className="bg-primary absolute inset-0 scale-95 transform rounded-md opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-10" />
              </Link>
            ))}
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
