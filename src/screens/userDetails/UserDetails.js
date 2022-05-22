import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./userDetails.css";
import { MultiSelect } from "react-multi-select-component";
import skills from "../../utils/skills";
import axios from "axios";

export default function UserDetails() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [selected, setSelected] = useState([]);
  const [tempData, setTempData] = useState({
    medium: "",
    github: "",
    devto: "",
  });
  const [educationDetails, setEducationDetails] = useState([
    {
      Degree: "",
      Institution: "",
      StartYear: "",
      EndYear: "",
    },
  ]);
  const [experienceDetails, setExperienceDetails] = useState([
    {
      CompanyName: "",
      Duration: "",
      Position: "",
      Description: "",
    },
  ]);
  const { state } = useLocation();

  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (name, value, index) => {
    let tempEducationDetails = [...educationDetails];
    tempEducationDetails[index][name] = value;
    setEducationDetails([...tempEducationDetails]);
    console.log(educationDetails);
  };

  const handleExperienceChange = (name, value, index) => {
    let tempExperienceDetails = [...experienceDetails];
    tempExperienceDetails[index][name] = value;
    setExperienceDetails([...tempExperienceDetails]);
  };

  const handleAddEducation = () => {
    setEducationDetails([
      ...educationDetails,
      {
        Degree: "",
        Institution: "",
        StartYear: "",
        EndYear: "",
      },
    ]);
  };

  const handleAddExperience = () => {
    setExperienceDetails([
      ...experienceDetails,
      {
        CompanyName: "",
        Duration: "",
        Position: "",
        Description: "",
      },
    ]);
  };

  const handleSubmit = () => {
    let tempSelected = selected;
    selected.forEach((skill, index) => {
      tempSelected[index] = skill.value;
    });
    setUserData({
      ...state,
      ...tempData,
      skills: tempSelected,
      ...educationDetails,
      ...experienceDetails,
    });
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        ...state,
        ...tempData,
        skills: tempSelected,
        education: [...educationDetails],
        experience: [...experienceDetails],
      })
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="userDetails-wrapper" style={{ backgroundColor: "#0EAD69" }}>
      <p>Select Skills</p>
      <div className="skill-container">
        {selected.map((skill) => (
          <div className="skill-label">{skill.value}</div>
        ))}
      </div>
      <div className="skill-selector">
        <MultiSelect
          options={skills}
          value={selected}
          onChange={setSelected}
          labelledBy="Select skill"
        />
      </div>
      <div className="userDetails-form">
        <input
          placeholder="Medium username"
          name="medium"
          onChange={handleChange}
          className="input-field"
        />
        <input
          placeholder="Github username"
          name="github"
          onChange={handleChange}
          className="input-field"
        />
        <input
          placeholder="Dev.to username"
          name="devto"
          onChange={handleChange}
          className="input-field"
        />
        <input
          placeholder="DOB ex: 05 Mar 2002"
          name="Dob"
          onChange={handleChange}
          className="input-field"
        />
      </div>
      {educationDetails.map((education, index) => (
        <div className="education-container">
          <input
            placeholder="Degree"
            value={education.Degree}
            name="Degree"
            onChange={(e) =>
              handleEducationChange(e.target.name, e.target.value, index)
            }
            className="input-field"
          />
          <input
            placeholder="Institution"
            value={education.Institution}
            name="Institution"
            onChange={(e) =>
              handleEducationChange(e.target.name, e.target.value, index)
            }
            className="input-field"
          />
          <input
            placeholder="Start Year Ex: 12 Mar 2017"
            value={education.StartYear}
            name="StartYear"
            onChange={(e) =>
              handleEducationChange(e.target.name, e.target.value, index)
            }
            className="input-field"
          />
          <input
            placeholder="End Year Ex: 12 Mar 2020"
            value={education.EndYear}
            name="EndYear"
            onChange={(e) =>
              handleEducationChange(e.target.name, e.target.value, index)
            }
            className="input-field"
          />
        </div>
      ))}
      <button onClick={handleAddEducation}>Add Education</button>
      {experienceDetails.map((experience, index) => (
        <div className="education-container">
          <input
            placeholder="Company Name"
            value={experience.companyName}
            name="companyName"
            onChange={(e) =>
              handleExperienceChange(e.target.name, e.target.value, index)
            }
            className="input-field"
          />
          <input
            placeholder="Position"
            value={experience.position}
            name="position"
            onChange={(e) =>
              handleExperienceChange(e.target.name, e.target.value, index)
            }
            className="input-field"
          />
          <input
            placeholder="Duration Ex: Mar 2020 - Jun 2020"
            value={experience.duration}
            name="duration"
            onChange={(e) =>
              handleExperienceChange(e.target.name, e.target.value, index)
            }
            className="input-field"
          />
          <input
            placeholder="Description"
            value={experience.Description}
            name="Description"
            onChange={(e) =>
              handleExperienceChange(e.target.name, e.target.value, index)
            }
            className="input-field"
          />
        </div>
      ))}
      <button onClick={handleAddExperience}>Add Experience</button>
      <button onClick={handleSubmit}>Create Account</button>
    </div>
  );
}
