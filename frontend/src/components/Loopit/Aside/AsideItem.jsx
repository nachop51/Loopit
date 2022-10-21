import { Link } from "react-router-dom";

const AsideItem = ({ populates }) => {
  return (
    <>
      <div className="item-container">
        <h2 className="aside-title">{populates.title}</h2>
        <p className="aside-text">{populates.content}</p>
        {/* <Link to={}> */}
        <p className="aside-view-yarn">Follow thread</p>
        {/* </Link> */}
      </div>
    </>
  );
};

export default AsideItem;
