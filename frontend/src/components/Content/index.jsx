import Laptop from "../../assets/laptop.png";
import Phone from "../../assets/phone.png";
import { GrShareOption } from "react-icons/gr";
import { FiCopy, FiDownload } from "react-icons/fi";
import Card from "./Card";
import TitleAnimation from "./TitleAnimation";
import "./Content.css";

const Content = () => {
  return (
    <main>
      <section className="intro">
        <div className="intro-text">
          <h1 className="intro-title">Learn from the best solutions</h1>
          <p className="intro-p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            laboriosam nulla molestias soluta amet ab natus aut corrupti odit
            quas doloribus dignissimos dicta similique consequuntur neque
            molestiae, totam cum nobis. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Voluptate maxime obcaecati iusto quae debitis
            suscipit at deleniti architecto labore dicta fugiat, atque aliquam
            id illum. Praesentium reprehenderit dolores asperiores officiis.
          </p>
          <button className="button go btn">Go to app</button>
        </div>
        <div className="intro-images">
          <img className="intro-images-phone" src={Phone} alt="Phone" />
          <img className="intro-images-laptop" src={Laptop} alt="Laptop" />
        </div>
      </section>
      <section className="features">
        <TitleAnimation title="Awesome features!" />
        <div className="row">
          <Card
            label="Share your code!"
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae omnis ipsa."
          >
            <GrShareOption className="feature-icon" />
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
