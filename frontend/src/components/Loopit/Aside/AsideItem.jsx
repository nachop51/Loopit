import { BsChat } from "react-icons/bs";
import { IoBookmark } from "react-icons/io5";
import { MdRecommend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import User from "../../LoopList/LoopItem/User";

const AsideItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="item-container">
        <User username={item.user.username} time={item.created_at} />
        <h2 className="aside-title">{item.name}</h2>

        <p className="aside-text">{item.description}</p>
        <div className="heading-comments">
          <p>
            <MdRecommend /> {item.count_likes}
          </p>
          <p>
            <BsChat /> {item.count_comments}
          </p>
          <p>
            <IoBookmark /> {item.count_saves}
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/l/comments/" + item.id)}
        >
          <p className="aside-view-yarn">See full loop</p>
        </button>
      </div>
    </>
  );
};

export default AsideItem;
