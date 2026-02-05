import type { Todo } from '../types/todo';
import { useTodoStore } from '../store/useTodoStore';

type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const removeTodo = useTodoStore((s) => s.removeTodo);

  const checkboxId = `todo-${todo.id}`;

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
          onChange={() => toggleTodo(todo.id)}
          className="todo-checkbox"
          aria-label={todo.completed ? `Marcar "${todo.title}" como pendente` : `Marcar "${todo.title}" como concluída`}
        />
        <label
          htmlFor={checkboxId}
          className="todo-label"
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="todo-remove"
          onClick={() => removeTodo(todo.id)}
          aria-label={`Remover tarefa "${todo.title}"`}
        >
          Remover
        </button>
      </div>
    </li>
  );
}
