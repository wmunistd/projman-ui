import { useEffect, useState } from "react";
import { createUser, listUsers } from "../api/api";
import type { CreateUserPayload } from "../api/types";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState<CreateUserPayload>({
    fullName: "",
    cpf: "",
    email: "",
    jobTitle: "",
    username: "",
    password: "",
    role: "EMPLOYEE",
  });

  useEffect(() => {
    listUsers().then(setUsers);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const created = await createUser(form);
    if (created) {
      setForm({ fullName: "", cpf: "", email: "", jobTitle: "", username: "", password: "", role: "EMPLOYEE" });
      listUsers().then(setUsers);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-3">Users</h2>
        <div className="overflow-hidden rounded border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-2">{u.fullName}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.jobTitle}</td>
                  <td className="px-4 py-2">{u.username}</td>
                  <td className="px-4 py-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Create User</h2>
        <form onSubmit={onSubmit} className="space-y-3 bg-white p-4 rounded border">
          <input className="w-full rounded border px-3 py-2" placeholder="Full name" value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} />
          <input className="w-full rounded border px-3 py-2" placeholder="CPF" value={form.cpf} onChange={(e) => setForm((f) => ({ ...f, cpf: e.target.value }))} />
          <input className="w-full rounded border px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          <input className="w-full rounded border px-3 py-2" placeholder="Job title" value={form.jobTitle} onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))} />
          <input className="w-full rounded border px-3 py-2" placeholder="Username" value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} />
          <input className="w-full rounded border px-3 py-2" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          <select className="w-full rounded border px-3 py-2" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
          <button type="submit" className="inline-flex items-center rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">Create</button>
        </form>
      </section>
    </div>
  );
}
