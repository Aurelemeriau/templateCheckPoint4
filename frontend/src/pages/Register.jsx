import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const emailRef = useRef();
  const pseudoRef = useRef();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const isPasswordValid = password.length >= 8;
  const isConfirmPasswordValid =
    confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //  Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pseudo: pseudoRef.current.value,
            email: emailRef.current.value,
            password,
          }),
        }
      );

      // Vérifiez ici si les mots de passe sont valides avant d'envoyer la requête
      if (!isPasswordValid || !isConfirmPasswordValid) {
        console.error("Mots de passe non valides");
        toast.error("Inscription échouée");
      } else if (response.status === 201) {
        toast.success("Inscription réussie");
        navigate("/login");
      }

      // Le reste du code pour envoyer la requête...
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div className="pseudo">
          <input
            ref={pseudoRef}
            type="pseudo"
            id="pseudo"
            placeholder="pseudo"
          />
        </div>
        <div className="email">
          <input ref={emailRef} type="email" id="email" placeholder="email" />
        </div>
        <div className="password">
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            className={isPasswordValid ? "valid" : "invalid"}
          />
        </div>
        <div className="confirmPassword">
          <input
            type="password"
            id="confirm-password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={isConfirmPasswordValid ? "valid" : "invalid"}
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Register;
