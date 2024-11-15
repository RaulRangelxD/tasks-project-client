export interface DataToken {
  id: string;
  email: string;
  [key: string]: unknown;
}

export type TaskInfo = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export interface TasksProps {
  groupId: number;
  tasksPending: TaskInfo[];
  tasksInProgress: TaskInfo[];
  tasksCompleted: TaskInfo[];
  groupUsers: UserInfo[];
  getAllData: () => void;
  successToast: (msg: string) => void;
}

export interface TaskCardProps {
  groupId: number;
  task: TaskInfo;
  getAllData: () => void;
  successToast: (msg: string) => void;
}

export type UserInfo = {
  id: number;
  email: string;
  username: string;
  password: string;
};

export type UserTaskInfo = {
  id: number;
  taskId: number;
  userId: number;
  notified: number;
};

export interface DataCreateTask {
  groupId: number;
}

export type GroupInfo = {
  id: number;
  userId: number;
  title: string;
};

export type GroupUserInfo = {
  id: number;
  groupId: number;
  userId: number;
};

export interface GroupsProps {
  dataGroups: GroupInfo[];
}

export interface AddUserProps {
  groupId: number;
  usersData: UserInfo[];
  getAllData: () => void;
}

export interface AddTaskUserProps {
  groupId: number;
  taskId: number;
  usersData: UserInfo[];
  getAllData: () => void;
}
