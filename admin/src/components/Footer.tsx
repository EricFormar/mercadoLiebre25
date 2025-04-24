/**
 * Componente del pie de página que muestra información de copyright
 * en la parte inferior de la pantalla con fondo blanco.
 */
const Footer = () => {
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; Dashboard 2021</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;