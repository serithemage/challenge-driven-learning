import Link from 'next/link'

const footerLinks = [
  { href: '/terms', label: '이용약관' },
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/support', label: '고객센터' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Brand */}
          <div>
            <span className="text-white font-extrabold text-lg">CDL</span>
            <p className="mt-1 text-sm">Challenge Driven Learning</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-white transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-sm sm:text-right">
            <p>© {new Date().getFullYear()} 한빛미디어</p>
            <p className="mt-1">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
