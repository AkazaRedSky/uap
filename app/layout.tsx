import './globals.css';

export const metadata = {
  title: 'Project UAP',
  description: 'Game Purchase Application',
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
