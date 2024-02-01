import { useRef, useEffect, useState } from "react";
import {
  useRevalidator,
  Link,
  useOutletContext,
  NavLink,
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import Post from "../components/Post";

function Home() {
  const titleRef = useRef();
  const { auth } = useOutletContext();
  const revalidator = useRevalidator();
  const [perso, setPerso] = useState([]);
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [randos, setRandos] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    categorie: "",
    description: "",
    distance: "",
    id: "",
  });
  const [formOpen, setFormOpen] = useState(false);
  const [reload, setReload] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/randos`
      );
      setRandos(response.data);
    };

    fetchData();
  }, [perso, reload, randos]);

  // Ajoutez cette fonction dans votre composant
  const handleModif = (id) => {
    const rando = randos.find((r) => r.id === id);

    if (rando) {
      setFormValues(rando);
      setFormOpen(true);
    } else {
      console.error(`No rando found with id ${id}`);
    }
  };

  const handlePut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/randos/${formValues.id}`,
        formValues
      );
      if (response.status === 200) {
        // Update the randos state with the updated rando
        setRandos(
          randos.map((rando) =>
            rando.id === formValues.id ? formValues : rando
          )
        );
        setFormOpen(false);
        toast.success("Modification réussie");
        setReload(!reload);
        handleClick();
      } else {
        toast.error("Modification échouée");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la modification");
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
        toast.success("suppression réussie");
      } else {
        toast.error("suppression échouée");
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
  }, [perso, reload, randos]);

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
      {auth && <p className="pseudo1">Bienvenue {auth.pseudo}</p>}
      <h1>Randossimo</h1>
      <NavLink to="/register">
        <p>Inscrivez-vous pour pourvoir poster une randonnée</p>
      </NavLink>

      <form className="center">
        <label htmlFor="products-select">
          {" "}
          <select id="products-select" onInput={handleInput}>
            <option value="">voir les categories</option>

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
                  <img
                    className="image"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${cat.imageUrl}`}
                    alt={cat.title}
                  />
                  <div className="title">{cat.title}</div> <p> - </p>
                  <div className="categorie">{cat.categorie}</div>
                </li>
              </Link>
            );
          })}
      </ul>
      {auth && (
        <Post onPostAddition={handlePostAddition} handleClick={handleClick} />
      )}
      {auth && (
        <div className="voir">
          <button type="button" onClick={handleClick}>
            Voir mes randonnées
          </button>
        </div>
      )}
      <div>
        {perso.map((rando) => (
          <div className="ajout" key={rando.id}>
            <div className="card">
              <img
                className="image"
                src={`${import.meta.env.VITE_BACKEND_URL}/${rando.imageUrl}`}
                alt={rando.title}
              />
              <div className="infos">
                <p>Titre: {rando.title}</p> <p>Catégorie: {rando.categorie}</p>{" "}
              </div>
              <div className="boutons">
                <button type="button" onClick={() => handleModif(rando.id)}>
                  Modifier
                </button>
                <button type="button" onClick={() => handleDelete(rando.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Your other components */}
        <Modal
          isOpen={formOpen}
          onRequestClose={() => setFormOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)", // Overlay with black background and 75% opacity
            },
            content: {
              color: "lightsteelblue", // Text color
              width: "70%", // Width of the modal
              height: "30%", // Height of the modal
              margin: "auto", // Center the modal
              padding: "20px", // Padding inside the modal
              border: "1px solid black", // Border around the modal
              borderRadius: "4px", // Rounded corners
              background: "#fff", // White background
              overflow: "auto", // Add scroll if content is too big
            },
          }}
        >
          <form onSubmit={handlePut}>
            <input
              type="text"
              value={formValues.title}
              onChange={(e) =>
                setFormValues({ ...formValues, title: e.target.value })
              }
            />
            <input
              type="text"
              value={formValues.categorie}
              onChange={(e) =>
                setFormValues({ ...formValues, categorie: e.target.value })
              }
            />
            <input
              type="text"
              value={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
            />
            <input
              type="text"
              value={formValues.distance}
              onChange={(e) =>
                setFormValues({ ...formValues, distance: e.target.value })
              }
            />
            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default Home;
