import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export function Navbar() {
  return (
    <header className="navbar" role="banner">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <h1 className="navbar__title" id="app-title">
            Lista de Tarefas
          </h1>
        </div>
        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__add"
            aria-label="Adicionar tarefa"
            onClick={() => document.getElementById('new-todo')?.focus()}
          >
            Adicionar tarefa
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
