import "./AboutPage.css";

const About = () => {
  return (
    <main className="container">
      <h1 className="heading-about">Nosotros</h1>
      <div className="about-us">
        <div className="card">
          {/* <img src="../../assets/Dani.jpg" alt="" /> */}
        </div>
        <div className="card mateo">
          {/* <img src="../../assets/Mateo.jpg" alt="" /> */}
        </div>
        <div className="card">
          {/* <img src="../../assets/Nacho.jpg" alt="" width={100} /> */}
        </div>
        <div className="card">
          {/* <img src="../../assets/Santi.jpg" alt="" /> */}
        </div>
      </div>
    </main>
  );
};

export default About;
