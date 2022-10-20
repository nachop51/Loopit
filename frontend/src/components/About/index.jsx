import "./AboutPage.css";
import imgDani from "../../assets/Dani.jpg";
import imgNacho from "../../assets/Nacho.jpg";
import imgVale from "../../assets/Vale.jpg";
import imgMateo from "../../assets/Mateo.jpg";
import imgSanti from "../../assets/Santi.jpg";
import { Carousel } from "react-responsive-carousel";
import Logo from "../Logo";
import Footer from "../Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const About = () => {
  return (
    <>
      <Logo link="/" />
      <main className="about-carousel">
        <Carousel
          autoPlay
          interval={5000}
          showArrows
          swipeable
          infiniteLoop
          centerMode
        >
          <div>
            <img src={imgDani} alt="Dani" />
            <p className="legend">Dani</p>
          </div>
          <div>
            <img src={imgNacho} alt="Nacho" />
            <p className="legend">Nacho</p>
          </div>
          <div>
            <img src={imgVale} alt="Vale" />
            <p className="legend">Vale</p>
          </div>
          <div>
            <img src={imgMateo} alt="Mateo" />
            <p className="legend">Mateo</p>
          </div>
          <div>
            <img src={imgSanti} alt="Santi" />
            <p className="legend">Santi</p>
          </div>
        </Carousel>
      </main>
      <Footer />
    </>
  );
};

export default About;
