import { useTodoStore } from '../store/useTodoStore';

export function TodoStats() {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const currentFolder = useTodoStore((s) => s.currentFolder);

  const filtered = todos.filter((todo) => {
    const folderMatch =
      currentFolder === 'all' || (todo.folder ?? 'general') === currentFolder;
    if (!folderMatch) return false;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completed = filtered.filter((t) => t.completed).length;
  const active = filtered.length - completed;

  if (filtered.length === 0) return null;

  return (
    <p
      className="todo-stats"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="visually-hidden">Resumo: </span>
      Tarefas exibidas: {active} ativa{active !== 1 ? 's' : ''} e {completed} concluída{completed !== 1 ? 's' : ''}.
    </p>
  );
}
