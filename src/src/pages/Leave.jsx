import { useState } from 'react'

const leaves = [
  { emp: 'Vivek Modi',  type: 'Sick Leave',   from: '15 Jun', to: '17 Jun', days: 3, status: 'Approved' },
  { emp: 'Priya Shah',  type: 'Casual Leave', from: '20 Jun', to: '20 Jun', days: 1, status: 'Pending' },
  { emp: 'Raj Patel',   type: 'Annual Leave', from: '25 Jun', to: '28 Jun', days: 4, status: 'Pending' },
  { emp: 'Neha Joshi',  type: 'Casual Leave', from: '30 Jun', to: '30 Jun', days: 1, status: 'Rejected' },
]

export default function Leave() {
  const [list, setList] = useState(leaves)

  const update = (i, status) =>
    setList(prev => prev.map((l, idx) => idx === i ? { ...l, status } : l))

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Leave Management</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Employee','Type','From','To','Days','Status','Action'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((l, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{l.emp}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{l.type}</td>
                <td className="px-6 py-4 text-sm">{l.from}</td>
                <td className="px-6 py-4 text-sm">{l.to}</td>
                <td className="px-6 py-4 text-sm">{l.days}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${l.status === 'Approved' ? 'bg-green-100 text-green-700'
                    : l.status === 'Rejected' ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'}`}>
                    {l.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {l.status === 'Pending' && <>
                    <button onClick={() => update(i, 'Approved')}
                      className="text-green-600 text-xs font-medium hover:underline">Approve</button>
                    <button onClick={() => update(i, 'Rejected')}
                      className="text-red-500 text-xs font-medium hover:underline">Reject</button>
                  </>}
                  {l.status !== 'Pending' && <span className="text-gray-400 text-xs">Done</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}