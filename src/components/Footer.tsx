import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer" role="contentinfo">
      <p className="app-footer-text">
        © {currentYear} Lista de Tarefas. Feito com React + Vite.
      </p>
    </footer>
  );
}
