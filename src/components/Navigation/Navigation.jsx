import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <>
      <div className="logo">
        <NavLink to="/">
          <img alt="Veg Planner" src="/veg-planner-logo.svg" />
        </NavLink>
      </div>
      <nav className="container">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/add-bed">Add bed</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
