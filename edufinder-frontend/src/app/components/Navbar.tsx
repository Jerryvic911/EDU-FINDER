import React from 'react'

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-lg border-b border-white/40 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <h1 className="text-xl font-bold text- cursor-pointer">Safe-zone</h1>


                <div className="md:hidden text-black cursor-pointer" >
                </div>

                <ul className="hidden md:flex gap-6 text-black items-center">
                    <li>
                        <a
                            href="#hero"
                            className="hover:text-blue-300 cursor-pointer"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about"
                            className="hover:text-blue-300 cursor-pointer"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href="#footer"
                            className="hover:text-blue-300 cursor-pointer"
                        >
                            Contact
                        </a>
                    </li>

                </ul>
            </div>

            <ul className="md:hidden bg-black/90 backdrop-blur-md text-black px-6 py-4 space-y-4">
                <li>
                    <a
                        href="#hero"
                        className="block hover:text-blue-500"
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="#about"
                        className="block hover:text-blue-500"
                    >
                        About
                    </a>
                </li>
                <li>
                    <a
                        href="#footer"
                        className="block hover:text-blue-500"
                    >
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
