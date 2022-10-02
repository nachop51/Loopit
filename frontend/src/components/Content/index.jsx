import Laptop from "../../assets/laptop.png";
import Phone from "../../assets/phone.png";
import "./Content.css";

const Content = () => {
  return (
    <main>
      <div className="content">
        <div className="content-text">
          <h1 className="content-title">Learn from the best solutions</h1>
          <p className="content-p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            laboriosam nulla molestias soluta amet ab natus aut corrupti odit
            quas doloribus dignissimos dicta similique consequuntur neque
            molestiae, totam cum nobis. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Voluptate maxime obcaecati iusto quae debitis
            suscipit at deleniti architecto labore dicta fugiat, atque aliquam
            id illum. Praesentium reprehenderit dolores asperiores officiis.
          </p>
        </div>
        <div className="content-images">
          <img className="content-images-phone" src={Phone} alt="Phone" />
          <img className="content-images-laptop" src={Laptop} alt="Laptop" />
        </div>
        <button className="button go btn">Go to app</button>
      </div>
    </main>
  );
};

export default Content;
