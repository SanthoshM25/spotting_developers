import React, { useState, useEffect } from "react";
import Bottomnav from "../../components/BottomNav";
import "./searchScreen.css";
import { Button, Select, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import UserCard from "../../components/Card/UserCard";

const { Option } = Select;

export default function SearchScreen() {
  const [searchValue, setSearchValue] = useState({
    searchText: "",
    searchType: "user",
  });
  const [searchResult, setSearchResult] = useState([]);
  //   const [skillResult, setSkillResult] = useState([]);
  const token = localStorage.getItem("token");

  const handleChange = (value) => {
    setSearchValue({ ...searchValue, searchType: value });
  };

  const handleTextChange = (e) => {
    setSearchValue({ ...searchValue, searchText: e.target.value });
  };

  const handleSearch = () => {
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
    <div style={{ minWidth: "100%" }}>
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        onChange={handleTextChange}
      />
      <div className="search-selector-container">
        <Select
          defaultValue="user"
          //   style={{ width: "20%" }}
          onChange={handleChange}
        >
          <Option value="user">User</Option>
          <Option value="project">Project</Option>
          <Option value="blog">Blog</Option>
          <Option value="skill">Skill</Option>
        </Select>
        <Button icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
      </div>
      {console.log(searchResult.length)}
      {searchValue.searchType === "project" ||
        (searchValue.searchType === "blog" &&
          searchResult.length > 0 &&
          searchResult.map((project, i) => (
            <Card style={{ margin: 15 }} className="project-card">
              <a
                style={{ textDecoration: "none", color: "black" }}
                href={`https://github.com/${project.Full_name}`}
              >
                <h3>{project.Name}</h3>
                <p>{project.Description}</p>
                <p>{project.Language}</p>
              </a>
            </Card>
          )))}
      {/* {searchValue.searchType === "user" && searchResult.length > 0 &&
        searchResult.map((user, i) => (
          <UserCard
            key={i}
            data={{
              name: user.Name,
              bio: user.Description,
              // skills: user.Skills,
              // image: user.profileImageUrl,
            }}
          />
        ))} */}
      <Bottomnav tab="search" />
    </div>
  );
}
