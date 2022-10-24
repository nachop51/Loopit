import { BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";

const CardAbout = ({ user }) => {
  return (
    <div className="card-container">
      <div className="card-image-container">
        <div className="card-circle">
          <img className="card-image" src={user.img} alt={user.name} />
        </div>
      </div>
      <h2 className="card-title">{user.name}</h2>
      <h3 className="card-rol">{user.rol}</h3>
      <div className="links-container">
        <a href={user.linkedIn} target="_blank" rel="noreferrer">
          <BsLinkedin className="icons" />
        </a>
        <a href={user.instagram} target="_blank" rel="noreferrer">
          <BsInstagram className="icons" />
        </a>
        <a href={user.github} target="_blank" rel="noreferrer">
          <BsGithub className="icons" />
        </a>
      </div>
      {/* <p className="card-description">{user.description}</p> */}
    </div>
  );
};

export default CardAbout;
