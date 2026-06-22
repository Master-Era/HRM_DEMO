import { useMemo, useState } from 'react'
import {
  FiActivity,
  FiAward,
  FiBell,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiEye,
  FiFileText,
  FiHome,
  FiLayers,
  FiMenu,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiSettings,
  FiShield,
  FiTrash2,
  FiTrendingUp,
  FiUpload,
  FiUserCheck,
  FiUsers,
  FiX,
} from 'react-icons/fi'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './App.css'

const logo = '/master-era-logo.png'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome },
  { id: 'employees', label: 'Employees', icon: FiUsers },
  { id: 'attendance', label: 'Attendance', icon: FiClock },
  { id: 'leave', label: 'Leave', icon: FiCalendar },
  { id: 'payroll', label: 'Payroll', icon: FiBriefcase },
  { id: 'recruitment', label: 'Recruitment', icon: FiUserCheck },
  { id: 'performance', label: 'Performance', icon: FiAward },
  { id: 'documents', label: 'Documents', icon: FiFileText },
  { id: 'requests', label: 'Requests', icon: FiBell },
  { id: 'settings', label: 'Settings', icon: FiSettings },
]

const employeeNavItems = [
  { id: 'employeeDashboard', label: 'My Dashboard', icon: FiHome },
  { id: 'employeeProfile', label: 'My Profile', icon: FiUsers },
  { id: 'employeeAttendance', label: 'My Attendance', icon: FiClock },
  { id: 'employeeLeave', label: 'My Leave', icon: FiCalendar },
  { id: 'employeePayslip', label: 'My Payslip', icon: FiBriefcase },
  { id: 'employeeDocuments', label: 'My Documents', icon: FiFileText },
  { id: 'employeeRequests', label: 'My Requests', icon: FiBell },
]

const initialEmployees = [
  { id: 'ME-101', name: 'Raj Patel', email: 'raj@masterera.in', phone: '9876543210', role: 'Sales Manager', dept: 'Sales', branch: 'Ahmedabad', status: 'Active', salary: 56000, joined: '12 Jan 2023', score: 94 },
  { id: 'ME-102', name: 'Priya Shah', email: 'priya@masterera.in', phone: '9876543211', role: 'HR Executive', dept: 'Human Resource', branch: 'Surat', status: 'Active', salary: 42000, joined: '03 Mar 2022', score: 89 },
  { id: 'ME-103', name: 'Amit Desai', email: 'amit@masterera.in', phone: '9876543212', role: 'Frontend Developer', dept: 'Technology', branch: 'Vadodara', status: 'Active', salary: 74000, joined: '18 Jul 2021', score: 96 },
  { id: 'ME-104', name: 'Neha Joshi', email: 'neha@masterera.in', phone: '9876543213', role: 'Finance Analyst', dept: 'Finance', branch: 'Ahmedabad', status: 'Late Today', salary: 51000, joined: '25 Oct 2022', score: 84 },
  { id: 'ME-105', name: 'Vivek Modi', email: 'vivek@masterera.in', phone: '9876543214', role: 'Operations Lead', dept: 'Operations', branch: 'Rajkot', status: 'On Leave', salary: 61000, joined: '09 May 2020', score: 87 },
  { id: 'ME-106', name: 'Sonal Mehta', email: 'sonal@masterera.in', phone: '9876543215', role: 'Admin Coordinator', dept: 'Admin', branch: 'Surat', status: 'Active', salary: 38000, joined: '30 Nov 2023', score: 91 },
]

const initialAttendance = [
  { name: 'Raj Patel', date: '20 Jun 2026', monthKey: '2026-06', in: '09:01 AM', out: '06:14 PM', hours: '9h 13m', status: 'Present' },
  { name: 'Priya Shah', date: '20 Jun 2026', monthKey: '2026-06', in: '09:18 AM', out: '06:03 PM', hours: '8h 45m', status: 'Present' },
  { name: 'Amit Desai', date: '20 Jun 2026', monthKey: '2026-06', in: '08:52 AM', out: '06:28 PM', hours: '9h 36m', status: 'Present' },
  { name: 'Neha Joshi', date: '20 Jun 2026', monthKey: '2026-06', in: '10:08 AM', out: '05:50 PM', hours: '7h 42m', status: 'Late' },
  { name: 'Vivek Modi', date: '20 Jun 2026', monthKey: '2026-06', in: '-', out: '-', hours: '-', status: 'Leave' },
  { name: 'Sonal Mehta', date: '20 Jun 2026', monthKey: '2026-06', in: '09:05 AM', out: '06:01 PM', hours: '8h 56m', status: 'Present' },
  { name: 'Raj Patel', date: '18 Jan 2026', monthKey: '2026-01', in: '09:10 AM', out: '06:05 PM', hours: '8h 55m', status: 'Present' },
  { name: 'Priya Shah', date: '18 Jan 2026', monthKey: '2026-01', in: '09:28 AM', out: '06:00 PM', hours: '8h 32m', status: 'Present' },
  { name: 'Amit Desai', date: '18 Jan 2026', monthKey: '2026-01', in: '09:42 AM', out: '06:20 PM', hours: '8h 38m', status: 'Late' },
  { name: 'Neha Joshi', date: '18 Jan 2026', monthKey: '2026-01', in: '-', out: '-', hours: '-', status: 'Absent' },
  { name: 'Vivek Modi', date: '18 Jan 2026', monthKey: '2026-01', in: '08:58 AM', out: '06:10 PM', hours: '9h 12m', status: 'Present' },
  { name: 'Sonal Mehta', date: '18 Jan 2026', monthKey: '2026-01', in: '09:04 AM', out: '06:02 PM', hours: '8h 58m', status: 'Present' },
]

function buildMonthAttendance(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  const daysInMonth = new Date(year, month, 0).getDate()
  const rows = []

  initialEmployees.forEach((employee, employeeIndex) => {
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month - 1, day)
      if ([0, 6].includes(date.getDay())) continue

      const absent = (day + employeeIndex * 3) % 19 === 0
      const leave = (day + employeeIndex * 5) % 23 === 0
      const late = !absent && !leave && (day + employeeIndex) % 8 === 0
      const status = absent ? 'Absent' : leave ? 'Leave' : late ? 'Late' : 'Present'
      const inMinute = late ? 48 + employeeIndex : 2 + ((day + employeeIndex * 4) % 17)
      const outMinute = 1 + ((day * 3 + employeeIndex * 5) % 28)

      rows.push({
        name: employee.name,
        date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        monthKey,
        in: ['Absent', 'Leave'].includes(status) ? '-' : `09:${String(inMinute).padStart(2, '0')} AM`,
        out: ['Absent', 'Leave'].includes(status) ? '-' : `06:${String(outMinute).padStart(2, '0')} PM`,
        hours: ['Absent', 'Leave'].includes(status) ? '-' : late ? '8h 12m' : '8h 56m',
        status,
      })
    }
  })

  return rows
}

const initialLeaves = [
  { id: 'LV-1001', employee: 'Vivek Modi', type: 'Sick Leave', from: '20 Jun 2026', to: '22 Jun 2026', days: 3, reason: 'Fever and doctor rest', status: 'Approved' },
  { id: 'LV-1002', employee: 'Priya Shah', type: 'Casual Leave', from: '24 Jun 2026', to: '24 Jun 2026', days: 1, reason: 'Family function', status: 'Pending' },
  { id: 'LV-1003', employee: 'Raj Patel', type: 'Annual Leave', from: '28 Jun 2026', to: '30 Jun 2026', days: 3, reason: 'Personal travel', status: 'Pending' },
  { id: 'LV-1004', employee: 'Neha Joshi', type: 'Work From Home', from: '21 Jun 2026', to: '21 Jun 2026', days: 1, reason: 'Client call from home', status: 'Rejected' },
]

