import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { TodoStats } from './components/TodoStats';
import './App.css';

function App() {
  return (
    <main className="app" id="main-content">
      <header className="app-header">
        <h1 id="app-title">Lista de Tarefas</h1>
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
