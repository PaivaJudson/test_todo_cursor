import { useMemo } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { TodoItem } from './TodoItem';

const MS_PER_DAY = 86400000;

function isDueInNext7Days(dueDate: string | null | undefined): boolean {
  if (!dueDate) return false;
  try {
    const due = new Date(dueDate + 'T23:59:59').getTime();
    const now = new Date().setHours(0, 0, 0, 0);
    const in7Days = now + 7 * MS_PER_DAY;
    return due >= now && due <= in7Days;
  } catch {
    return false;
  }
}

export function TodoList() {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const currentFolder = useTodoStore((s) => s.currentFolder);

  const { noDue, dueSoon } = useMemo(() => {
    const filtered = todos.filter((todo) => {
      const folderMatch =
        currentFolder === 'all' || (todo.folder ?? 'general') === currentFolder;
      if (!folderMatch) return false;
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });

    const soon: typeof filtered = [];
    const noDate: typeof filtered = [];

    for (const todo of filtered) {
      if (isDueInNext7Days(todo.dueDate)) {
        soon.push(todo);
      } else {
        noDate.push(todo);
      }
    }

    return { noDue: noDate, dueSoon: soon };
  }, [todos, filter, currentFolder]);

  const totalCount = noDue.length + dueSoon.length;

  if (totalCount === 0) {
    return (
      <p className="todo-empty" role="status" aria-live="polite">
        Nenhuma tarefa para exibir.
      </p>
    );
  }

  return (
    <div className="todo-list-container">
      <div className="todo-list-header" role="presentation">
        <span className="todo-col-task">Tarefa</span>
        <span className="todo-col-folder">Pasta</span>
        <span className="todo-col-due">Data de vencimento</span>
      </div>
      <ul className="todo-list" role="list" aria-label="Lista de tarefas">
        {noDue.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {dueSoon.length > 0 && (
        <>
          <div className="todo-list-divider">Vence nos próximos 7 dias</div>
          <ul className="todo-list todo-list--due-soon" role="list" aria-label="Tarefas que vencem em breve">
            {dueSoon.map((todo) => (
              <TodoItem key={todo.id} todo={todo} highlight />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
