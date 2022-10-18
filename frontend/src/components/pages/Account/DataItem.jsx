const DataItem = ({ name, stat, className }) => {
  return (
    <div className={className}>
      <h3>{name}</h3>
      <h4>{stat}</h4>
    </div>
  );
};

export default DataItem;
