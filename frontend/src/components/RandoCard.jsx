import PropTypes from "prop-types";

function RandoCard({ data }) {
  const { id, title, categorie, description, distance, imageUrl } = data;
  return (
    <div>
      <div key={id}>
        {title} {categorie} {description} {distance}
        <img
          style={{ width: "100px", height: "50px" }}
          src={`${import.meta.env.VITE_BACKEND_URL}/${imageUrl}`}
          alt={title}
        />
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
