import Sidebar from '@/components/Sidebar'
import WebGLBackground from '@/components/WebGLBackground'

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#06060f' }}>
      <WebGLBackground />
      <Sidebar />
      <main className="flex-1 ml-56 min-h-screen">{children}</main>
    </div>
  )
}
