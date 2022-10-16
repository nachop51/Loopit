import { useNavigate } from "react-router-dom";
import { FiCopy, FiDownload, FiShare2 } from "react-icons/fi";

import Laptop from "../../../assets/mockup-dark.png";
import Phone from "../../../assets/mockup-mobile.png";
import Card from "./Card";
import TitleAnimation from "./TitleAnimation";
import "./Content.css";

const Content = () => {
  const navigate = useNavigate();

  const goApp = () => {
    navigate("/l");
  };

  return (
    <main className="main">
      <section className="intro">
        <article className="intro-text">
          <h1 className="intro-text__title">Discover new solutions daily</h1>
          <p className="intro-text__p">
            Si eres desarrollador o desarrolladora estás en el lugar correcto,
            aqui vas a poder encontrar una grandiosa comunidad, donde descubrir
            maravillosas y mejores soluciones todos los días. Discutir y
            ayudarse entre personas con mismos problemas y mismos intereses. En
            fin amantes de la tecnología.
          </p>
          <button
            className="intro-text__button btn btn-animation"
            onClick={goApp}
          >
            Go to app
          </button>
        </article>
        <article className="intro-images">
          <img className="intro-images__phone" src={Phone} alt="Phone" />
          <img className="intro-images__laptop" src={Laptop} alt="Laptop" />
        </article>
      </section>
      <section className="features">
        <TitleAnimation title="Awesome features!" width={17} />
        <div className="row">
          <Card
            label="Share your code!"
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae omnis ipsa."
          >
            <FiShare2 className="feature-icon" />
          </Card>
          <Card
            label="Copy"
            text="dolore fuga enim sed explicabo iusto nostrum cumque temporibus itaque nesciunt."
          >
            <FiCopy className="feature-icon" />
          </Card>
          <Card
            label="Download the code!"
            text="voluptate dolores ea atque ex. Ab, aut labore?."
          >
            <FiDownload className="feature-icon" />
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Content;
