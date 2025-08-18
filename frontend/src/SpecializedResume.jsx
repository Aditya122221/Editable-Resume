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
  const [internship, setInternship] = useState([])
  const [isDownloadable, setIsDownloadable] = useState(false)

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

  const handleDelete = (index, a) => {
    if (a === 1) {
      setInternship((prev) => prev.filter((_, i) => i !== index))
    } else if (a === 2) {
      setProject((prev) => prev.filter((_, i) => i !== index))
    } else if (a === 3) {
      setCertificate((prev) => prev.filter((_, i) => i !== index))
    } else if (a === 4) {
      setEducation((prev) => prev.filter((_, i) => i !== index))
    }
    console.log("Deleted")
  }


  const handlePreview = () => {
    setIsDownloadable(true);

    setTimeout(() => {
      const resume = document.querySelector(`.${styles.resume}`);
      const safeName = profile.fullName
        ? profile.fullName.trim().replace(/\s+/g, "_")
        : "Full_Name";

      const fileName = `${safeName}_Specialized_Resume.pdf`;
      const options = {
        margin: 1,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a3", orientation: "portrait" }
      };

      html2pdf()
        .from(resume)
        .set(options)
        .outputPdf("bloburl")
        .then((pdfUrl) => {
          window.open(pdfUrl, "_blank");
          setIsDownloadable(false);
        });
    }, 500);
  };

  const handleDownload = () => {
    setIsDownloadable(true);

    setTimeout(() => {
      const resume = document.querySelector(`.${styles.resume}`);
      const safeName = profile.fullName
        ? profile.fullName.trim().replace(/\s+/g, "_")
        : "Full_Name";
      const fileName = `${safeName}_Specialized_Resume.pdf`;

      const options = {
        margin: 1,
        filename: fileName,
        image: { type: "jpeg", quality: 0.5 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "a3", orientation: "portrait" }
      };

      html2pdf()
        .from(resume)
        .set(options)
        .save()
        .catch((e) => console.error("PDF download failed:", e))
        .finally(() => setIsDownloadable(false));
    }, 100);
  };


  return (
    <>
      <Navbar />
      <button
        onClick={handlePreview}
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
        Preview
      </button>

      <button
        onClick={handleDownload}
        style={{
          padding: "8px 16px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
          marginLeft: "20px"
        }}
      >
        Download PDF
      </button>
      <div className={styles.resume}>
        <Header profile={profile} />

        {Array.isArray(internship) && internship.length > 0 && (
          <Summer internship={internship} onDelete={handleDelete} isDownloadable={isDownloadable} />
        )}

        {Array.isArray(project) && project.length > 0 && (
          <Project projects={project} onDelete={handleDelete} isDownloadable={isDownloadable} />
        )}

        {Array.isArray(certificate) && certificate.length > 0 && (
          <Certificate certificates={certificate} onDelete={handleDelete} isDownloadable={isDownloadable} />
        )}

        {skillls && Object.keys(skillls).length > 0 && (
          <TechnicalSkill skills={skillls} />
        )}

        {Array.isArray(education) && education.length > 0 && (
          <Education education={education} onDelete={handleDelete} isDownloadable={isDownloadable} />
        )}
      </div>
    </>
  );
}

export default SpecializedResume;
