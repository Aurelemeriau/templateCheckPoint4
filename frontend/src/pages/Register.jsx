import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      } else if (response.status === 201) {
        navigate("/login");
      }

      // Le reste du code pour envoyer la requête...
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pseudo">pseudo</label>{" "}
        <input ref={pseudoRef} type="pseudo" id="pseudo" />
      </div>
      <div>
        <label htmlFor="email">email</label>{" "}
        <input ref={emailRef} type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">password</label>{" "}
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className={isPasswordValid ? "valid" : "invalid"}
        />
        {isPasswordValid ? "✅" : "❌"} {`length: ${password.length} >= 8`}
      </div>
      <div>
        <label htmlFor="confirm-password">confirm password</label>{" "}
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={isConfirmPasswordValid ? "valid" : "invalid"}
        />
        {isConfirmPasswordValid ? "✅" : "❌"}
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default Register;
