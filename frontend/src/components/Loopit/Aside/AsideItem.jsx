import { BsChat } from "react-icons/bs";
import { IoBookmark } from "react-icons/io5";
import { MdRecommend } from "react-icons/md";
import { Link } from "react-router-dom";

const AsideItem = ({ populates }) => {
  // const handleClick = () => {

  // }

  return (
    <>
      <div className="item-container">
        <h2 className="aside-title">{populates.name}</h2>

        <p className="aside-text">const...</p>
        <div className="heading-comments">
          <p>
            <MdRecommend /> {populates.count_likes}
          </p>
          <p>
            <BsChat /> {populates.count_saves}
          </p>
          <p>
            <IoBookmark /> {populates.count_comments}
          </p>
        </div>
        <button className="btn btn-primary">
          <p className="aside-view-yarn">See full loop</p>
        </button>
      </div>
    </>
  );
};

export default AsideItem;
