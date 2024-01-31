import { React, useEffect, useState } from "react";
import { useLoaderData, useRevalidator, useParams } from "react-router-dom";
import axios from "axios";
import RandoCard from "../components/RandoCard";

function RandoDetails() {
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  });
  const product = useLoaderData();
  const revalidator = useRevalidator();
  const { id } = useParams();

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Assumez que vous avez une fonction pour récupérer le token

  if (!product) {
    return <div>Loading...</div>;
  }

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const resultat = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/randos/${id}/comments`
      );
      setData(resultat.data.comments); // Assurez-vous que la structure de réponse est correcte
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const description = e.target.description.value;

    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/randos/${id}/comments`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      e.target.description.value = "";

      // Réexécutez loadDatas pour mettre à jour les données après l'ajout
      fetchData();

      revalidator.revalidate();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="body">
      <RandoCard className="card" data={product[0]} />
      <h2>Commentaires</h2>
      {data.map((comments) => (
        <option
          className="comments"
          value={comments.description}
          key={comments.id}
        >
          {comments.description}
        </option>
      ))}
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ajoutez votre commentaire"
          name="description"
        />
        <button type="submit">valider</button>
      </form>
    </div>
  );
}

export const loadProductsById = async ({ params }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/randos/${params.id}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export default RandoDetails;
