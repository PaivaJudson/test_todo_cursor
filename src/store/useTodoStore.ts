import { create } from 'zustand';
import type { Todo, FilterType } from '../types/todo';

type TodoState = {
  todos: Todo[];
  filter: FilterType;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  getFilteredTodos: () => Todo[];
};

const generateId = () => crypto.randomUUID();

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: 'all',

  addTodo: (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: generateId(),
          title: trimmed,
          completed: false,
          createdAt: Date.now(),
        },
      ],
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
