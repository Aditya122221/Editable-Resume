import { useEffect, useState } from 'react';
import SS from '../../CSS/Skill.module.css';
import axios from 'axios';
import Navbar from './Navbar';

const api = `${import.meta.env.VITE_API_BASE_URL}/skill`;

const SkillsSection = () => {
    const [languages, setLanguages] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [skills, setSkills] = useState([]);
    const [softSkills, setSoftSkills] = useState([]);
    const [skillID, setSkillID] = useState('');

    const [languageInput, setLanguageInput] = useState('');
    const [technologyInput, setTechnologyInput] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [softSkillInput, setSoftSkillInput] = useState('');

    const addItem = (input, setInput, items, setItems) => {
        if (input.trim() !== '') {
            setItems([...items, input.trim()]);
            setInput('');
        }
    };

    const removeItem = (index, items, setItems) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const renderSection = (title, input, setInput, items, setItems) => (
        <section className={SS.section}>
            <h3 className={SS.sectionTitle}>{title}</h3>
            <div className={SS.inputGroup}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Enter ${title.toLowerCase()}`}
                    className={SS.input}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addItem(input, setInput, items, setItems);
                        }
                    }}
                />
                <button
                    type="button"
                    onClick={() => addItem(input, setInput, items, setItems)}
                    className={SS.addButton}
                >
                    Add
                </button>
            </div>
            {items.length > 0 && (
                <div className={SS.itemsList}>
                    {items.map((item, index) => (
                        <div key={index} className={SS.item}>
                            <span className={SS.itemText}>{item}</span>
                            <button
                                type="button"
                                onClick={() => removeItem(index, items, setItems)}
                                className={SS.removeButton}
                                aria-label={`Remove ${item}`}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );

    const handleSkill = (e) => {
        e.preventDefault();

        const payload = {
            Registration_ID: localStorage.getItem("EditableReg"),
            Skill_ID: skillID,
            language: languages,
            technologies: technologies,
            skill: skills,
            softskill: softSkills,
            flag: skillID ? 2 : 3
        };

        axios.post(api, payload)
            .then((res) => {
                alert(res.data.message);
            })
            .catch(() => {
                console.log("Skill add error");
            });
    };

    useEffect(() => {
        const payload = {
            Registration_ID: localStorage.getItem('EditableReg'),
            flag: 1
        };

        axios.post(api, payload)
            .then((res) => {

                console.log(res.data.skill)
                if (res.data && res.data.skill) {
                    setLanguages(res.data.skill.language || []);
                    setTechnologies(res.data.skill.technologies || []);
                    setSkills(res.data.skill.skill || []);
                    setSoftSkills(res.data.skill.softskill || []);
                    setSkillID(res.data.skill.Skill_ID || '');
                } else {
                    // No skill data in DB → keep empty arrays
                    setLanguages([]);
                    setTechnologies([]);
                    setSkills([]);
                    setSoftSkills([]);
                    setSkillID('');
                }
            })
            .catch((err) => {
                console.log("Error in skill fetch", err);
            });
    }, []); // Empty array so it runs only once, not on every handleSkill change

    return (
        <div className={SS.container}>
            <Navbar />
            <h2 className={SS.title}>Skills</h2>
            <form onSubmit={handleSkill} className={SS.form}>
                {renderSection('Languages', languageInput, setLanguageInput, languages, setLanguages)}
                {renderSection('Technologies', technologyInput, setTechnologyInput, technologies, setTechnologies)}
                {renderSection('Tools/Platforms', skillInput, setSkillInput, skills, setSkills)}
                {renderSection('Soft Skills', softSkillInput, setSoftSkillInput, softSkills, setSoftSkills)}

                <button type='submit'>Add Skills</button>
            </form>
        </div>
    );
};

export default SkillsSection;
