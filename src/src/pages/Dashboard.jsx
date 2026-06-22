import { FiUsers, FiClock, FiCalendar, FiDollarSign } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const stats = [
  { label: 'Total Employees', value: '48', icon: FiUsers, color: 'bg-blue-100 text-blue-700' },
  { label: 'Present Today', value: '42', icon: FiClock, color: 'bg-green-100 text-green-700' },
  { label: 'On Leave', value: '4', icon: FiCalendar, color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Monthly Payroll', value: '₹3.2L', icon: FiDollarSign, color: 'bg-purple-100 text-purple-700' },
]

const chartData = [
  { month: 'Jan', employees: 40 },
  { month: 'Feb', employees: 42 },
  { month: 'Mar', employees: 45 },
  { month: 'Apr', employees: 43 },
  { month: 'May', employees: 46 },
  { month: 'Jun', employees: 48 },
]

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">HR Dashboard</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <div className={`inline-flex p-3 rounded-lg ${s.color} mb-3`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <p className="text-gray-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-4">Employee Growth</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="employees" fill="#1E3A8A" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}