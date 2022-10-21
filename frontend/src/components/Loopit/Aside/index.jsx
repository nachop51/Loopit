import { BsArrowReturnRight } from "react-icons/bs";
import "./Aside.css";
import AsideItem from "./AsideItem";

const Aside = ({ oC }) => {
  const populates = [
    {
      id: 0,
      title: "Fizz Buzz",
      content: "The best way to learn to code is to code.",
    },
    {
      id: 1,
      title: "Palindrome",
      content: "the most common interview question.",
    },
    {
      id: 2,
      title: "Crud",
      content: "the base of all web applications.",
    },
    {
      id: 3,
      title: "Hello world in cobol",
      content: "the old way of saying hello world.",
    },
  ];
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
