import "./card.css";
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/user/${props.data.id}`);
  };

  return (
    <div className="card-wrapper" onClick={handleSubmit}>
      <img src={props.data.profileImgUrl} alt="user profile" />
      <h4>{props.data.name}</h4>
      <p>{props.data.bio}</p>
      <div className="skills-container">
        {props.data.skills.map((skill) => (
          <p className="skills">{skill}</p>
        ))}
      </div>
    </div>
  );
};
export default UserCard;
