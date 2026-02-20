import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#030810' }}>
      <Sidebar />
      <main className="flex-1 ml-56 min-h-screen" style={{ background: '#030810' }}>
        {children}
      </main>
    </div>
  )
}
