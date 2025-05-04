import "./styles.css"

const Elements = ({ story}) => {
  return (
    <div className="main-card">
      <p className="des"> {story.title}</p>
    </div>
  );
};

export default Elements;