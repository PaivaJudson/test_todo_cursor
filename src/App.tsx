import { useEffect } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { TodoStats } from './components/TodoStats';
import { ThemeToggle } from './components/ThemeToggle';
import { useThemeStore } from './store/useThemeStore';
import './App.css';

function App() {
  const mode = useThemeStore((s) => s.mode);

  useEffect(() => {
    if (mode !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const resolved = mediaQuery.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', resolved);
    };
    handler();
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [mode]);

  return (
    <main className="app" id="main-content">
      <header className="app-header">
        <div className="app-header-row">
          <h1 id="app-title">Lista de Tarefas</h1>
          <ThemeToggle />
        </div>
        <p id="app-desc" className="app-desc">
          Adicione tarefas, marque como concluídas ou remova quando não precisar mais.
        </p>
      </header>

      <section aria-labelledby="app-title" className="todo-section">
        <TodoInput />
        <TodoFilters />
        <TodoStats />
        <TodoList />
      </section>
    </main>
  );
}

export default App;
