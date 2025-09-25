import type { CreateUserPayload, Team, Project } from "./types";
import { handleError } from "./errorHandling";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function listUsers() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function createUser(payload: CreateUserPayload) {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    handleError(error);
  }
}

// Teams
export async function listTeams(): Promise<Team[]> {
  const res = await fetch(`${API_URL}/teams`);
  return res.json();
}

export async function createTeam(payload: { name: string; description?: string; memberIds: number[] }): Promise<Team> {
  const res = await fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Projects
export async function listProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`);
  return res.json();
}

export async function createProject(payload: Omit<Project, "id">): Promise<Project> {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Tasks (for kanban)
export type Task = { id: number; title: string; status: "PLANNED" | "IN_PROGRESS" | "DONE" | "CANCELLED"; projectId?: number; assigneeId?: number };

export async function listTasks(projectId?: number): Promise<Task[]> {
  const url = projectId ? `${API_URL}/tasks?projectId=${projectId}` : `${API_URL}/tasks`;
  const res = await fetch(url);
  return res.json();
}

export async function createTask(payload: Partial<Task> & { title: string }): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateTaskStatus(id: number, status: Task["status"]): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
