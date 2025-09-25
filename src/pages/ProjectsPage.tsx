import { useEffect, useState } from "react";
import { listProjects, createProject, listTeams, listUsers } from "../api/api";
import type { Project, Team, User } from "../api/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Project>({ id: 0, name: "", description: "", startDate: "", endDate: "", status: "PLANNED", managerUserId: null, teamIds: [] });

  useEffect(() => {
    listProjects().then(setProjects);
    listTeams().then(setTeams);
    listUsers().then(setUsers as any);
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    const payload: Omit<Project, "id"> = { ...form, id: undefined as any } as any;
    const created = await createProject(payload);
    if (created) {
      setForm({ id: 0, name: "", description: "", startDate: "", endDate: "", status: "PLANNED", managerUserId: null, teamIds: [] });
      listProjects().then(setProjects);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-3">Projects</h2>
        <div className="overflow-hidden rounded border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Teams</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {projects.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.status}</td>
                  <td className="px-4 py-2">{users.find(u => u.id === p.managerUserId)?.fullName ?? '-'}</td>
                  <td className="px-4 py-2">{p.teamIds.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Create Project</h2>
        <form onSubmit={onCreate} className="space-y-3 bg-white p-4 rounded border">
          <input className="w-full rounded border px-3 py-2" placeholder="Project name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <textarea className="w-full rounded border px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="grid grid-cols-2 gap-2">
            <input type="date" className="w-full rounded border px-3 py-2" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
            <input type="date" className="w-full rounded border px-3 py-2" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
          </div>
          <select className="w-full rounded border px-3 py-2" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Project["status"] }))}>
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
            <select className="w-full rounded border px-3 py-2" value={form.managerUserId ?? ''} onChange={(e) => setForm((f) => ({ ...f, managerUserId: e.target.value ? Number(e.target.value) : null }))}>
              <option value="">No manager</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.fullName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teams</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-auto border rounded p-2 bg-gray-50">
              {teams.map((t) => (
                <label key={t.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={form.teamIds.includes(t.id)} onChange={(e) => {
                    setForm((f) => {
                      const set = new Set(f.teamIds);
                      if (e.target.checked) set.add(t.id); else set.delete(t.id);
                      return { ...f, teamIds: Array.from(set) };
                    });
                  }} />
                  <span>{t.name}</span>
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
