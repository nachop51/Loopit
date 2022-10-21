import "./AboutPage.css";
import imgDani from "../../assets/danielle_serafim_1-min.jpg";
import imgNacho from "../../assets/Nacho_Peralta_2.jpg";
import imgVale from "../../assets/Vale.jpg";
import imgMateo from "../../assets/Mateo.jpeg";
import imgSanti from "../../assets/Santi.jpg";
import Logo from "../Logo";
import Footer from "../Footer";
import CardAbout from "./CardAbout";
const info = [
  {
    name: "Danielle Serafim",
    rol: "Developer - UI Designer",
    description:
      "Danielle Serafim is a BrazilianNe-born, w York-based artist. She received her BFA from Parsons School of Design in 2016 and her MFA from the School of Visual Arts in 2018. Her work has been exhibited in New York, Los Angeles, and Brazil. She is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.danielleserafim.com/",
    linkName: "danielleserafim.com",
    img: imgDani,
  },
  {
    name: "Nacho Peralta",
    rol: "Full Stack Developer",
    description:
      "Nacho Peralta is a multidisciplinary artist based in New York City. He received his BFA from Parsons School of Design in 2016 and his MFA from the School of Visual Arts in 2018. His work has been exhibited in New York, Los Angeles, and Brazil. He is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.nachoperalta.com/",
    linkName: "nachoperalta.com",
    img: imgNacho,
  },
  {
    name: "Vale",
    rol: "Backend Developer",
    description:
      "Vale is a multidisciplinary artist based in New York City. She received her BFA from Parsons School of Design in 2016 and her MFA from the School of Visual Arts in 2018. Her work has been exhibited in New York, Los Angeles, and Brazil. She is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.vale.com/",
    linkName: "vale.com",
    img: imgVale,
  },
  {
    name: "Mateo",
    rol: "Backend Developer / Project Manager",
    description:
      "Mateo is a multidisciplinary artist based in New York City. He received his BFA from Parsons School of Design in 2016 and his MFA from the School of Visual Arts in 2018. His work has been exhibited in New York, Los Angeles, and Brazil. He is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.mateo.com/",
    linkName: "mateo.com",
    img: imgMateo,
  },
  {
    name: "Santi",
    rol: "Frontend Developer / UX",
    description:
      "Santi is a multidisciplinary artist based in New York City. He received his BFA from Parsons School of Design in 2016 and his MFA from the School of Visual Arts in 2018. His work has been exhibited in New York, Los Angeles, and Brazil. He is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.santi.com/",
    linkName: "santi.com",
    img: imgSanti,
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
