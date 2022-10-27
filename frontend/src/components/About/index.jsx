import "./AboutPage.css";
import imgDani from "../../assets/Danielle.png";
import imgNacho from "../../assets/Nacho.png";
import imgVale from "../../assets/Vale.png";
import imgMateo from "../../assets/Mateo.png";
import imgSanti from "../../assets/Santi.png";
import Logo from "../Logo";
import Footer from "../Footer";
import CardAbout from "./CardAbout";
const info = [
  {
    name: "Danielle Serafim",
    rol: "Developer - UI Designer",
    img: imgDani,
    linkedIn: "https://www.linkedin.com/in/danielle-serafim-850888156/",
    instagram: "https://www.instagram.com/_danielleigyr/",
    github: "https://github.com/DaAsuncion",
  },
  {
    name: "Ignacio Peralta",
    rol: "Full Stack Developer",
    img: imgNacho,
    linkedIn: "https://www.linkedin.com/in/ignacio-peralta-dev/",
    instagram: "https://www.instagram.com/nachop51/",
    github: "https://github.com/Nachop51",
  },
  {
    name: "Valentin Repetto",
    rol: "Backend Developer",
    img: imgVale,
    linkedIn: "https://www.linkedin.com/in/valentin-repetto-6aa6711a0/",
    instagram: "https://www.instagram.com/valerepetto14/",
    github: "https://github.com/valerepetto14",
  },
  {
    name: "Mateo Arbini",
    rol: "Backend Developer / Project Manager",
    img: imgMateo,
    linkedIn: "https://www.linkedin.com/in/mateo-arbini-1493691a8/",
    instagram: "https://www.instagram.com/mateoarbini/",
    github: "https://github.com/MateoArbini",
  },
  {
    name: "Santiago Neira",
    rol: "Frontend Developer / UX",
    img: imgSanti,
    linkedIn: "https://www.linkedin.com/in/santiago-neira-4479501b7/",
    instagram: "https://www.instagram.com/santiago.neira.771/",
    github: "https://github.com/sanei1509",
  },
];
const About = () => {
  return (
    <>
      <Logo link="/" />
      <main className="about">
        <h1 className="heading-primary">Our team Project</h1>
        <div className="about-container">
          {info.map((item, i) => {
            return <CardAbout user={item} key={i} />;
          })}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
