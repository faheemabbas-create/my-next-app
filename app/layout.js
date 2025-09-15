import "./globals copy.css";

export const metadata = {
  title: "ToDo App",
  description: "A minimal To-Do app using Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
