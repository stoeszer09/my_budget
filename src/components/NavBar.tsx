import { Link } from "react-router-dom";


function NavBar() {
  return (
    <div>
      <h1>My Budget</h1>
      <div>
        <ul>
          <li>
            <Link to={'/'}>Overview</Link>
          </li>
          <li>
            <Link to={"/expenses"}>Expenses</Link>
          </li>
          <li>
            <Link to={"/income"}>Income</Link>
          </li>
        </ul>
      </div>

      <div>
        <h3>
          Sign in/up
        </h3>
      </div>
    </div>
  );
}

export default NavBar;
