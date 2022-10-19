import "./AboutPage.css";
import imgDani from "../../assets/Dani.jpg";
import imgNacho from "../../assets/Nacho.jpg";
import imgVale from "../../assets/Vale.jpg";
import imgMateo from "../../assets/Mateo.jpg";
import imgSanti from "../../assets/Santi.jpg";
import Footer from "../Footer";

const About = () => {
  return (
    <section className="about-container">
      <h1 className="heading-about">About us</h1>
      <div className="swiper-wrapper">
        <div className="card swiper-slide">
          <div className="card_image">
            <img src={imgDani} alt="Danielle Serafim" />
          </div>
          <div className="card_content">
            <span className="card_title">UI-UX Designer</span>
            <span className="card_name">Danielle Serafim</span>
            <p className="card_text">
              Software Engineering graduate at Holberton School Uruguay
            </p>
            <button className="button">View More</button>
          </div>
        </div>

        <div className="card swiper-slide">
          <div className="card_image">
            <img src={imgMateo} alt="Mateo Arbini" />
          </div>
          <div className="card_content">
            <span className="card_title">Project Manager /Data Analyst</span>
            <span className="card_name">Mateo Arbini</span>
            <p className="card_text">
              Bachelor of International Relations UDELAR/Software Engineering
              graduate at Holberton School Uruguay
            </p>
            <button className="button">View More</button>
          </div>
        </div>

        <div className="card swiper-slide">
          <div className="card_image">
            <img src={imgNacho} alt="Ignacio Peralta" />
          </div>
          <div className="card_content">
            <span className="card_title">Full Stack Developer</span>
            <span className="card_name">Ignacio Peralta</span>
            <p className="card_text">
              Student Tutor/Software Engineering graduated at Holberton School
              Uruguay
            </p>
            <button className="button">View More</button>
          </div>
        </div>

        <div className="card swiper-slide">
          <div className="card_image">
            <img src={imgSanti} alt="Santiago Neira" width={60} />
          </div>
          <div className="card_content">
            <span className="card_title">Front-end Developer</span>
            <span className="card_name">Santiago Neira</span>
            <p className="card_text">
              Software Engineering graduated at Holberton School Uruguay
            </p>
            <button className="button">View More</button>
          </div>
        </div>

        <div className="card swiper-slide">
          <div className="card_image">
            <img src={imgVale} alt="" width={60} />
          </div>
          <div className="card_content">
            <span className="card_title">Back-end Developer</span>
            <span className="card_name">Valentin Repetto</span>
            <p className="card_text">
              Tecnólogo Informático/Software Engineering graduated at Holberton
              School Uruguay
            </p>
            <button className="button">View More</button>
          </div>
        </div>
      </div>
      <Footer className="footer-about" />
    </section>
  );
};

export default About;
