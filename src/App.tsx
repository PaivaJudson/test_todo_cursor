import { useEffect } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { TodoStats } from './components/TodoStats';
import { ThemeToggle } from './components/ThemeToggle';
import { FolderSidebar } from './components/FolderSidebar';
import { Footer } from './components/Footer';
import { useThemeStore } from './store/useThemeStore';
import { useTodoStore } from './store/useTodoStore';
import { FOLDERS } from './types/todo';
import './App.css';

function App() {
  const mode = useThemeStore((s) => s.mode);
  const currentFolder = useTodoStore((s) => s.currentFolder);

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

  const currentFolderLabel =
    FOLDERS.find((f) => f.value === currentFolder)?.label ?? 'Todas as tarefas';

  return (
    <div className="app-layout" id="main-content">
      <header className="app-header">
        <div className="app-header-left">
          <h1 id="app-title">Lista de Tarefas</h1>
        </div>
        <button
          type="button"
          className="app-add-task"
          aria-label="Adicionar tarefa"
          onClick={() => document.getElementById('new-todo')?.focus()}
        >
          + ADICIONAR TAREFA
        </button>
        <div className="app-header-right">
          <ThemeToggle />
        </div>
      </header>

      <div className="app-body">
        <FolderSidebar />
        <main className="app-main">
          <nav className="app-breadcrumb" aria-label="Localização">
            Pastas &gt; {currentFolderLabel}
          </nav>
          <section aria-labelledby="app-title" className="todo-section">
            <TodoInput />
            <TodoFilters />
            <TodoStats />
            <TodoList />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
