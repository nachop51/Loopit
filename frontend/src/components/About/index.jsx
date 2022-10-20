import "./AboutPage.css";
import { useState } from "react";
import imgDani from "../../assets/danielle_serafim_1-min.jpg";
import imgNacho from "../../assets/Nacho_Peralta_2.jpg";
import imgVale from "../../assets/Vale.jpg";
import imgMateo from "../../assets/Mateo.jpeg";
import imgSanti from "../../assets/Santi.jpg";
import Logo from "../Logo";
import Footer from "../Footer";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
const images = [
  imgDani, imgNacho, imgVale, imgMateo, imgSanti
]
const info = [
  {
    name: "Danielle Serafim",
    description: "Danielle Serafim is a BrazilianNe-born, w York-based artist. She received her BFA from Parsons School of Design in 2016 and her MFA from the School of Visual Arts in 2018. Her work has been exhibited in New York, Los Angeles, and Brazil. She is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.danielleserafim.com/",
    linkName: "danielleserafim.com"
  },
  {
    name: "Nacho Peralta",
    description: "Nacho Peralta is a multidisciplinary artist based in New York City. He received his BFA from Parsons School of Design in 2016 and his MFA from the School of Visual Arts in 2018. His work has been exhibited in New York, Los Angeles, and Brazil. He is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.nachoperalta.com/",
    linkName: "nachoperalta.com"
  },
  {
    name: "Vale",
    description: "Vale is a multidisciplinary artist based in New York City. She received her BFA from Parsons School of Design in 2016 and her MFA from the School of Visual Arts in 2018. Her work has been exhibited in New York, Los Angeles, and Brazil. She is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.vale.com/",
    linkName: "vale.com"
  },
  {
    name: "Mateo",
    description: "Mateo is a multidisciplinary artist based in New York City. He received his BFA from Parsons School of Design in 2016 and his MFA from the School of Visual Arts in 2018. His work has been exhibited in New York, Los Angeles, and Brazil. He is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.mateo.com/",
    linkName: "mateo.com"
  },
  {
    name: "Santi",
    description: "Santi is a multidisciplinary artist based in New York City. He received his BFA from Parsons School of Design in 2016 and his MFA from the School of Visual Arts in 2018. His work has been exhibited in New York, Los Angeles, and Brazil. He is currently a resident artist at the Lower East Side Printshop in New York City.",
    link: "https://www.santi.com/",
    linkName: "santi.com"
  }
]
const About = () => {
  const [ index, setIndex ] = useState(0)
  const [ image, setImage ] = useState(images[0])
  const [ name, setName ] = useState(info[0].name)
  const [ description, setDescription ] = useState(info[0].description)
  const [ link, setLink ] = useState(info[0].link)
  const [ linkName, setLinkName ] = useState(info[0].linkName)

const next =  () => {
  if (index === images.length - 1) {
    setIndex(0)
    setImage(images[0])
    setName(info[0].name)
    setDescription(info[0].description)
    setLink(info[0].link)
    setLinkName(info[0].linkName)
  } else {
    setIndex(index + 1)
    setImage(images[index + 1])
    setName(info[index + 1].name)
    setDescription(info[index + 1].description)
    setLink(info[index + 1].link)
    setLinkName(info[index + 1].linkName)
  }
}
const prev =  () => {
  if (index === 0) {
    setIndex(images.length - 1)
    setImage(images[images.length - 1])
    setName(info[images.length - 1].name)
    setDescription(info[images.length - 1].description)
    setLink(info[images.length - 1].link)
    setLinkName(info[images.length - 1].linkName)
  } else {
    setIndex(index - 1)
    setImage(images[index - 1])
    setName(info[index - 1].name)
    setDescription(info[index - 1].description)
    setLink(info[index - 1].link)
    setLinkName(info[index - 1].linkName)
  }
}
  return (
    <>
      <Logo link="/" />
      <main className="about">
        <button  onClick={()=> {prev()}}><GrFormPrevious className="buttonPrev"/></button>
        <div className="about-card">
          <div className="about-images">
            <img alt="hola" src={images[index]}/>
          </div>
          <div className="about-info">
            <h2>{name}</h2>
            <p>{description}</p>
            <a href={link} target="_blank" rel="noreferrer">{linkName}</a>
          </div>
        </div>
        <button  onClick={()=> {next()}}><GrFormNext className="buttonNext"/></button>
      </main>
      <Footer />
    </>
  );
};

export default About;
