import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Web Truyện - Đọc truyện online',
  description: 'Trang web đọc truyện với giao diện đẹp và dễ sử dụng',
  author: 'Dr. Ngọ Minh Tú',
  creator: 'Dr. Ngọ Minh Tú',
  keywords: 'đọc truyện, web truyện, truyện online, Dr. Ngọ Minh Tú, Nguyễn Thu Hà',
  other: {
    'developer': 'Dr. Ngọ Minh Tú',
    'dedication': 'Dành tặng Nguyễn Thu Hà',
    'copyright': '© 2025 Dr. Ngọ Minh Tú'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}
