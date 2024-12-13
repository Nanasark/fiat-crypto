
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Crypto Exchange</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {" "}
            <li>
              <Link
                href="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
               Back Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/transactions"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
