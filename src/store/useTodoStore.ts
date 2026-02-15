import { create } from 'zustand';
import type { Todo, FilterType, FolderType } from '../types/todo';

type TodoState = {
  todos: Todo[];
  filter: FilterType;
  currentFolder: FolderType;
  addTodo: (title: string, folder?: FolderType, dueDate?: string | null) => void;
  updateTodo: (id: string, updates: Partial<Pick<Todo, 'dueDate' | 'folder'>>) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  setCurrentFolder: (folder: FolderType) => void;
  getFilteredTodos: () => Todo[];
};

const generateId = () => crypto.randomUUID();

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: 'all',
  currentFolder: 'all',

  addTodo: (title: string, folder?: FolderType, dueDate?: string | null) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const { currentFolder } = get();
    const taskFolder = folder ?? (currentFolder === 'all' ? 'general' : currentFolder);
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: generateId(),
          title: trimmed,
          completed: false,
          createdAt: Date.now(),
          folder: taskFolder,
          dueDate: dueDate ?? null,
        },
      ],
    }));
  },

  setCurrentFolder: (folder: FolderType) => {
    set({ currentFolder: folder });
  },

  updateTodo: (id: string, updates: Partial<Pick<Todo, 'dueDate' | 'folder'>>) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    }));
  },

  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  removeTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  setFilter: (filter: FilterType) => {
    set({ filter });
  },

  getFilteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  },
}));
