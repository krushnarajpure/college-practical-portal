import './globals.css';

export const metadata = {
  title: 'College Practical Management Portal',
  description: 'Academic practical management portal for Data Structure & Algorithms Lab.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
