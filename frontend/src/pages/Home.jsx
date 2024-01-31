import { useRef, useEffect, useState } from "react";
import { useRevalidator, Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import RandoCard from "../components/RandoCard";
import Post from "../components/Post";

function Home() {
  const titleRef = useRef();
  const { auth } = useOutletContext();
  const revalidator = useRevalidator();
  const [perso, setPerso] = useState([]);
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleClick = () => {
    if (auth) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/randos/user/${auth.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPerso(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleModif = async (id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/randos/${id}`
      );
      if (response.status === 200) {
        handleClick();
      } else {
        // eslint-disable-next-line no-alert
        alert("Modification échouée");
      }
    } catch (e) {
      console.error("Error for editing");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/randos/${id}`,

        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        handleClick();
      } else {
        // eslint-disable-next-line no-alert
        alert("Suppression échouée");
      }
    } catch (e) {
      console.error("Error for deleting");
    }
  };

  // Gestionnaire de soumission du formulaire
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/items`,
        {
          title: titleRef.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Inclusion du jeton JWT
          },
        }
      );

      // Recharger la page si la création réussit
      if (response.status === 201) {
        revalidator.revalidate();
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      const resultat = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/randos`
      );
      setData(resultat.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [perso]);

  const [categories, setCategories] = useState("");

  const handleInput = (event) => {
    setCategories(event.target.value);
  };

  const uniqueCategories = Array.from(
    new Set(data.map((cat) => cat.categorie))
  );

  const handlePostAddition = () => {
    fetchData();
  };
  return (
    <>
      <h1>Les randonnées</h1>
      <form className="center">
        <label htmlFor="products-select">
          Filter by{" "}
          <select id="products-select" onInput={handleInput}>
            <option value="">voir les categorie</option>

            {uniqueCategories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </form>

      <ul className="categorie-list" id="categorie-list">
        {data
          .filter((cate) => {
            return cate.categorie === categories || categories === "";
          })
          .map((cat) => {
            return (
              <Link to={`/randos/${cat.id}`} key={cat.id}>
                <li className="categorie-item">
                  <RandoCard key={`${cat.id}`} data={cat} />
                </li>
              </Link>
            );
          })}
      </ul>
      {auth && <Post onPostAddition={handlePostAddition} />}
      {auth && (
        <button type="button" onClick={handleClick}>
          Voir mes posts
        </button>
      )}
      <div>
        {perso.map((rando) => (
          <div key={rando.id}>
            {rando.title} {rando.categorie} {rando.description} {rando.distance}
            <img
              style={{ width: "100px", height: "50px" }}
              src={`${import.meta.env.VITE_BACKEND_URL}/${rando.imageUrl}`}
              alt={rando.title}
            />
            <button type="button" onClick={() => handleModif(rando.id)}>
              Modifier
            </button>
            <button type="button" onClick={() => handleDelete(rando.id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
