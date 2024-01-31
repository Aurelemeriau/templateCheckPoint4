import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {
  // Références pour les champs email et mot de passe
  const emailRef = useRef();
  const passwordRef = useRef();

  const { setAuth } = useOutletContext();

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        const auth = await response.json();

        setAuth(auth.user);
        localStorage.setItem("token", auth.token);

        navigate("/");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  // Rendu du composant formulaire
  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div className="email">
          <input ref={emailRef} type="email" id="email" placeholder="email" />
        </div>
        <div className="password">
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="password"
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Login;
