import './globals.css';
import Navbar from './components/navbar';

export const metadata = {
  title: 'Project UAP',
  description: 'Go Beyond',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <main>
            {children}
          </main>
      </body>
    </html>
  )
}
