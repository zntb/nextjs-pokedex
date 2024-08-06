import type { Metadata } from 'next';
import { Anton } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Container } from 'react-bootstrap';

const anton = Anton({ subsets: ['latin'], weight: ['400'] });
export const metadata: Metadata = {
  title: 'NextJS PokéDex app',
  description: 'The official NextJS PokeDex app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={anton.className}>
        <main>
          <Container className="py-4">{children}</Container>
        </main>
      </body>
    </html>
  );
}
