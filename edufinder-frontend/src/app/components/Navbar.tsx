'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react' // You can install Lucide or use your own icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-lg border-b border-white/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer text-black">EDUFINDER</h1>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-black cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-black items-center">
            <li>
            <Link href="/">
              <span onClick={toggleMenu} className="block hover:text-blue-500">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/explore">
              <span className="hover:text-blue-300 cursor-pointer">Explore</span>
            </Link>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-300 cursor-pointer">About</a>
          </li>
          <li>
            <a href="#footer" className="hover:text-blue-300 cursor-pointer">Contact</a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white/90 backdrop-blur-md text-black px-6 py-4 space-y-4">
          <li>
            <Link href="/">
              <span onClick={toggleMenu} className="block hover:text-blue-500">Home</span>
            </Link>
          </li>
          <li>
            <a href="#about" onClick={toggleMenu} className="block hover:text-blue-500">About</a>
          </li>
          <li>
            <a href="#footer" onClick={toggleMenu} className="block hover:text-blue-500">Contact</a>
          </li>
          <li>
            <Link href="/explore">
              <span onClick={toggleMenu} className="block hover:text-blue-500">Explore</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
