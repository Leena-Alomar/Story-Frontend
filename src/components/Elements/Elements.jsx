import "./styles.css"

const Elements = ({ el }) => {
  return (
    <div className="main-card">
      <img src={el.img} alt={el.imgAlt} width="60" />
      <p className="des"> {el.title}</p>
    </div>
  );
};

export default Elements;