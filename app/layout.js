import "./globals copy.css";

export const metadata = {
  title: "To-Do App",
  description: "A minimal To-Do app using Next.js and React",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
