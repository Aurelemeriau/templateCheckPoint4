import PropTypes from "prop-types";

function RandoCard({ data }) {
  // console.log(data);

  return (
    <div>
      {data.map((rando) => (
        <div key={rando.id}>
          {rando.title} {rando.categorie} {rando.description} {rando.distance}
          <img
            style={{ width: "100px", height: "50px" }}
            src={`${import.meta.env.VITE_BACKEND_URL}/${rando.imageUrl}`}
            alt={rando.name}
          />
        </div>
      ))}
    </div>
  );
}

RandoCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RandoCard;
