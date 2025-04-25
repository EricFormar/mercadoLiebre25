import { NavLink } from "react-router-dom";
import logo from '../assets/logo-mercado-liebre.svg'

const Topbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <NavLink className="nav-item dropdown no-arrow mx-1" to={'/'}>
          <img src={logo} width={150}/>
        </NavLink>
      <ul className="navbar-nav ml-3 mr-auto">
        <NavLink className="nav-item dropdown no-arrow mx-1" to={'products'}>
          Productos
        </NavLink>
      </ul>

    </nav>
  );
};
export default Topbar;
