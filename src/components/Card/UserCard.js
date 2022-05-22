import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import "./card.css";
const { Title, Text } = Typography;

const { Meta } = Card;

const UserCard = (props) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/user/${props.data.id}`);
  };

  console.log(props);

  return (
    <div
      className="card-wrapper"
      style={{ backgroundColor: "8EF6C9" }}
      onClick={handleSubmit}
    >
      {/* <img
        src={props.data.image}
        alt="user profile"
        style={{
          height: 100,
          width: 100,
        }}
      />
      <Title level="4">{props.data.name}</Title>
      <p>
        {props.data.bio}{" "}
        <span className="span-work">
          {props.data.status === 0 ? "Looking for job" : "Hiring"}
        </span>
      </p>
      <div className="skills-container">
        {props.data.skills.map((skill) => (
          <p className="skills">{skill}</p>
        ))}
      </div> */}
      {/* <div>
        {props.data.score && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="score-pill">
              <p>{props.data.score}</p>
            </div>
          </div>
        )}
      </div> */}
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="User profile" src={props.data.image} />}
      >
        <Meta title={props.data.name} description={props.data.bio} />
        <p>
          <span className="span-work">
            {props.data.status === 0 ? "Looking for job" : "Hiring"}
          </span>
        </p>
        <div className="skills-container">
          {props.data.skills &&
            props.data.skills.map((skill) => (
              <Text mark className="skills">
                {skill}
              </Text>
            ))}
        </div>

        {props.data.score && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p>
              <strong>Score:{props.data.score}</strong>
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
export default UserCard;
