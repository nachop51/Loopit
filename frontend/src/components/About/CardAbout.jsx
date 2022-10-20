const CardAbout = ({ user }) => {
  return (
    <div className="card-container">
      <div className="card-image-container">
        <img className="card-image" src={user.img} alt={user.name} />
        <div className="card-circle"></div>
      </div>
      <h1 className="card-title">Hola</h1>
    </div>
  );
};

export default CardAbout;
