import type { Todo } from '../types/todo';
import { FOLDERS } from '../types/todo';
import { useTodoStore } from '../store/useTodoStore';

type TodoItemProps = {
  todo: Todo;
};

function formatDueDate(isoDate: string | null | undefined): string {
  if (!isoDate) return 'sem data';
  try {
    const d = new Date(isoDate + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  } catch {
    return 'sem data';
  }
}

export function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const removeTodo = useTodoStore((s) => s.removeTodo);
  const updateTodo = useTodoStore((s) => s.updateTodo);

  const checkboxId = `todo-${todo.id}`;
  const folderLabel = FOLDERS.find((f) => f.value === (todo.folder ?? 'general'))?.label ?? 'Gerais';

  return (
    <li
      className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}
      data-id={todo.id}
    >
      <div className="todo-item-content">
        <input
          id={checkboxId}
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => {
            e.stopPropagation();
            toggleTodo(todo.id);
          }}
          className="todo-checkbox"
          aria-label={todo.completed ? `Marcar "${todo.title}" como pendente` : `Marcar "${todo.title}" como concluída`}
        />
        <label htmlFor={checkboxId} className="todo-label">
          {todo.title}
        </label>
        <span className="todo-folder" title="Pasta">
          {folderLabel}
        </span>
        <span className="todo-due" title="Data de vencimento">
          {formatDueDate(todo.dueDate)}
        </span>
        <input
          type="date"
          value={todo.dueDate ?? ''}
          onChange={(e) => updateTodo(todo.id, { dueDate: e.target.value || null })}
          className="todo-due-edit"
          aria-label={`Alterar data de vencimento de "${todo.title}"`}
          title="Alterar data"
        />
        <button
          type="button"
          className="todo-remove"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeTodo(todo.id);
          }}
          aria-label={`Remover tarefa "${todo.title}"`}
        >
          Remover
        </button>
      </div>
    </li>
  );
}
