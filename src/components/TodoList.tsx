import { useTodoStore } from '../store/useTodoStore';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const getFilteredTodos = useTodoStore((s) => s.getFilteredTodos);
  const todos = getFilteredTodos();

  if (todos.length === 0) {
    return (
      <p className="todo-empty" role="status" aria-live="polite">
        Nenhuma tarefa para exibir.
      </p>
    );
  }

  return (
    <ul
      className="todo-list"
      role="list"
      aria-label="Lista de tarefas"
    >
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
