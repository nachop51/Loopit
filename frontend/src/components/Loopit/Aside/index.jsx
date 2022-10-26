import "./Aside.css";
import AsideItem from "./AsideItem";
import { useState, useEffect } from "react";
import loopit from "../../../api/loopit";

const Aside = ({ oC }) => {
  const [populates, setPopulates] = useState([]);

  const fetchPopulates = async () => {
    try {
      const response = await loopit.get("/loops/moreLiked");
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
      <div className="aside-container">
        <h2 className="heading-aside">Popular</h2>
        {populates.map((item) => {
          return <AsideItem item={item} key={item.id} />;
        })}
      </div>
    </aside>
  );
};

export default Aside;
