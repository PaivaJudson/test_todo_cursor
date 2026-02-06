import { useTodoStore } from '../store/useTodoStore';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
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
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
