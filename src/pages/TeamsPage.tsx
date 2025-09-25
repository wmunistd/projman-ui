import { useEffect, useState } from "react";
import { listTeams, createTeam, listUsers } from "../api/api";
import type { Team, User } from "../api/types";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", description: "", memberIds: [] as number[] });

  useEffect(() => {
    listTeams().then(setTeams);
    // Reuse users listing for member picklist
    listUsers().then(setUsers as any);
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    const created = await createTeam(form);
    if (created) {
      setForm({ name: "", description: "", memberIds: [] });
      listTeams().then(setTeams);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-3">Teams</h2>
        <div className="overflow-hidden rounded border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {teams.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-2">{t.name}</td>
                  <td className="px-4 py-2">{t.memberIds.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Create Team</h2>
        <form onSubmit={onCreate} className="space-y-3 bg-white p-4 rounded border">
          <input className="w-full rounded border px-3 py-2" placeholder="Team name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <textarea className="w-full rounded border px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Members</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-auto border rounded p-2 bg-gray-50">
              {users.map((u) => (
                <label key={u.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={form.memberIds.includes(u.id)} onChange={(e) => {
                    setForm((f) => {
                      const set = new Set(f.memberIds);
                      if (e.target.checked) set.add(u.id); else set.delete(u.id);
                      return { ...f, memberIds: Array.from(set) };
                    });
                  }} />
                  <span>{u.fullName}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="inline-flex items-center rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">Create</button>
        </form>
      </section>
    </div>
  );
}
