import { useState, useRef, useCallback } from 'react';
import { useTodoStore } from '../store/useTodoStore';

export function TodoInput() {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const addTodo = useTodoStore((s) => s.addTodo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addTodo(value, undefined, dueDate || null);
      setValue('');
      setDueDate('');
      inputRef.current?.focus();
    },
    [value, dueDate, addTodo]
  );

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Adicionar nova tarefa"
      className="todo-input-form"
    >
      <label htmlFor="new-todo" className="visually-hidden">
        Nova tarefa
      </label>
      <input
        ref={inputRef}
        id="new-todo"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="O que precisa ser feito?"
        className="todo-input"
        autoComplete="off"
        aria-describedby="new-todo-hint"
        maxLength={280}
      />
      <label htmlFor="new-todo-date" className="visually-hidden">
        Data de vencimento
      </label>
      <input
        id="new-todo-date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="todo-input-date"
        aria-label="Data de vencimento (opcional)"
      />
      <span id="new-todo-hint" className="visually-hidden">
        Digite e pressione Enter para adicionar
      </span>
      <button
        type="submit"
        className="todo-submit"
        aria-label="Adicionar tarefa"
        disabled={!value.trim()}
      >
        Adicionar
      </button>
    </form>
  );
}
