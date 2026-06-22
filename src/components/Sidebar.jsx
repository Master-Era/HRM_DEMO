import { FiHome, FiUsers, FiClock, FiCalendar, FiDollarSign } from 'react-icons/fi'

const menu = [
  { id: 'dashboard',  label: 'Dashboard',  icon: FiHome },
  { id: 'employees',  label: 'Employees',  icon: FiUsers },
  { id: 'attendance', label: 'Attendance', icon: FiClock },
  { id: 'leave',      label: 'Leave',      icon: FiCalendar },
  { id: 'payroll',    label: 'Payroll',    icon: FiDollarSign },
]

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="w-64 bg-[#1E3A8A] text-white flex flex-col">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-xl font-bold">Master Era</h1>
        <p className="text-blue-300 text-sm">HR Management</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menu.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
              ${page === item.id ? 'bg-white text-[#1E3A8A] font-semibold' : 'hover:bg-blue-700'}`}>
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4">
        <div className="bg-yellow-400 text-gray-900 text-xs font-bold text-center py-2 rounded-lg">
          DEMO VERSION
        </div>
      </div>
    </aside>
  )
}