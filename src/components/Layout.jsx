export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white shadow-md print:bg-white print:text-black print:shadow-none">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Universal VAT</h1>
          <p className="text-indigo-200 text-sm print:text-gray-500">
            Vulnerability Assessment Tool
          </p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      <footer className="text-center text-gray-400 text-xs py-6 print:hidden">
        Universal VAT &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
