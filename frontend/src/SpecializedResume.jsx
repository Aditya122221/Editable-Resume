import Header from './Components/SpecializedResume/Header.jsx'
import Summer from './Components/SpecializedResume/Summer.jsx';
import Project from './Components/SpecializedResume/Project.jsx';
import Certificate from './Components/SpecializedResume/Certificate.jsx';
import TechnicalSkill from './Components/SpecializedResume/TechnicalSkill.jsx';
import Education from './Components/SpecializedResume/Education.jsx';
import Navbar from './Navbar.jsx'
import styles from './style.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import html2pdf from "html2pdf.js";

function SpecializedResume() {
  const [education, setEducation] = useState([])
  const [certificate, setCertificate] = useState([])
  const [project, setProject] = useState([])
  const [profile, setProfile] = useState({})
  const [skillls, setSkillls] = useState({})
  const [internship, setInternship] = useState([])  // changed to array

  useEffect(() => {
    const payload = { Registration_ID: localStorage.getItem("EditableReg") };

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/fetchalldata`, payload)
      .then((res) => {
        const sortByDateDesc = (arr, dateKey) => {
          return [...arr].sort((a, b) => {
            const dateA = new Date(a[dateKey]);
            const dateB = new Date(b[dateKey]);
            return dateB - dateA; // newest first
          });
        };

        setEducation(sortByDateDesc(res.data.education, "startDate"));
        setCertificate(sortByDateDesc(res.data.certificate, "startDate"));
        setProject(sortByDateDesc(res.data.project, "startDate"));
        setInternship(sortByDateDesc(res.data.internship, "startDate"));  // array expected

        setProfile(res.data.profile || {});
        setSkillls(res.data.skill || {});
      })
      .catch((err) => {
        console.log("All data fetching error", err);
      });
  }, []);


  const handleDownload = () => {
    const resume = document.querySelector(`.${styles.resume}`);
    const safeName = profile.fullName
      ? profile.fullName.trim().replace(/\s+/g, "_")
      : "Full_Name";

    const fileName = `${safeName}_Specialized_Resume.pdf`;
    const options = {
      margin: 0.5,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a3", orientation: "portrait" }
    };
    html2pdf().from(resume).set(options).save();
  };

  return (
    <>
      <Navbar />
      <button
        onClick={handleDownload}
        style={{
          padding: "8px 16px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Download PDF
      </button>
      <div className={styles.resume}>
        <Header profile={profile} />

        {Array.isArray(internship) && internship.length > 0 && (
          <Summer internship={internship} />
        )}

        {Array.isArray(project) && project.length > 0 && (
          <Project projects={project} />
        )}

        {Array.isArray(certificate) && certificate.length > 0 && (
          <Certificate certificates={certificate} />
        )}

        {skillls && Object.keys(skillls).length > 0 && (
          <TechnicalSkill skills={skillls} />
        )}

        {Array.isArray(education) && education.length > 0 && (
          <Education education={education} />
        )}
      </div>
    </>
  );
}

export default SpecializedResume;
