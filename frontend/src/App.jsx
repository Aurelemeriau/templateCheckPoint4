import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import logo from "./assets/picto-rando.png";

function App() {
  const [auth, setAuth] = useState();

  return (
    <>
      <ToastContainer />
      <nav>
        <ul>
          <img className="logo" src={logo} alt="logo" />
          <li>
            <Link to="/">Accueil</Link>
          </li>
          {auth == null ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Créer un compte</Link>
              </li>
            </>
          ) : (
            <li>
              <button
                type="button"
                onClick={() => {
                  setAuth(null);
                }}
              >
                Se déconnecter
              </button>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet context={{ auth, setAuth }} />
      </main>
    </>
  );
}

export default App;
