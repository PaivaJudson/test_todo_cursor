export type FolderType =
  | 'all'
  | 'personal'
  | 'business'
  | 'shopping'
  | 'household'
  | 'general';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  folder: FolderType;
  dueDate: string | null;
};

export type FilterType = 'all' | 'active' | 'completed';

export const FOLDERS: { value: FolderType; label: string }[] = [
  { value: 'all', label: 'Todas as tarefas' },
  { value: 'personal', label: 'Tarefas pessoais' },
  { value: 'business', label: 'Negócios' },
  { value: 'shopping', label: 'Compras' },
  { value: 'household', label: 'Casa' },
  { value: 'general', label: 'Gerais' },
];
