import { useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

function Post({ onPostAddition }) {
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const [image, setImage] = useState(null);
  const { auth } = useOutletContext();

  // eslint-disable-next-line consistent-return
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const categorie = e.target.categorie.value;
    const distance = e.target.distance.value;

    if (
      image === null ||
      title === "" ||
      description === "" ||
      categorie === "" ||
      distance === ""
    )
      // eslint-disable-next-line no-alert
      return alert("merci de remplir tous les champs requis");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("categorie", categorie);
      formData.append("distance", distance);
      formData.append("image", image);
      formData.append("userId", auth.id);

      // eslint-disable-next-line no-unused-vars
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/randos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      e.target.title.value = "";
      e.target.description.value = "";
      e.target.categorie.value = "";
      e.target.distance.value = "";

      onPostAddition();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="formulaire"
      encType="multipart/form-data"
      onSubmit={handleSubmit2}
    >
      <input type="text" placeholder="title" name="title" />
      <input type="text" placeholder="categorie" name="categorie" />
      <input type="text" placeholder="decription" name="description" />
      <input type="text" placeholder="distance" name="distance" />
      <input
        type="file"
        name={image}
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <input type="hidden" name="userId" value={auth.id} />
      <button type="submit">valider</button>
    </form>
  );
}

Post.propTypes = {
  onPostAddition: PropTypes.func.isRequired,
};

export default Post;
