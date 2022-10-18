import "./AboutPage.css";
import imgDani from "../../assets/Dani.jpg";
import imgNacho from "../../assets/Nacho.jpg";
import imgVale from "../../assets/Vale.jpg";
import imgMateo from "../../assets/Mateo.jpg";
import imgSanti from "../../assets/Santi.jpg";

const About = () => {
  return (
    <section class="about-container">
      <h1 className="heading-about">About us</h1>
      <div class="swiper-wrapper">
        <div class="card swiper-slide">
          <div class="card_image">
            <img src={imgDani} alt="Danielle Serafim" />
          </div>
          <div class="card_content">
            <span class="card_title">UI-UX Designer</span>
            <span class="card_name">Danielle Serafim</span>
            <p class="card_text">
              Software Engineering graduate at Holberton School Uruguay
            </p>
            <button class="button">View More</button>
          </div>
        </div>

        <div class="card swiper-slide">
          <div class="card_image">
            <img src={imgMateo} alt="Mateo Arbini" />
          </div>
          <div class="card_content">
            <span class="card_title">Project Manager /Data Analyst</span>
            <span class="card_name">Mateo Arbini</span>
            <p class="card_text">
              Bachelor of International Relations UDELAR/Software Engineering
              graduate at Holberton School Uruguay
            </p>
            <button class="button">View More</button>
          </div>
        </div>

        <div class="card swiper-slide">
          <div class="card_image">
            <img src={imgNacho} alt="Ignacio Peralta" />
          </div>
          <div class="card_content">
            <span class="card_title">Full Stack Developer</span>
            <span class="card_name">Ignacio Peralta</span>
            <p class="card_text">
              Student Tutor/Software Engineering graduated at Holberton School
              Uruguay
            </p>
            <button class="button">View More</button>
          </div>
        </div>

        <div class="card swiper-slide">
          <div class="card_image">
            <img src={imgSanti} alt="Santiago Neira" width={60} />
          </div>
          <div class="card_content">
            <span class="card_title">Front-end Developer</span>
            <span class="card_name">Santiago Neira</span>
            <p class="card_text">
              Software Engineering graduated at Holberton School Uruguay
            </p>
            <button class="button">View More</button>
          </div>
        </div>

        <div class="card swiper-slide">
          <div class="card_image">
            <img src={imgVale} alt="" width={60} />
          </div>
          <div class="card_content">
            <span class="card_title">Back-end Developer</span>
            <span class="card_name">Valentin Repetto</span>
            <p class="card_text">
              Tecnólogo Informático/Software Engineering graduated at Holberton
              School Uruguay
            </p>
            <button class="button">View More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
