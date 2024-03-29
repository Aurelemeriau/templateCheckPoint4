import PropTypes from "prop-types";

function RandoCard({ data }) {
  const { id, title, categorie, description, distance, imageUrl } = data;
  return (
    <div className="card">
      <div className="cardId" key={id}>
        <img
          className="image"
          src={`${import.meta.env.VITE_BACKEND_URL}/${imageUrl}`}
          alt={title}
        />
      </div>
      <div className="infos">
        <p>Titre: {title}</p> <p>Categorie: {categorie}</p>{" "}
        <p>Description: {description}</p> <p>Distance: {distance} km</p>
      </div>
    </div>
  );
}

RandoCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    categorie: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default RandoCard;
