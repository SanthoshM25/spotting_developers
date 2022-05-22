import "./card.css";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "antd";

export default function ProjectCard(props) {
  const navigate = useNavigate();
  console.log(props);

  //   const handleSubmit = () => {
  //     navigate(`/user/${props.data.id}`);
  //   };

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
    // <div className="card-wrapper" onClick={handleSubmit}>
    //   <img
    //     src="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar-600x600.png"
    //     alt="user profile"
    //     style={{
    //       height: 100,
    //       width: 100,
    //     }}
    //   />
    //   <h4>{props.data.name}</h4>
    //   <p>{props.data.bio}</p>
    //   <div className="skills-container">
    //     {props.data.skills.map((skill) => (
    //       <p className="skills">{skill}</p>
    //     ))}
    //   </div>
    //   {/* <div>
    //     {props.data.score && (
    //       <div style={{ display: "flex", justifyContent: "space-around" }}>
    //         <div className="score-pill">
    //           <p>Blog score</p>
    //           <p>{`${props.data.score.blogscore} - ${props.data.score.blogCount}`}</p>
    //         </div>
    //         <div className="score-pill">
    //           <p>Project score</p>
    //           <p>{`${props.data.score.projectscore} - ${props.data.score.projectCount}`}</p>
    //         </div>
    //       </div>
    //     )}
    //   </div> */}
    // </div>
  );
}
