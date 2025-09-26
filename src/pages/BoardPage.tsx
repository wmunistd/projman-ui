import { useEffect, useState } from "react";
import { listTasks, updateTaskStatus, createTask } from "../api/api";
import type { Task } from "../api/api";

type Status = "PLANNED" | "IN_PROGRESS" | "DONE" | "CANCELLED";


const COLUMNS: { key: Status; title: string }[] = [
  { key: "PLANNED", title: "Planned" },
  { key: "IN_PROGRESS", title: "In Progress" },
  { key: "DONE", title: "Done" },
  { key: "CANCELLED", title: "Cancelled" },
];

export default function BoardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    listTasks().then(setTasks as any);
  }, []);

  async function move(task: Task, to: Status) {
    await updateTaskStatus(task.id, to);
    listTasks().then(setTasks as any);
  }

  async function onCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await createTask({ title: newTitle.trim(), status: 'PLANNED' });
    setNewTitle("");
    listTasks().then(setTasks as any);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="md:col-span-2 xl:col-span-4">
        <form onSubmit={onCreateTask} className="mb-4 flex gap-2">
          <input className="flex-1 rounded border px-3 py-2" placeholder="New task title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">Add Task</button>
        </form>
      </div>
      {COLUMNS.map((col) => (
        <div key={col.key} className="bg-white rounded border p-3 min-h-64">
          <h3 className="font-semibold mb-2">{col.title}</h3>
          <div className="space-y-2">
            {tasks.filter((t) => t.status === col.key).map((t) => (
              <div key={t.id} className="rounded border p-3">
                <div className="font-medium">{t.title}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {COLUMNS.filter((c) => c.key !== t.status).map((c) => (
                    <button key={c.key} className="rounded border px-2 py-1 hover:bg-gray-50" onClick={() => move(t, c.key)}>
                      Move to {c.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {tasks.filter((t) => t.status === col.key).length === 0 && (
              <div className="text-sm text-gray-500">No tasks</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
