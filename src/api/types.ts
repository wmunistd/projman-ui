export type CreateUserPayload = {
  fullName: string;
  cpf: string;
  email: string;
  jobTitle: string;
  username: string;
  password: string;
  role: string;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
  jobTitle: string;
  username: string;
  role: string;
};

export type Team = {
  id: number;
  name: string;
  description?: string;
  memberIds: number[];
};

export type ProjectStatus = "PLANNED" | "IN_PROGRESS" | "DONE" | "CANCELLED";

export type Project = {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status: ProjectStatus;
  managerUserId?: number | null;
  teamIds: number[];
};
