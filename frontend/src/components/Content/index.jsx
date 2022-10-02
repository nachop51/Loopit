import Laptop from "../../assets/laptop.png";
import Phone from "../../assets/phone.png";
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
        </div>
        <div className="intro-images">
          <img className="intro-images-phone" src={Phone} alt="Phone" />
          <img className="intro-images-laptop" src={Laptop} alt="Laptop" />
        </div>
        <button className="button go btn">Go to app</button>
      </section>
      <section className="features">
        <h2 className="features-title">Features</h2>
        <div className="features-container">
          <div className="features-card">
            <div className="features-card-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <h3 className="features-card-title">Fast</h3>
            <p className="features-card-p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Content;
