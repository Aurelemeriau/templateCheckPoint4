import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/picto-rando.png";

function App() {
  const [auth, setAuth] = useState();

  return (
    <>
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
      {auth && <p className="pseudo1">Bienvenue {auth.pseudo}</p>}
      <main>
        <Outlet context={{ auth, setAuth }} />
      </main>
    </>
  );
}

export default App;
