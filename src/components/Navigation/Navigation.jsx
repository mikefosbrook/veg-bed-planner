import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="container-fluid">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/add-bed">Add bed</NavLink>
        </li>
      </ul>
    </nav>
  );
}
