const payroll = [
  { emp: 'Raj Patel',   basic: 30000, hra: 5000, pf: 1800, tds: 2000, net: 31200 },
  { emp: 'Priya Shah',  basic: 24000, hra: 4000, pf: 1440, tds: 1200, net: 25360 },
  { emp: 'Amit Desai',  basic: 36000, hra: 6000, pf: 2160, tds: 3000, net: 36840 },
  { emp: 'Neha Joshi',  basic: 26000, hra: 4500, pf: 1560, tds: 1500, net: 27440 },
  { emp: 'Vivek Modi',  basic: 22000, hra: 3500, pf: 1320, tds: 1000, net: 23180 },
  { emp: 'Sonal Mehta', basic: 20000, hra: 3000, pf: 1200, tds:  800, net: 21000 },
]

export default function Payroll() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Payroll – June 2025</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Generate Payslips
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Employee','Basic','HRA','PF Deduct','TDS','Net Salary','Payslip'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {payroll.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{p.emp}</td>
                <td className="px-6 py-4 text-sm">₹{p.basic.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">₹{p.hra.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-red-500">-₹{p.pf.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-red-500">-₹{p.tds.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold text-green-700">₹{p.net.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 text-xs font-medium hover:underline">Download PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}