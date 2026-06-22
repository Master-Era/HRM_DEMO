const records = [
  { name: 'Raj Patel',   date: '17 Jun 2025', in: '09:02 AM', out: '06:15 PM', hours: '9h 13m', status: 'Present' },
  { name: 'Priya Shah',  date: '17 Jun 2025', in: '09:30 AM', out: '06:00 PM', hours: '8h 30m', status: 'Present' },
  { name: 'Amit Desai',  date: '17 Jun 2025', in: '08:55 AM', out: '06:30 PM', hours: '9h 35m', status: 'Present' },
  { name: 'Vivek Modi',  date: '17 Jun 2025', in: '—',        out: '—',        hours: '—',      status: 'Absent' },
  { name: 'Neha Joshi',  date: '17 Jun 2025', in: '10:10 AM', out: '05:45 PM', hours: '7h 35m', status: 'Late' },
  { name: 'Sonal Mehta', date: '17 Jun 2025', in: '09:00 AM', out: '06:00 PM', hours: '9h 00m', status: 'Present' },
]

export default function Attendance() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Attendance – Today</h2>
        <span className="text-gray-500 text-sm">17 June 2025</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Present', value: '4', color: 'bg-green-100 text-green-700' },
          { label: 'Absent',  value: '1', color: 'bg-red-100 text-red-700' },
          { label: 'Late',    value: '1', color: 'bg-yellow-100 text-yellow-700' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <p className={`text-3xl font-bold ${s.color.split(' ')[1]} mb-1`}>{s.value}</p>
            <p className="text-gray-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Employee','Date','In Time','Out Time','Hours','Status'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {records.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{r.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{r.date}</td>
                <td className="px-6 py-4 text-sm">{r.in}</td>
                <td className="px-6 py-4 text-sm">{r.out}</td>
                <td className="px-6 py-4 text-sm">{r.hours}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${r.status === 'Present' ? 'bg-green-100 text-green-700'
                    : r.status === 'Absent' ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}