const leaveTypes = ['Sick Leave', 'Casual Leave', 'Annual Leave', 'Paid Leave', 'Unpaid Leave', 'Maternity Leave', 'Paternity Leave', 'Comp Off', 'Work From Home', 'Emergency Leave']

const hiringPipeline = [
  { stage: 'Applied', value: 84 },
  { stage: 'Screening', value: 42 },
  { stage: 'Interview', value: 18 },
  { stage: 'Offer', value: 7 },
  { stage: 'Joined', value: 4 },
]

const headcount = [
  { month: 'Jan', employees: 42, payroll: 24 },
  { month: 'Feb', employees: 44, payroll: 25 },
  { month: 'Mar', employees: 47, payroll: 27 },
  { month: 'Apr', employees: 46, payroll: 26 },
  { month: 'May', employees: 49, payroll: 29 },
  { month: 'Jun', employees: 52, payroll: 31 },
]

const attendanceTrend = [
  { day: 'Mon', present: 91 },
  { day: 'Tue', present: 94 },
  { day: 'Wed', present: 89 },
  { day: 'Thu', present: 96 },
  { day: 'Fri', present: 92 },
  { day: 'Sat', present: 88 },
]

const deptSplit = [
  { name: 'Tech', value: 28, color: '#0c55bd' },
  { name: 'Sales', value: 24, color: '#f15a24' },
  { name: 'HR', value: 14, color: '#22c55e' },
  { name: 'Finance', value: 16, color: '#6366f1' },
  { name: 'Ops', value: 18, color: '#eab308' },
]

const documents = [
  { name: 'Employee Offer Letter', owner: 'HR Team', category: 'Joining', updated: '18 Jun 2026', status: 'Ready' },
  { name: 'Salary Slip Template', owner: 'Payroll Team', category: 'Payroll', updated: '16 Jun 2026', status: 'Ready' },
  { name: 'Leave Policy 2026', owner: 'Admin', category: 'Policy', updated: '12 Jun 2026', status: 'Review' },
  { name: 'Experience Letter', owner: 'HR Team', category: 'Exit', updated: '08 Jun 2026', status: 'Ready' },
]

const companyInfo = {
  name: 'Client Company Pvt. Ltd.',
  contact: '+91 98765 43210',
  email: 'hr@clientcompany.com',
  address: 'Client Company Address, Ahmedabad, Gujarat',
}

const complianceItems = [
  { name: 'PF', detail: 'Employee and employer PF deduction monthly payroll ma calculate thashe.', status: 'Configured' },
  { name: 'ESI', detail: 'Salary eligibility pramane ESI contribution auto apply thashe.', status: 'Configured' },
  { name: 'PT', detail: 'State wise Professional Tax slab pramane deduction thashe.', status: 'Review' },
  { name: 'TDS', detail: 'Employee declaration and tax slab pramane TDS estimate thashe.', status: 'Configured' },
]

const payslipMonths = ['June 2026', 'May 2026', 'April 2026', 'March 2026', 'February 2026', 'January 2026']

const leaveBalances = [
  { type: 'Sick Leave', total: 12, used: 3 },
  { type: 'Casual Leave', total: 10, used: 2 },
  { type: 'Paid Leave', total: 18, used: 4 },
  { type: 'Comp Off', total: 4, used: 1 },
]

const initialRequests = [
  { id: 'REQ-1001', employee: 'Priya Shah', type: 'Payroll Help', title: 'May payslip download issue', priority: 'Medium', details: 'Employee cannot download May payslip.', status: 'In Review', reply: 'HR is checking payroll document access.', action: 'Assigned to payroll team' },
  { id: 'REQ-1002', employee: 'Amit Desai', type: 'Attendance Correction', title: 'Wrong punch out time', priority: 'High', details: 'Punch out should be 06:28 PM.', status: 'Resolved', reply: 'Attendance updated after manager approval.', action: 'Corrected attendance record' },
]

function money(value) {
  return `Rs. ${value.toLocaleString('en-IN')}`
}

function downloadDemoFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function StatusBadge({ status }) {
  const tone = {
    Active: 'badge green',
    Present: 'badge green',
    Approved: 'badge green',
    Ready: 'badge green',
    Pending: 'badge amber',
    Review: 'badge amber',
    'Late Today': 'badge amber',
    Late: 'badge amber',
    Leave: 'badge blue',
    'On Leave': 'badge blue',
    'In Review': 'badge blue',
    Resolved: 'badge green',
    Absent: 'badge red',
    Rejected: 'badge red',
  }[status] || 'badge'

  return <span className={tone}>{status}</span>
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  )
}

