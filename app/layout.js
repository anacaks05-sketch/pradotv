import './globals.css'

export const metadata = {
  title: 'Prado TV',
  description: 'Entretenimento Premium',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
