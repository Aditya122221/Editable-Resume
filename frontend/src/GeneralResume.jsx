import Navbar from "./Navbar";
import GG from './GR.module.css';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

import Header from "./Components/GeneralResume/Header";
import SkillSection from "./Components/GeneralResume/SkillSection";
import Internship from "./Components/GeneralResume/Internship";
import Project from "./Components/GeneralResume/Projects";
import Certificate from "./Components/GeneralResume/Certificate";
import Education from "./Components/GeneralResume/Education";

function GeneralResume() {
    const [education, setEducation] = useState([]);
    const [certificate, setCertificate] = useState([]);
    const [project, setProject] = useState([]);
    const [internship, setInternship] = useState([]);
    const [profile, setProfile] = useState({});
    const [skills, setSkills] = useState({});
    const [isDownloadable, setIsDownloadable] = useState(false)

    const resumeRef = useRef();

    useEffect(() => {
        const payload = { Registration_ID: localStorage.getItem("EditableReg") };

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/fetchalldata`, payload)
            .then((res) => {

                setEducation(res.data.education || []);
                setCertificate(res.data.certificate || []);
                setProject(res.data.project || []);
                setInternship(res.data.internship || []);

                setProfile(res.data.profile || {});
                setSkills(res.data.skill || {});
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
            const resume = document.querySelector(`.${GG.container}`);
            const safeName = profile.fullName
                ? profile.fullName.trim().replace(/\s+/g, "_")
                : "Full_Name";

            const fileName = `${safeName}_General_Resume.pdf`;
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
                .toPdf()
                .get("pdf")
                .then((pdf) => {
                    const blob = pdf.output("blob");
                    const url = URL.createObjectURL(blob);
                    window.open(url, "_blank"); // preview
                })
                .catch((e) => console.error("PDF preview failed:", e))
                .finally(() => {
                    setIsDownloadable(false); // always re-show X buttons
                });
        }, 100);
    };


    const handleDownload = () => {
        setIsDownloadable(true);

        setTimeout(() => {
            const resume = document.querySelector(`.${GG.container}`);
            const safeName = profile.fullName
                ? profile.fullName.trim().replace(/\s+/g, "_")
                : "Full_Name";
            const fileName = `${safeName}_General_Resume.pdf`;

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

            <div className={GG.container} ref={resumeRef}>
                <Header profile={profile} />
                {skills && Object.keys(skills).length > 0 && <SkillSection skills={skills} />}
                {internship && internship.length > 0 && <Internship internship={internship} onDelete={handleDelete} isDownloadable={isDownloadable} />}
                {project && project.length > 0 && <Project project={project} onDelete={handleDelete} isDownloadable={isDownloadable} />}
                {certificate && certificate.length > 0 && <Certificate certificate={certificate} onDelete={handleDelete} isDownloadable={isDownloadable} />}
                {education && education.length > 0 && <Education education={education} onDelete={handleDelete} isDownloadable={isDownloadable} />}
            </div>
        </>
    );
}

export default GeneralResume;