function Modal({ title, subtitle, children, onClose }) {
  return (
    <div className="modal-layer" role="dialog" aria-modal="true">
      <button className="modal-backdrop" onClick={onClose} aria-label="Close modal" />
      <section className="modal-card">
        <div className="modal-head">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close modal">
            <FiX />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function Sidebar({ page, setPage, open, setOpen, portalMode }) {
  const menuItems = portalMode === 'employee' ? employeeNavItems : navItems

  return (
    <>
      <button className="mobile-menu" onClick={() => setOpen(true)} aria-label="Open menu">
        <FiMenu />
      </button>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <img src={logo} alt="Master Era Digital Solutions" />
          <div>
            <strong>Master Era</strong>
            <span>Cloud HRMS</span>
          </div>
          <button className="close-menu" onClick={() => setOpen(false)} aria-label="Close menu">
            <FiX />
          </button>
        </div>
        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={page === item.id ? 'active' : ''}
                onClick={() => {
                  setPage(item.id)
                  setOpen(false)
                }}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
        <div className="demo-card">
          <FiShield />
          <div>
            <strong>{portalMode === 'employee' ? 'Employee Side' : 'HR Side'}</strong>
            <span>Same URL ma HR admin and employee self-service demo.</span>
          </div>
        </div>
      </aside>
      {open && <button className="scrim" onClick={() => setOpen(false)} aria-label="Close navigation" />}
    </>
  )
}

function Topbar({ page, portalMode, onTogglePortal, onNewRequest, notifications, onShowNotifications }) {
  const menuItems = portalMode === 'employee' ? employeeNavItems : navItems
  const title = menuItems.find((item) => item.id === page)?.label || 'Dashboard'
  const showRequestButton = page === 'dashboard' || page === 'employeeDashboard'

  return (
    <header className="topbar">
      <div>
        <span className="eyebrow">Master Era HRMS</span>
        <h1>{title}</h1>
      </div>
      <div className="top-actions">
        <button className="portal-switch" onClick={onTogglePortal}>
          {portalMode === 'employee' ? 'HR Side' : 'Employee Side'}
        </button>
        <label className="search">
          <FiSearch />
          <input placeholder="Search employee, policy, payroll..." />
        </label>
        <button className="icon-button notify-button" onClick={onShowNotifications} aria-label="Notifications">
          <FiBell />
          {notifications.length > 0 && <span>{notifications.length}</span>}
        </button>
        {showRequestButton && (
          <button className="primary-button" onClick={onNewRequest}>
            <FiPlus />
            <span>{portalMode === 'employee' ? 'Raise Request' : 'New Request'}</span>
          </button>
        )}
      </div>
    </header>
  )
}

function NewRequestModal({ page, employees, onClose, onSubmit }) {
  const [form, setForm] = useState({
    requestType: page === 'leave' ? 'Leave Request' : page === 'payroll' ? 'Payroll Correction' : page === 'documents' ? 'Document Request' : 'General HR Request',
    employee: employees[0]?.name || '',
    title: '',
    priority: 'Medium',
    details: '',
  })

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <Modal title="New HR Request" subtitle="Client demo: HR request create thay pachhi notification ma entry add thay che." onClose={onClose}>
      <form className="form-grid" onSubmit={(event) => {
        event.preventDefault()
        onSubmit(form)
      }}>
        <Field label="Request Type">
          <select value={form.requestType} onChange={(event) => update('requestType', event.target.value)}>
            <option>General HR Request</option>
            <option>Leave Request</option>
            <option>Payroll Correction</option>
            <option>Document Request</option>
            <option>Attendance Correction</option>
            <option>Recruitment Request</option>
          </select>
        </Field>
        <Field label="Employee">
          <select value={form.employee} onChange={(event) => update('employee', event.target.value)}>
            {employees.map((employee) => <option key={employee.id}>{employee.name}</option>)}
          </select>
        </Field>
        <Field label="Request Title">
          <input value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="Example: Salary slip correction" required />
        </Field>
        <Field label="Priority">
          <select value={form.priority} onChange={(event) => update('priority', event.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </Field>
        <Field label="Details">
          <textarea value={form.details} onChange={(event) => update('details', event.target.value)} placeholder="Short request detail for HR team" required />
        </Field>
        <div className="form-actions">
          <button type="button" className="ghost-button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="submit">Submit Request</button>
        </div>
      </form>
    </Modal>
  )
}

function NotificationsModal({ notifications, onClose }) {
  return (
    <Modal title="Notifications" subtitle="Demo alerts for client presentation." onClose={onClose}>
      <div className="notification-list">
        {notifications.map((item) => (
          <div className="notification-item" key={item.id}>
            <FiBell />
            <div>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}

function StatCard({ icon: Icon, label, value, meta, tone = 'blue' }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{meta}</small>
      </div>
    </article>
  )
}

function Panel({ title, action, children, className = '' }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function DataTable({ columns, rows, renderRow }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  )
}

function Dashboard({ employees, leaves }) {
  return (
    <div className="page-stack">
      <section className="hero-band">
        <div>
          <span>React HRM Demo</span>
          <h2>Complete HRM frontend for employees, attendance, payroll, leave and HR operations.</h2>
          <p>Master Era branded client preview. Buttons show simple frontend logic for demo.</p>
        </div>
        <div className="hero-logo">
          <img src={logo} alt="Master Era logo" />
        </div>
      </section>

      <div className="stats-grid">
        <StatCard icon={FiUsers} label="Total Employees" value={employees.length} meta="Live from frontend state" tone="blue" />
        <StatCard icon={FiClock} label="Today Present" value="88%" meta="Attendance demo data" tone="green" />
        <StatCard icon={FiCalendar} label="Leave Requests" value={leaves.length} meta={`${leaves.filter((leave) => leave.status === 'Pending').length} pending approval`} tone="amber" />
        <StatCard icon={FiBriefcase} label="Monthly Payroll" value="Rs. 31.4L" meta="June 2026 cycle" tone="red" />
      </div>

      <div className="grid-two">
        <Panel title="Headcount and Payroll">
          <ResponsiveContainer width="100%" height={270}>
            <AreaChart data={headcount}>
              <defs>
                <linearGradient id="employeeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0c55bd" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0c55bd" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area dataKey="employees" stroke="#0c55bd" fill="url(#employeeFill)" strokeWidth={3} />
              <Line dataKey="payroll" stroke="#f15a24" strokeWidth={3} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Department Split">
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie data={deptSplit} innerRadius={58} outerRadius={92} dataKey="value" paddingAngle={4}>
                {deptSplit.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend">
            {deptSplit.map((item) => (
              <span key={item.name}><i style={{ background: item.color }} />{item.name}</span>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Today Workflow">
        <div className="workflow">
          {[
            ['Add Employee', 'Employees page ma Add Employee click karta form open thay ane employee table ma add thay.', FiUsers],
            ['New Request', 'Any page thi HR request create thay ane notification ma alert add thay.', FiPlus],
            ['Attendance Search', 'Month/date select kari 6 month old attendance demo data joi shakay.', FiCalendar],
            ['Leave Approval', 'Employee leave nakhe, HR table ma joye, View thi history check kare.', FiCheckCircle],
          ].map(([title, text, Icon]) => (
            <div className="workflow-item" key={title}>
              <Icon />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function AddEmployeeModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    dept: 'Technology',
    branch: 'Ahmedabad',
    salary: '',
    joined: '20 Jun 2026',
  })

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <Modal title="Add Employee" subtitle="Demo form: submit karta employee directory ma new row add thashe." onClose={onClose}>
      <form className="form-grid" onSubmit={(event) => {
        event.preventDefault()
        onAdd(form)
      }}>
        <Field label="Full Name"><input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Example: Kiran Parmar" required /></Field>
        <Field label="Email"><input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="employee@company.com" required /></Field>
        <Field label="Mobile Number"><input value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="9876543210" required /></Field>
        <Field label="Designation"><input value={form.role} onChange={(event) => update('role', event.target.value)} placeholder="React Developer" required /></Field>
        <Field label="Department">
          <select value={form.dept} onChange={(event) => update('dept', event.target.value)}>
            <option>Technology</option>
            <option>Human Resource</option>
            <option>Sales</option>
            <option>Finance</option>
            <option>Operations</option>
            <option>Admin</option>
          </select>
        </Field>
        <Field label="Branch">
          <select value={form.branch} onChange={(event) => update('branch', event.target.value)}>
            <option>Ahmedabad</option>
            <option>Surat</option>
            <option>Vadodara</option>
            <option>Rajkot</option>
            <option>Remote</option>
          </select>
        </Field>
        <Field label="Monthly Salary"><input type="number" value={form.salary} onChange={(event) => update('salary', event.target.value)} placeholder="45000" required /></Field>
        <Field label="Joining Date"><input value={form.joined} onChange={(event) => update('joined', event.target.value)} required /></Field>
        <div className="form-actions">
          <button type="button" className="ghost-button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="submit">Save Employee</button>
        </div>
      </form>
    </Modal>
  )
}

function Employees({ employees, onAddEmployee }) {
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const filtered = useMemo(() => (
    employees.filter((employee) => (
      employee.name.toLowerCase().includes(query.toLowerCase()) ||
      employee.dept.toLowerCase().includes(query.toLowerCase()) ||
      employee.role.toLowerCase().includes(query.toLowerCase()) ||
      employee.email.toLowerCase().includes(query.toLowerCase())
    ))
  ), [employees, query])

  return (
    <div className="page-stack">
      <div className="section-tools">
        <label className="search wide">
          <FiSearch />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search employees..." />
        </label>
        <button className="primary-button" onClick={() => setShowAdd(true)}><FiPlus /> Add Employee</button>
      </div>
      <Panel title="Employee Directory" action={<button className="ghost-button"><FiDownload /> Export</button>}>
        <DataTable
          columns={['Employee', 'Contact', 'Department', 'Branch', 'Joined', 'Salary', 'Score', 'Status']}
          rows={filtered}
          renderRow={(employee) => (
            <tr key={employee.id}>
              <td>
                <div className="person">
                  <span>{employee.name.split(' ').map((part) => part[0]).join('')}</span>
                  <div><strong>{employee.name}</strong><small>{employee.id} - {employee.role}</small></div>
                </div>
              </td>
              <td><strong>{employee.email}</strong><small className="table-subtext">{employee.phone}</small></td>
              <td>{employee.dept}</td>
              <td>{employee.branch}</td>
              <td>{employee.joined}</td>
              <td>{money(employee.salary)}</td>
              <td><div className="meter"><i style={{ width: `${employee.score}%` }} />{employee.score}%</div></td>
              <td><StatusBadge status={employee.status} /></td>
            </tr>
          )}
        />
      </Panel>
      {showAdd && <AddEmployeeModal onClose={() => setShowAdd(false)} onAdd={(form) => {
        onAddEmployee(form)
        setShowAdd(false)
      }} />}
    </div>
  )
}

function Attendance() {
  const [month, setMonth] = useState('2026-06')
  const [employee, setEmployee] = useState('All Employees')
  const [searchMonth, setSearchMonth] = useState('2026-06')
  const [searchEmployee, setSearchEmployee] = useState('All Employees')
  const [hasSearched, setHasSearched] = useState(false)
  const monthRows = useMemo(() => buildMonthAttendance(searchMonth), [searchMonth])
  const visibleRows = (hasSearched ? monthRows : initialAttendance.filter((record) => record.monthKey === '2026-06'))
    .filter((record) => searchEmployee === 'All Employees' || record.name === searchEmployee)
  const todayRows = initialAttendance.filter((record) => record.monthKey === '2026-06')
  const presentCount = visibleRows.filter((row) => row.status === 'Present').length
  const lateCount = visibleRows.filter((row) => row.status === 'Late').length
  const leaveCount = visibleRows.filter((row) => ['Leave', 'Absent'].includes(row.status)).length
  const attendanceTitle = hasSearched
    ? `${searchEmployee === 'All Employees' ? 'All Employees' : searchEmployee} - ${searchMonth} Attendance`
    : 'Today Attendance'

  return (
    <div className="page-stack attendance-page">
      <div className="stats-grid three">
        <StatCard icon={FiCheckCircle} label="Present" value={presentCount} meta="Selected search result" tone="green" />
        <StatCard icon={FiClock} label="Late" value={lateCount} meta="After grace period" tone="amber" />
        <StatCard icon={FiCalendar} label="Leave/Absent" value={leaveCount} meta="Leave and absent count" tone="blue" />
      </div>
      <Panel title="Attendance Search" action={<button className="ghost-button" onClick={() => {
        setMonth('2026-06')
        setEmployee('All Employees')
        setSearchMonth('2026-06')
        setSearchEmployee('All Employees')
        setHasSearched(false)
      }}><FiRefreshCw /> Original Data</button>}>
        <div className="attendance-search-grid">
          <Field label="Employee">
            <select value={employee} onChange={(event) => {
              setEmployee(event.target.value)
            }}>
              <option>All Employees</option>
              {initialEmployees.map((item) => <option key={item.id}>{item.name}</option>)}
            </select>
          </Field>
          <Field label="Month and Year">
            <input type="month" value={month} onChange={(event) => {
              setMonth(event.target.value)
            }} />
          </Field>
          <button className="primary-button attendance-search-button" onClick={() => {
            setSearchMonth(month)
            setSearchEmployee(employee)
            setHasSearched(true)
          }}>
            <FiSearch />
            Search
          </button>
          <div className="demo-note">
            <FiCalendar />
            <span>Example: January 2026 select karo to 6 months ago attendance data dekhase.</span>
          </div>
        </div>
      </Panel>
      <div className="attendance-layout single">
        <Panel title="Weekly Attendance" className="attendance-chart-panel">
          <div className="chart-summary">
            <div>
              <span>Average Attendance</span>
              <strong>92%</strong>
            </div>
            <StatusBadge status="Present" />
          </div>
          <ResponsiveContainer width="100%" height={390}>
            <BarChart data={attendanceTrend} margin={{ top: 22, right: 24, left: 0, bottom: 8 }}>
              <defs>
                <linearGradient id="attendanceBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f15a24" stopOpacity={1} />
                  <stop offset="52%" stopColor="#e34c25" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0c55bd" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#dbe5f1" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip cursor={{ fill: 'rgba(12, 85, 189, 0.06)' }} />
              <Bar dataKey="present" fill="url(#attendanceBar)" radius={[8, 8, 0, 0]} maxBarSize={78} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>
      <Panel title={attendanceTitle} className="today-attendance-panel">
        <div className="attendance-table complete">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Total Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(hasSearched ? visibleRows : todayRows).map((record) => (
                <tr key={`today-${record.name}-${record.date}`}>
                  <td>
                    <div className="person compact">
                      <span>{record.name.split(' ').map((part) => part[0]).join('')}</span>
                      <div><strong>{record.name}</strong><small>Employee attendance</small></div>
                    </div>
                  </td>
                  <td>{record.date}</td>
                  <td>{record.in}</td>
                  <td>{record.out}</td>
                  <td>{record.hours}</td>
                  <td><StatusBadge status={record.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}

function LeaveRequestModal({ employees, onClose, onSubmit }) {
  const [form, setForm] = useState({
    employee: employees[0]?.name || '',
    type: 'Sick Leave',
    from: '25 Jun 2026',
    to: '25 Jun 2026',
    days: 1,
    reason: '',
  })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <Modal title="Employee Leave Request" subtitle="Employee leave nakhse, HR ne pending request table ma dekhashe." onClose={onClose}>
      <form className="form-grid" onSubmit={(event) => {
        event.preventDefault()
        onSubmit(form)
      }}>
        <Field label="Employee">
          <select value={form.employee} onChange={(event) => update('employee', event.target.value)}>
            {employees.map((item) => <option key={item.id}>{item.name}</option>)}
          </select>
        </Field>
        <Field label="Leave Type">
          <select value={form.type} onChange={(event) => update('type', event.target.value)}>
            {leaveTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </Field>
        <Field label="From Date"><input value={form.from} onChange={(event) => update('from', event.target.value)} required /></Field>
        <Field label="To Date"><input value={form.to} onChange={(event) => update('to', event.target.value)} required /></Field>
        <Field label="Total Days"><input type="number" min="1" value={form.days} onChange={(event) => update('days', Number(event.target.value))} required /></Field>
        <Field label="Reason"><textarea value={form.reason} onChange={(event) => update('reason', event.target.value)} placeholder="Reason for leave" required /></Field>
        <div className="form-actions">
          <button type="button" className="ghost-button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="submit">Apply Leave</button>
        </div>
      </form>
    </Modal>
  )
}

function LeaveViewModal({ leave, allLeaves, onClose }) {
  const employeeLeaves = allLeaves.filter((item) => item.employee === leave.employee)
  return (
    <Modal title={`${leave.employee} Leave History`} subtitle="HR View: selected employee ni complete leave management detail." onClose={onClose}>
      <div className="detail-grid">
        <div><span>Current Leave</span><strong>{leave.type}</strong></div>
        <div><span>Current Status</span><StatusBadge status={leave.status} /></div>
        <div><span>From</span><strong>{leave.from}</strong></div>
        <div><span>To</span><strong>{leave.to}</strong></div>
        <div><span>Days</span><strong>{leave.days}</strong></div>
        <div><span>Reason</span><strong>{leave.reason}</strong></div>
      </div>
      <DataTable
        columns={['Leave Type', 'From', 'To', 'Days', 'Status']}
        rows={employeeLeaves}
        renderRow={(item) => (
          <tr key={item.id}>
            <td>{item.type}</td>
            <td>{item.from}</td>
            <td>{item.to}</td>
            <td>{item.days}</td>
            <td><StatusBadge status={item.status} /></td>
          </tr>
        )}
      />
    </Modal>
  )
}

function Leave({ employees, leaves, setLeaves, addNotification }) {
  const [showApply, setShowApply] = useState(false)
  const [viewLeave, setViewLeave] = useState(null)
  const updateStatus = (id, status) => {
    setLeaves((current) => current.map((item) => item.id === id ? { ...item, status } : item))
    addNotification('Leave status updated', `${id} is now ${status}.`)
  }

  return (
    <div className="page-stack">
      <div className="stats-grid three">
        <StatCard icon={FiCalendar} label="Annual Balance" value="148" meta="Team leave days left" tone="blue" />
        <StatCard icon={FiActivity} label="Pending" value={leaves.filter((leave) => leave.status === 'Pending').length} meta="Needs HR approval" tone="amber" />
        <StatCard icon={FiCheckCircle} label="Approved" value={leaves.filter((leave) => leave.status === 'Approved').length} meta="Approved requests" tone="green" />
      </div>
      <Panel title="Leave Requests" action={<button className="primary-button" onClick={() => setShowApply(true)}><FiPlus /> Apply Leave</button>}>
        <div className="leave-types">
          {leaveTypes.map((type) => <span key={type}>{type}</span>)}
        </div>
        <DataTable
          columns={['Employee', 'Type', 'From', 'To', 'Days', 'Reason', 'Status', 'Action']}
          rows={leaves}
          renderRow={(leave) => (
            <tr key={leave.id}>
              <td><strong>{leave.employee}</strong><small className="table-subtext">{leave.id}</small></td>
              <td>{leave.type}</td>
              <td>{leave.from}</td>
              <td>{leave.to}</td>
              <td>{leave.days}</td>
              <td>{leave.reason}</td>
              <td><StatusBadge status={leave.status} /></td>
              <td>
                <div className="row-actions wrap">
                  <button onClick={() => setViewLeave(leave)}><FiEye /> View</button>
                  {leave.status === 'Pending' && <>
                    <button onClick={() => updateStatus(leave.id, 'Approved')}>Approve</button>
                    <button onClick={() => updateStatus(leave.id, 'Rejected')}>Reject</button>
                  </>}
                </div>
              </td>
            </tr>
          )}
        />
      </Panel>
      {showApply && <LeaveRequestModal employees={employees} onClose={() => setShowApply(false)} onSubmit={(form) => {
        const nextLeave = { ...form, id: `LV-${1000 + leaves.length + 1}`, status: 'Pending' }
        setLeaves((current) => [nextLeave, ...current])
        addNotification('New leave request', `${form.employee} applied ${form.type}.`)
        setShowApply(false)
      }} />}
      {viewLeave && <LeaveViewModal leave={viewLeave} allLeaves={leaves} onClose={() => setViewLeave(null)} />}
    </div>
  )
}

function Payroll({ employees }) {
  const [selectedPayslip, setSelectedPayslip] = useState(null)
  const payroll = employees.map((employee, index) => {
    const basic = employee.salary
    const hra = Math.round(basic * 0.22)
    const allowance = [4200, 3600, 5800, 3300, 4500, 2800, 3200, 4100][index] || 3000
    const pf = Math.round(basic * 0.12)
    const tax = Math.round(basic * 0.06)
    return { employee: employee.name, dept: employee.dept, basic, hra, allowance, pf, tax, net: basic + hra + allowance - pf - tax }
  })
  const totalNet = payroll.reduce((sum, item) => sum + item.net, 0)

  return (
    <div className="page-stack">
      <div className="stats-grid three">
        <StatCard icon={FiBriefcase} label="Net Payable" value={money(totalNet)} meta="June 2026 payroll" tone="green" />
        <StatCard icon={FiShield} label="PF and Tax" value={money(71860)} meta="Deductions calculated" tone="red" />
        <StatCard icon={FiFileText} label="Payslips" value={employees.length} meta="Ready to generate" tone="blue" />
      </div>
      <Panel title="Payroll Register" action={<button className="primary-button" onClick={() => setSelectedPayslip(payroll[0])}><FiDownload /> Generate Payslips</button>}>
        <DataTable
          columns={['Employee', 'Department', 'Basic', 'HRA', 'Allowance', 'Deductions', 'Net Salary', 'Payslip']}
          rows={payroll}
          renderRow={(row) => (
            <tr key={row.employee}>
              <td><strong>{row.employee}</strong></td>
              <td>{row.dept}</td>
              <td>{money(row.basic)}</td>
              <td>{money(row.hra)}</td>
              <td>{money(row.allowance)}</td>
              <td className="danger">-{money(row.pf + row.tax)}</td>
              <td><strong className="success">{money(row.net)}</strong></td>
              <td><button className="ghost-button small" onClick={() => setSelectedPayslip(row)}>View</button></td>
            </tr>
          )}
        />
      </Panel>
      <Panel title="HR Compliance Setup">
        <div className="process-note">
          <FiShield />
          <div>
            <strong>PF, ESI, PT and TDS kevi rite work karse?</strong>
            <span>Company salary rules configure karse. Payroll run karta eligibility, slab ane employee salary pramane deduction calculate thashe; HR review/approve karya pachhi payslip ane compliance report generate thashe.</span>
          </div>
        </div>
        <div className="compliance-grid">
          {complianceItems.map((item) => (
            <div className="compliance-card" key={item.name}>
              <div>
                <strong>{item.name}</strong>
                <span>{item.detail}</span>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </Panel>
      {selectedPayslip && <PayslipModal payslip={selectedPayslip} onClose={() => setSelectedPayslip(null)} />}
    </div>
  )
}

function PayslipModal({ payslip, onClose }) {
  return (
    <Modal title="Payslip Preview" subtitle="Payslip ma client company nu logo/name/contact/address use thashe." onClose={onClose}>
      <div className="payslip-preview">
        <div className="payslip-company">
          <div className="company-logo-box">LOGO</div>
          <div>
            <h3>{companyInfo.name}</h3>
            <p>{companyInfo.address}</p>
            <p>{companyInfo.contact} | {companyInfo.email}</p>
          </div>
        </div>
        <div className="detail-grid">
          <div><span>Employee</span><strong>{payslip.employee}</strong></div>
          <div><span>Department</span><strong>{payslip.dept}</strong></div>
          <div><span>Month</span><strong>June 2026</strong></div>
          <div><span>Net Salary</span><strong>{money(payslip.net)}</strong></div>
        </div>
        <DataTable
          columns={['Salary Head', 'Amount']}
          rows={[
            ['Basic Salary', money(payslip.basic)],
            ['HRA', money(payslip.hra)],
            ['Allowance', money(payslip.allowance)],
            ['PF Deduction', `-${money(payslip.pf)}`],
            ['Tax Deduction', `-${money(payslip.tax)}`],
            ['Net Salary', money(payslip.net)],
          ]}
          renderRow={([label, value]) => (
            <tr key={label}>
              <td><strong>{label}</strong></td>
              <td>{value}</td>
            </tr>
          )}
        />
        <div className="form-actions">
          <button className="primary-button" type="button" onClick={() => downloadDemoFile(
            `${payslip.employee.replaceAll(' ', '-')}-June-2026-payslip.txt`,
            `${companyInfo.name}\n${companyInfo.address}\n${companyInfo.contact} | ${companyInfo.email}\n\nEmployee: ${payslip.employee}\nDepartment: ${payslip.dept}\nMonth: June 2026\nNet Salary: ${money(payslip.net)}`
          )}><FiDownload /> Download Payslip</button>
        </div>
      </div>
    </Modal>
  )
}

function Recruitment() {
  return (
    <div className="page-stack">
      <div className="stats-grid three">
        <StatCard icon={FiUserCheck} label="Open Positions" value="9" meta="Across 5 departments" tone="blue" />
        <StatCard icon={FiUsers} label="Candidates" value="84" meta="This month" tone="green" />
        <StatCard icon={FiTrendingUp} label="Offer Ratio" value="38%" meta="+7% from last month" tone="amber" />
      </div>
      <Panel title="Hiring Pipeline">
        <div className="process-note">
          <FiUserCheck />
          <div>
            <strong>Recruitment workflow</strong>
            <span>HR job opening create kare, candidate applications collect kare, screening ane interview schedule kare, feedback record kare, offer release kare ane selected candidate ne employee ma convert kare.</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hiringPipeline} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="stage" tickLine={false} axisLine={false} width={88} />
            <Tooltip />
            <Bar dataKey="value" fill="#0c55bd" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  )
}

function Performance({ employees }) {
  return (
    <div className="page-stack">
      <div className="stats-grid three">
        <StatCard icon={FiAward} label="Review Cycle" value="Q2 2026" meta="Quarterly appraisal" tone="blue" />
        <StatCard icon={FiTrendingUp} label="Team Average" value="90%" meta="Latest review score" tone="green" />
        <StatCard icon={FiActivity} label="Goals Due" value="4" meta="Manager follow-up" tone="amber" />
      </div>
      <Panel title="Performance Review">
        <div className="process-note">
          <FiAward />
          <div>
            <strong>Performance page use</strong>
            <span>Employee goals/KPI set thashe, manager rating ane feedback add karse, HR review cycle monitor karse. Final score increment, promotion, training ane improvement plan mate use thashe.</span>
          </div>
        </div>
        <DataTable
          columns={['Employee', 'Role', 'Department', 'Review Score', 'Next Goal']}
          rows={employees}
          renderRow={(employee) => (
            <tr key={employee.id}>
              <td><strong>{employee.name}</strong></td>
              <td>{employee.role}</td>
              <td>{employee.dept}</td>
              <td><div className="meter"><i style={{ width: `${employee.score}%` }} />{employee.score}%</div></td>
              <td>{employee.score > 90 ? 'Leadership track' : 'Skill development plan'}</td>
            </tr>
          )}
        />
      </Panel>
    </div>
  )
}

function Documents() {
  const [items, setItems] = useState(documents)
  const [viewDoc, setViewDoc] = useState(null)

  return (
    <div className="page-stack">
      <Panel title="HR Document Center" action={
        <label className="primary-button file-button">
          <FiUpload /> Upload Document
          <input type="file" onChange={(event) => {
            const file = event.target.files?.[0]
            if (!file) return
            setItems((current) => [{
              name: file.name,
              owner: 'HR Admin',
              category: 'Uploaded',
              updated: '22 Jun 2026',
              status: 'Ready',
            }, ...current])
            event.target.value = ''
          }} />
        </label>
      }>
        <DataTable
          columns={['Document', 'Owner', 'Category', 'Updated', 'Status', 'Action']}
          rows={items}
          renderRow={(document) => (
            <tr key={document.name}>
              <td><strong>{document.name}</strong></td>
              <td>{document.owner}</td>
              <td>{document.category}</td>
              <td>{document.updated}</td>
              <td><StatusBadge status={document.status} /></td>
              <td>
                <div className="row-actions wrap">
                  <button onClick={() => setViewDoc(document)}><FiEye /> View</button>
                  <button onClick={() => downloadDemoFile(document.name, `${document.name}\nOwner: ${document.owner}\nCategory: ${document.category}\nUpdated: ${document.updated}`)}><FiDownload /> Download</button>
                  <button onClick={() => setItems((current) => current.filter((item) => item.name !== document.name))}><FiTrash2 /> Delete</button>
                </div>
              </td>
            </tr>
          )}
        />
      </Panel>
      {viewDoc && (
        <Modal title={viewDoc.name} subtitle="Document preview demo for client." onClose={() => setViewDoc(null)}>
          <div className="document-preview">
            <FiFileText />
            <div>
              <strong>{viewDoc.name}</strong>
              <span>{viewDoc.category} document owned by {viewDoc.owner}. Last updated {viewDoc.updated}.</span>
            </div>
          </div>
          <div className="form-actions">
            <button className="ghost-button" type="button" onClick={() => downloadDemoFile(viewDoc.name, `${viewDoc.name}\n${viewDoc.category} document owned by ${viewDoc.owner}.`)}><FiDownload /> Download</button>
            <button className="primary-button" type="button" onClick={() => setViewDoc(null)}>Close Preview</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Settings() {
  return (
    <div className="page-stack">
      <div className="settings-grid">
        {[
          ['Company Profile', 'Master Era Digital Solutions branding, branches and departments.', FiLayers],
          ['Attendance Rules', 'Shift timing, grace period, biometric sync and remote check-in.', FiClock],
          ['Payroll Setup', 'Salary heads, PF, tax, allowance and payslip templates.', FiBriefcase],
          ['Roles and Access', 'Admin, HR manager, employee and department level permissions.', FiShield],
        ].map(([title, text, Icon]) => (
          <section className="setting-tile" key={title}>
            <Icon />
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function RequestForm({ employee, onSubmit }) {
  const [form, setForm] = useState({
    type: 'Help Request',
    title: '',
    priority: 'Medium',
    details: '',
  })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <form className="form-grid request-form" onSubmit={(event) => {
      event.preventDefault()
      onSubmit(form)
      setForm({ type: 'Help Request', title: '', priority: 'Medium', details: '' })
    }}>
      <Field label="Request Type">
        <select value={form.type} onChange={(event) => update('type', event.target.value)}>
          <option>Help Request</option>
          <option>IT Issue</option>
          <option>Payroll Query</option>
          <option>Attendance Correction</option>
          <option>Document Request</option>
          <option>HR Support</option>
        </select>
      </Field>
      <Field label="Employee">
        <input value={employee.name} readOnly />
      </Field>
      <Field label="Title">
        <input value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="Example: Need salary letter" required />
      </Field>
      <Field label="Priority">
        <select value={form.priority} onChange={(event) => update('priority', event.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </Field>
      <Field label="Issue / Help Detail">
        <textarea value={form.details} onChange={(event) => update('details', event.target.value)} placeholder="Employee issue detail" required />
      </Field>
      <div className="form-actions">
        <button className="primary-button" type="submit">Submit Request</button>
      </div>
    </form>
  )
}

function HRRequests({ requests, setRequests }) {
  const [selected, setSelected] = useState(null)
  const [reply, setReply] = useState('')
  const [action, setAction] = useState('')

  const saveReply = () => {
    setRequests((current) => current.map((request) => request.id === selected.id
      ? { ...request, reply, action, status: 'Resolved' }
      : request))
    setSelected(null)
    setReply('')
    setAction('')
  }

  return (
    <div className="page-stack">
      <div className="stats-grid three">
        <StatCard icon={FiBell} label="Total Requests" value={requests.length} meta="Employee help desk" tone="blue" />
        <StatCard icon={FiActivity} label="In Review" value={requests.filter((request) => request.status === 'In Review').length} meta="HR action pending" tone="amber" />
        <StatCard icon={FiCheckCircle} label="Resolved" value={requests.filter((request) => request.status === 'Resolved').length} meta="Action completed" tone="green" />
      </div>
      <Panel title="Employee Requests">
        <DataTable
          columns={['Request', 'Employee', 'Type', 'Priority', 'Status', 'HR Action']}
          rows={requests}
          renderRow={(request) => (
            <tr key={request.id}>
              <td><strong>{request.title}</strong><small className="table-subtext">{request.id} - {request.details}</small></td>
              <td>{request.employee}</td>
              <td>{request.type}</td>
              <td>{request.priority}</td>
              <td><StatusBadge status={request.status} /></td>
              <td><button className="ghost-button small" onClick={() => {
                setSelected(request)
                setReply(request.reply)
                setAction(request.action)
              }}>Reply</button></td>
            </tr>
          )}
        />
      </Panel>
      {selected && (
        <Modal title={`Reply ${selected.id}`} subtitle="HR employee request par reply/action mention kare." onClose={() => setSelected(null)}>
          <div className="detail-grid">
            <div><span>Employee</span><strong>{selected.employee}</strong></div>
            <div><span>Request</span><strong>{selected.title}</strong></div>
          </div>
          <div className="form-grid">
            <Field label="HR Reply"><textarea value={reply} onChange={(event) => setReply(event.target.value)} /></Field>
            <Field label="Action Taken"><textarea value={action} onChange={(event) => setAction(event.target.value)} /></Field>
            <div className="form-actions">
              <button className="ghost-button" type="button" onClick={() => setSelected(null)}>Cancel</button>
              <button className="primary-button" type="button" onClick={saveReply}>Save Reply</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

function EmployeeDashboard({ employee, leaves }) {
  const myLeaves = leaves.filter((leave) => leave.employee === employee.name)

  return (
    <div className="page-stack">
      <section className="employee-hero">
        <div className="person large">
          <span>{employee.name.split(' ').map((part) => part[0]).join('')}</span>
          <div>
            <strong>Welcome, {employee.name}</strong>
            <small>{employee.role} - {employee.dept}</small>
          </div>
        </div>
        <div className="employee-hero-actions">
          <StatusBadge status={employee.status} />
          <span>{employee.branch}</span>
        </div>
      </section>

      <div className="stats-grid">
        <StatCard icon={FiClock} label="Today Attendance" value="Present" meta="09:01 AM check-in" tone="green" />
        <StatCard icon={FiCalendar} label="Leave Balance" value="18" meta="Paid leave days left" tone="blue" />
        <StatCard icon={FiBriefcase} label="Net Salary" value={money(employee.salary)} meta="Current month salary" tone="amber" />
        <StatCard icon={FiAward} label="Performance" value={`${employee.score}%`} meta="Latest review score" tone="red" />
      </div>

      <div className="grid-two">
        <Panel title="My Quick Actions">
          <div className="workflow">
            {[
              ['Apply Leave', 'Employee leave request HR side ma pending dekhashe.', FiCalendar],
              ['Attendance Correction', 'Wrong punch time correction request raise kari shake.', FiClock],
              ['Download Payslip', 'Monthly salary slip download option.', FiDownload],
              ['Upload Document', 'KYC, certificate and HR document submit kari shake.', FiFileText],
            ].map(([title, text, Icon]) => (
              <div className="workflow-item" key={title}>
                <Icon />
                <div>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="My Leave Status">
          <div className="mini-list">
            {myLeaves.map((leave) => (
              <div key={leave.id}>
                <div>
                  <strong>{leave.type}</strong>
                  <span>{leave.from} to {leave.to}</span>
                </div>
                <StatusBadge status={leave.status} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}

function EmployeeProfile({ employee }) {
  return (
    <div className="page-stack">
      <Panel title="My Profile">
        <div className="profile-grid">
          <div className="profile-card">
            <div className="person large">
              <span>{employee.name.split(' ').map((part) => part[0]).join('')}</span>
              <div>
                <strong>{employee.name}</strong>
                <small>{employee.id} - {employee.role}</small>
              </div>
            </div>
          </div>
          <div className="detail-grid profile-details">
            <div><span>Email</span><strong>{employee.email}</strong></div>
            <div><span>Mobile</span><strong>{employee.phone}</strong></div>
            <div><span>Department</span><strong>{employee.dept}</strong></div>
            <div><span>Branch</span><strong>{employee.branch}</strong></div>
            <div><span>Joining Date</span><strong>{employee.joined}</strong></div>
            <div><span>Status</span><StatusBadge status={employee.status} /></div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

function EmployeeAttendance({ employee }) {
  const [month, setMonth] = useState('2026-06')
  const rows = initialAttendance.filter((record) => record.name === employee.name && record.monthKey === month)

  return (
    <div className="page-stack">
      <Panel title="My Attendance Search">
        <div className="filter-grid">
          <Field label="Month and Year">
            <input type="month" value={month} onChange={(event) => setMonth(event.target.value)} />
          </Field>
          <div className="demo-note">
            <FiCalendar />
            <span>Employee side ma potani attendance month-wise joi shake. January 2026 demo old data che.</span>
          </div>
        </div>
      </Panel>
      <Panel title="My Attendance Records">
        <DataTable
          columns={['Date', 'In', 'Out', 'Hours', 'Status']}
          rows={rows}
          renderRow={(record) => (
            <tr key={`${record.name}-${record.date}`}>
              <td>{record.date}</td>
              <td>{record.in}</td>
              <td>{record.out}</td>
              <td>{record.hours}</td>
              <td><StatusBadge status={record.status} /></td>
            </tr>
          )}
        />
      </Panel>
    </div>
  )
}

function EmployeeLeave({ employee, leaves, setLeaves, addNotification }) {
  const [showApply, setShowApply] = useState(false)
  const myLeaves = leaves.filter((leave) => leave.employee === employee.name)

  return (
    <div className="page-stack">
      <div className="balance-grid">
        {leaveBalances.map((balance) => (
          <section className="balance-item" key={balance.type}>
            <div>
              <span>{balance.type}</span>
              <strong>{balance.total - balance.used} days</strong>
            </div>
            <small>{balance.used} used of {balance.total}</small>
            <div className="balance-track"><i style={{ width: `${((balance.total - balance.used) / balance.total) * 100}%` }} /></div>
          </section>
        ))}
      </div>
      <div className="stats-grid three">
        <StatCard icon={FiCalendar} label="Leave Balance" value="18" meta="Paid leave available" tone="blue" />
        <StatCard icon={FiActivity} label="Pending" value={myLeaves.filter((leave) => leave.status === 'Pending').length} meta="Waiting for HR" tone="amber" />
        <StatCard icon={FiCheckCircle} label="Approved" value={myLeaves.filter((leave) => leave.status === 'Approved').length} meta="Approved leave" tone="green" />
      </div>
      <Panel title="My Leave Requests" action={<button className="primary-button" onClick={() => setShowApply(true)}><FiPlus /> Apply Leave</button>}>
        <DataTable
          columns={['Type', 'From', 'To', 'Days', 'Reason', 'Status']}
          rows={myLeaves}
          renderRow={(leave) => (
            <tr key={leave.id}>
              <td>{leave.type}</td>
              <td>{leave.from}</td>
              <td>{leave.to}</td>
              <td>{leave.days}</td>
              <td>{leave.reason}</td>
              <td><StatusBadge status={leave.status} /></td>
            </tr>
          )}
        />
      </Panel>
      {showApply && <LeaveRequestModal employees={[employee]} onClose={() => setShowApply(false)} onSubmit={(form) => {
        const nextLeave = { ...form, employee: employee.name, id: `LV-${1000 + leaves.length + 1}`, status: 'Pending' }
        setLeaves((current) => [nextLeave, ...current])
        addNotification('Employee leave request', `${employee.name} applied ${form.type}.`)
        setShowApply(false)
      }} />}
    </div>
  )
}

function EmployeePayslip({ employee }) {
  const hra = Math.round(employee.salary * 0.22)
  const allowance = 4200
  const pf = Math.round(employee.salary * 0.12)
  const tax = Math.round(employee.salary * 0.06)
  const net = employee.salary + hra + allowance - pf - tax

  return (
    <div className="page-stack">
      <div className="stats-grid three">
        <StatCard icon={FiBriefcase} label="Basic" value={money(employee.salary)} meta="June 2026" tone="blue" />
        <StatCard icon={FiTrendingUp} label="Earnings" value={money(employee.salary + hra + allowance)} meta="Basic + HRA + Allowance" tone="green" />
        <StatCard icon={FiShield} label="Net Salary" value={money(net)} meta="After deductions" tone="amber" />
      </div>
      <Panel title="Last 6 Months Payslips">
        <DataTable
          columns={['Month', 'Basic Salary', 'Earnings', 'Deductions', 'Net Salary', 'Download']}
          rows={payslipMonths}
          renderRow={(month, index) => {
            const monthNet = net - index * 350
            return (
              <tr key={month}>
                <td><strong>{month}</strong></td>
                <td>{money(employee.salary)}</td>
                <td>{money(employee.salary + hra + allowance)}</td>
                <td className="danger">-{money(pf + tax + index * 350)}</td>
                <td><strong className="success">{money(monthNet)}</strong></td>
                <td>
                  <button className="ghost-button small" onClick={() => downloadDemoFile(
                    `${employee.name.replaceAll(' ', '-')}-${month.replaceAll(' ', '-')}-payslip.txt`,
                    `${companyInfo.name}\n${companyInfo.address}\n${companyInfo.contact} | ${companyInfo.email}\n\nEmployee: ${employee.name}\nMonth: ${month}\nNet Salary: ${money(monthNet)}`
                  )}><FiDownload /> Download</button>
                </td>
              </tr>
            )
          }}
        />
      </Panel>
    </div>
  )
}

function EmployeeDocuments() {
  return (
    <div className="page-stack">
      <Panel title="My Documents" action={<button className="primary-button"><FiPlus /> Upload Document</button>}>
        <DataTable
          columns={['Document', 'Category', 'Updated', 'Status']}
          rows={[
            { name: 'Aadhaar Card', category: 'KYC', updated: '12 Jun 2026', status: 'Ready' },
            { name: 'PAN Card', category: 'KYC', updated: '12 Jun 2026', status: 'Ready' },
            { name: 'Offer Letter', category: 'Joining', updated: '03 Mar 2022', status: 'Ready' },
            { name: 'June Payslip', category: 'Payroll', updated: '20 Jun 2026', status: 'Ready' },
          ]}
          renderRow={(document) => (
            <tr key={document.name}>
              <td><strong>{document.name}</strong></td>
              <td>{document.category}</td>
              <td>{document.updated}</td>
              <td><StatusBadge status={document.status} /></td>
            </tr>
          )}
        />
      </Panel>
    </div>
  )
}

function EmployeeRequests({ employee, requests, addRequest }) {
  const myRequests = requests.filter((request) => request.employee === employee.name)

  return (
    <div className="page-stack">
      <Panel title="Raise Help / Issue Request">
        <RequestForm employee={employee} onSubmit={addRequest} />
      </Panel>
      <Panel title="My Request Records">
        <DataTable
          columns={['Request', 'Type', 'Priority', 'Status', 'HR Reply', 'Action Taken']}
          rows={myRequests}
          renderRow={(request) => (
            <tr key={request.id}>
              <td><strong>{request.title}</strong><small className="table-subtext">{request.id} - {request.details}</small></td>
              <td>{request.type}</td>
              <td>{request.priority}</td>
              <td><StatusBadge status={request.status} /></td>
              <td>{request.reply || 'Waiting for HR reply'}</td>
              <td>{request.action || 'Not updated yet'}</td>
            </tr>
          )}
        />
      </Panel>
    </div>
  )
}

export default function App() {
  const [portalMode, setPortalMode] = useState('hr')
  const [page, setPage] = useState('dashboard')
  const [employeePage, setEmployeePage] = useState('employeeDashboard')
  const [open, setOpen] = useState(false)
  const [employees, setEmployees] = useState(initialEmployees)
  const [leaves, setLeaves] = useState(initialLeaves)
  const [requests, setRequests] = useState(initialRequests)
  const [showRequest, setShowRequest] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Leave approval pending', text: '2 leave requests are waiting for HR approval.' },
    { id: 2, title: 'Payroll draft ready', text: 'June 2026 payroll can be reviewed.' },
  ])

  const addNotification = (title, text) => {
    setNotifications((current) => [{ id: Date.now(), title, text }, ...current])
  }

  const addEmployee = (form) => {
    const nextEmployee = {
      id: `ME-${101 + employees.length}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      dept: form.dept,
      branch: form.branch,
      status: 'Active',
      salary: Number(form.salary),
      joined: form.joined,
      score: 82,
    }
    setEmployees((current) => [nextEmployee, ...current])
    addNotification('New employee added', `${form.name} added in ${form.dept}.`)
  }

  const pageProps = {
    employees,
    leaves,
    setLeaves,
    onAddEmployee: addEmployee,
    addNotification,
  }

  const pageMap = {
    dashboard: <Dashboard employees={employees} leaves={leaves} />,
    employees: <Employees {...pageProps} />,
    attendance: <Attendance />,
    leave: <Leave {...pageProps} />,
    payroll: <Payroll employees={employees} />,
    recruitment: <Recruitment />,
    performance: <Performance employees={employees} />,
    documents: <Documents />,
    requests: <HRRequests requests={requests} setRequests={setRequests} />,
    settings: <Settings />,
  }

  const activeEmployee = employees[1] || employees[0]
  const employeePageMap = {
    employeeDashboard: <EmployeeDashboard employee={activeEmployee} leaves={leaves} />,
    employeeProfile: <EmployeeProfile employee={activeEmployee} />,
    employeeAttendance: <EmployeeAttendance employee={activeEmployee} />,
    employeeLeave: <EmployeeLeave employee={activeEmployee} leaves={leaves} setLeaves={setLeaves} addNotification={addNotification} />,
    employeePayslip: <EmployeePayslip employee={activeEmployee} />,
    employeeDocuments: <EmployeeDocuments />,
    employeeRequests: <EmployeeRequests employee={activeEmployee} requests={requests} addRequest={(form) => {
      const nextRequest = {
        ...form,
        id: `REQ-${1000 + requests.length + 1}`,
        employee: activeEmployee.name,
        status: 'In Review',
        reply: '',
        action: '',
      }
      setRequests((current) => [nextRequest, ...current])
      addNotification('New employee request', `${activeEmployee.name}: ${form.title}`)
    }} />,
  }

  const activePage = portalMode === 'employee' ? employeePage : page
  const setActivePage = portalMode === 'employee' ? setEmployeePage : setPage

  return (
    <div className="app-shell">
      <Sidebar page={activePage} setPage={setActivePage} open={open} setOpen={setOpen} portalMode={portalMode} />
      <main className="content">
        <Topbar
          page={activePage}
          portalMode={portalMode}
          notifications={notifications}
          onTogglePortal={() => setPortalMode((current) => current === 'employee' ? 'hr' : 'employee')}
          onNewRequest={() => {
            if (portalMode === 'employee') {
              setEmployeePage('employeeRequests')
            } else {
              setShowRequest(true)
            }
          }}
          onShowNotifications={() => setShowNotifications(true)}
        />
        {portalMode === 'employee' ? employeePageMap[employeePage] : pageMap[page]}
      </main>
      {showRequest && (
        <NewRequestModal
          page={activePage}
          employees={employees}
          onClose={() => setShowRequest(false)}
          onSubmit={(form) => {
            setRequests((current) => [{
              id: `REQ-${1000 + current.length + 1}`,
              employee: form.employee,
              type: form.requestType,
              title: form.title,
              priority: form.priority,
              details: form.details,
              status: 'In Review',
              reply: '',
              action: '',
            }, ...current])
            addNotification('New HR request created', `${form.employee}: ${form.requestType} - ${form.title}`)
            setShowRequest(false)
          }}
        />
      )}
      {showNotifications && <NotificationsModal notifications={notifications} onClose={() => setShowNotifications(false)} />}
    </div>
  )
}
