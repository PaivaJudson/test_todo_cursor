import type { FilterType } from '../types/todo';
import { useTodoStore } from '../store/useTodoStore';

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Ativas' },
  { value: 'completed', label: 'Concluídas' },
];

export function TodoFilters() {
  const filter = useTodoStore((s) => s.filter);
  const setFilter = useTodoStore((s) => s.setFilter);

  return (
    <div
      className="todo-filters"
      role="group"
      aria-label="Filtrar tarefas"
    >
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`todo-filter ${filter === value ? 'todo-filter--active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFilter(value);
          }}
          aria-pressed={filter === value}
          aria-label={`Mostrar tarefas: ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

