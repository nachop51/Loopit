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
  // const populates = [
  //   {
  //     id: 0,
  //     title: "Fizz Buzz",
  //     content: "The best way to learn to code is to code.",
  //   },
  //   {
  //     id: 1,
  //     title: "Palindrome",
  //     content: "the most common interview question.",
  //   },
  //   {
  //     id: 2,
  //     title: "Crud",
  //     content: "the base of all web applications.",
  //   },
  //   {
  //     id: 3,
  //     title: "Hello world in cobol",
  //     content: "the old way of saying hello world.",
  //   },
  // ];
  return (
    <aside className={"aside " + oC}>
      <div className="aside-container">
        {populates.map((item) => {
          return <AsideItem populates={item} key={item.id} />;
        })}
      </div>
    </aside>
  );
};

export default Aside;
