import "./Aside.css";
import AsideItem from "./AsideItem";
import { useState, useEffect } from "react";
import loopit from "../../../api/loopit";

const Aside = ({ oC }) => {
  const [populates, setPopulates] = useState([]);

  const fetchPopulates = async () => {
    try {
      const response = await loopit.get("/loops/moreLiked");
      console.log(response.data.loops);
      setPopulates(response.data.loops);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPopulates();
  }, []);
  return (
    <aside className={"aside " + oC}>
      <h2 className="heading-aside">Popular</h2>
      <div className="aside-container">
        {populates.map((item) => {
          return <AsideItem item={item} key={item.id} />;
        })}
      </div>
    </aside>
  );
};

export default Aside;
