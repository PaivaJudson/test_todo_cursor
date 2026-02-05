import { useTodoStore } from '../store/useTodoStore';

export function TodoStats() {
  const todos = useTodoStore((s) => s.todos);
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  if (total === 0) return null;

  return (
    <p
      className="todo-stats"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="visually-hidden">Resumo: </span>
      {active} pendente{active !== 1 ? 's' : ''}, {completed} concluída{completed !== 1 ? 's' : ''}.
    </p>
  );
}
