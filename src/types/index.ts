export type Todo = {
  id: string;
  value: string;
  completed: boolean;
};

export type FilterType = "all" | "active" | "completed"