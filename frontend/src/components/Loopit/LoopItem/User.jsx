const User = ({ username }) => {
  const choose = (choices) => {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  };

  return (
    <div className="user-info">
      <div className="avatar">
        <img
          src="https://i.pravatar.cc/300"
          className="avatar-img"
          alt="user-profile"
        />
      </div>
      <div>
        <h3>Username</h3>
        <span>At 15/12 19:10PM</span>
      </div>
    </div>
  );
};

export default User;
