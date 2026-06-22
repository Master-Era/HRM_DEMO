import { useState } from 'react'

const data = [
  { id: 'EMP001', name: 'Raj Patel',   dept: 'Sales',   role: 'Manager',   status: 'Active',   salary: '₹35,000' },
  { id: 'EMP002', name: 'Priya Shah',  dept: 'HR',      role: 'Executive', status: 'Active',   salary: '₹28,000' },
  { id: 'EMP003', name: 'Amit Desai',  dept: 'Tech',    role: 'Developer', status: 'Active',   salary: '₹42,000' },
  { id: 'EMP004', name: 'Neha Joshi',  dept: 'Finance', role: 'Analyst',   status: 'Active',   salary: '₹31,000' },
  { id: 'EMP005', name: 'Vivek Modi',  dept: 'Sales',   role: 'Executive', status: 'On Leave', salary: '₹26,000' },
  { id: 'EMP006', name: 'Sonal Mehta', dept: 'Admin',   role: 'Coordinator',status: 'Active',  salary: '₹24,000' },
]

export default function Employees() {
  const [search, setSearch] = useState('')
  const filtered = data.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
        <div className="flex gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300" />
          <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-medium">
            + Add Employee
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['ID','Name','Department','Role','Status','Salary','Action'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">{e.id}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{e.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.dept}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${e.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{e.salary}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 text-sm hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}