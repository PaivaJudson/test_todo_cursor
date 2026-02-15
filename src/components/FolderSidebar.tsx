import { useTodoStore } from '../store/useTodoStore';
import { FOLDERS } from '../types/todo';
import './FolderSidebar.css';

export function FolderSidebar() {
  const currentFolder = useTodoStore((s) => s.currentFolder);
  const setCurrentFolder = useTodoStore((s) => s.setCurrentFolder);

  return (
    <aside className="folder-sidebar" aria-label="Pastas de tarefas">
      <h2 className="folder-sidebar-title">Pastas</h2>
      <nav className="folder-nav" aria-label="Navegação por pastas">
        {FOLDERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`folder-item ${currentFolder === value ? 'folder-item--active' : ''}`}
            onClick={() => setCurrentFolder(value)}
            aria-current={currentFolder === value ? 'true' : undefined}
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
