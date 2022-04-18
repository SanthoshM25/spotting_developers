import "./card.css";
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/user/${props.data.id}`);
  };

  return (
    <div className="card-wrapper" onClick={handleSubmit}>
      <img
        src="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar-600x600.png"
        alt="user profile"
        style={{
          height: 100,
          width: 100,
        }}
      />
      <h4>{props.data.name}</h4>
      <p>{props.data.bio}</p>
      <div className="skills-container">
        {props.data.skills.map((skill) => (
          <p className="skills">{skill}</p>
        ))}
      </div>
      <div>
        {props.data.score && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="score-pill">
              <p>Blog score</p>
              <p>{`${props.data.score.blogscore} - ${props.data.score.blogCount}`}</p>
            </div>
            <div className="score-pill">
              <p>Project score</p>
              <p>{`${props.data.score.projectscore} - ${props.data.score.projectCount}`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;
