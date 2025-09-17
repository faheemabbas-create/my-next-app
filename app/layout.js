import "./globals copy.css";

export const metadata = {
  title: "ToDo App",
  description: "A basic todo app ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
