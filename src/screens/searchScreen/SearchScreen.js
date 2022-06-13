import React, { useState, useEffect } from "react";
import Bottomnav from "../../components/BottomNav";
import "./searchScreen.css";
import { Button, Select, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import UserCard from "../../components/Card/UserCard";
import { Typography } from "antd";
const { Title, Text, Link } = Typography;
const { Option } = Select;

export default function SearchScreen() {
  const [searchValue, setSearchValue] = useState({
    searchText: "",
    searchType: "user",
  });
  const [searchResult, setSearchResult] = useState([]);
  //   const [skillResult, setSkillResult] = useState([]);
  const [distance, setDistance] = useState();
  const token = localStorage.getItem("token");

  const handleChange = (value) => {
    setSearchResult([]);
    setSearchValue({ ...searchValue, searchType: value });
  };

  const handleTextChange = (e) => {
    if (searchValue.searchType === "location")
      setSearchValue({ ...searchValue, searchText: String(e.target.value) });
    else setSearchValue({ ...searchValue, searchText: e.target.value });
  };

  const handleDistanceChange = (e) => setDistance(e.target.value);

  const handleSearch = () => {
    setSearchResult([]);

    if (searchValue.searchType === "skill") {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/get/user/skills`,
          { skills: [searchValue.searchText] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          response.data.data && setSearchResult(response.data.data);
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong");
        });
    } else if (searchValue.searchType === "location") {
      navigator.geolocation.getCurrentPosition(function (position) {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/get/user/location`,
            { location: [position.coords.latitude, position.coords.longitude] },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data.data);
            response.data.data &&
              setSearchResult(
                response.data.data.filter(
                  (user) => user.Distance < searchValue.searchText
                )
              );
          })
          .catch((err) => {
            console.log(err);
            alert("something went wrong");
          });
      });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/${searchValue.searchType}/user/search`,
          { search: searchValue.searchText },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          response.data.data && setSearchResult(response.data.data);
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong");
        });
    }
  };

  useEffect(() => console.log(searchResult), [searchResult]);

  return (
    <div
      style={{
        minWidth: "100%",
      }}
    >
      {searchValue.searchType !== "location" && (
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onChange={handleTextChange}
        />
      )}
      {searchValue.searchType === "location" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label for="distance">Distance (in kms):</label>
          <input
            type="range"
            id="distance"
            name="distance"
            min="0"
            max="50000"
            onChange={(e) => {
              handleTextChange(e);
              handleDistanceChange(e);
            }}
            style={{ padding: "1em" }}
          />
          <h2 style={{ marginLeft: "1em" }}>{distance}</h2>
        </div>
      )}
      <div className="search-selector-container">
        <Select
          defaultValue="user"
          style={{ width: "20%" }}
          onChange={handleChange}
        >
          <Option value="user">User</Option>
          <Option value="project">Project</Option>
          <Option value="blog">Blog</Option>
          <Option value="skill">Skill</Option>
          <Option value="location">Location</Option>
        </Select>
        <Button icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
      </div>
      {console.log(searchResult.length)}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {(searchValue.searchType === "project" ||
          searchValue.searchType === "blog") &&
          searchResult.length > 0 &&
          searchResult.map((project, i) => (
            <Card
              style={{
                margin: 15,
                borderRadius: "20px",
                backgroundColor: "#8EF6C9",
              }}
              className="project-card"
            >
              <a
                style={{ textDecoration: "none", color: "black" }}
                href={`https://github.com/${project.Full_name}`}
              >
                <Title level={3}>{project.Name}</Title>
              </a>
              <p>{project.Description}</p>
              {/* <Text
              underline
              onClick={() => onClickProjectHandler(project.Github_id)}
            >
              click to ShowCase
            </Text> */}
            </Card>
            // <Card style={{ margin: 15 }} className="project-card">
            //   <a
            //     style={{ textDecoration: "none", color: "black" }}
            //     href={`https://github.com/${project.Full_name}`}
            //   >
            //     <h3>{project.Name}</h3>
            //     <p>{project.Description}</p>
            //     <p>{project.Language}</p>
            //   </a>
            // </Card>
          ))}
        {searchValue.searchType === "user" &&
          searchResult.length > 0 &&
          searchResult.map((user, i) => (
            <UserCard
              key={i}
              data={{
                status: user.status,
                name: user.Name,
                bio: user.Description,
                skills: user.Skills,
                image: user.profileImgUrl,
                id: user._id,
                score: user.Score.score,
              }}
            />
          ))}
        {searchValue.searchType === "skill" &&
          searchResult.length > 0 &&
          searchResult.map((user, i) => (
            <UserCard
              key={i}
              data={{
                status: user.status,
                name: user.Name,
                bio: user.Description,
                skills: user.Skills,
                image: user.profileImgUrl,
                id: user._id,
                score: user.Score.score,
              }}
            />
          ))}
        {searchValue.searchType === "location" &&
          searchResult.length > 0 &&
          searchResult.map((user, i) => (
            <UserCard
              key={i}
              data={{
                status: user.user.status,
                name: user.user.Name,
                bio: user.user.Description,
                skills: user.user.Skills,
                image: user.user.profileImgUrl,
                id: user.user._id,
                score: user.user.Score.score,
              }}
            />
          ))}
      </div>
      <Bottomnav tab="search" />
    </div>
  );
}
