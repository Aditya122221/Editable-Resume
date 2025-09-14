import { useState } from 'react';
import GG from '../../GR.module.css';
import axios from 'axios';

function SkillSection({ skills, onSkillsUpdate }) {
    const [draggedItem, setDraggedItem] = useState(null);
    const [draggedCategory, setDraggedCategory] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [localSkills, setLocalSkills] = useState({
        language: [...(skills.language || [])],
        technologies: [...(skills.technologies || [])],
        skill: [...(skills.skill || [])],
        softskill: [...(skills.softskill || [])]
    });

    const handleDragStart = (e, item, category, index) => {
        setDraggedItem(item);
        setDraggedCategory(category);
        setDraggedIndex(index);
        e.dataTransfer.setData('text/plain', JSON.stringify({ item, category, index }));
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = (e) => {
        setDraggedItem(null);
        setDraggedCategory(null);
        setDraggedIndex(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const reorderArray = (array, fromIndex, toIndex) => {
        const newArray = [...array];
        const [removed] = newArray.splice(fromIndex, 1);
        newArray.splice(toIndex, 0, removed);
        return newArray;
    };

    const handleDrop = (e, targetCategory, targetIndex) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const { item, category, index } = data;

        if (category === targetCategory && index !== targetIndex) {
            // Reorder within same category
            const newArray = reorderArray(localSkills[category], index, targetIndex);
            const updatedSkills = {
                ...localSkills,
                [category]: newArray
            };
            setLocalSkills(updatedSkills);

            // Update parent component
            if (onSkillsUpdate) {
                onSkillsUpdate(updatedSkills);
            }

            // Save to backend
            saveSkillsToBackend(updatedSkills);

            console.log(`Reordered ${item} from position ${index} to ${targetIndex} in ${category}`);
        }
    };

    const saveSkillsToBackend = async (updatedSkills) => {
        try {
            const payload = {
                Registration_ID: localStorage.getItem("EditableReg"),
                language: updatedSkills.language,
                technologies: updatedSkills.technologies,
                skill: updatedSkills.skill,
                softskill: updatedSkills.softskill,
                flag: 2 // Update flag
            };

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/skill`, payload);
            console.log('Skills reordered successfully');
        } catch (error) {
            console.error('Error saving reordered skills:', error);
        }
    };

    const renderDraggableSkills = (skillArray, category) => {
        if (!skillArray || skillArray.length === 0) return '';

        return skillArray.map((skill, index) => (
            <span
                key={`${category}-${index}`}
                draggable
                onDragStart={(e) => handleDragStart(e, skill, category, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category, index)}
                className={GG.draggableSkill}
            >
                {skill}
                {index < skillArray.length - 1 && ", "}
            </span>
        ));
    };

    return (
        <div className={GG.tt} id="special">
            <div className={GG.title}>SKILLS</div>
            <hr className={GG.regularHR} />

            <div className={GG.aa}>
                {localSkills.language?.length > 0 && (
                    <div className={GG.ab}>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <div className={GG.ac}>Languages:</div>
                        <div className={GG.ad}>{renderDraggableSkills(localSkills.language, 'language')}</div>
                    </div>
                )}

                {localSkills.technologies?.length > 0 && (
                    <div className={GG.ab}>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <div className={GG.ac}>Frameworks:</div>
                        <div className={GG.ad}>{renderDraggableSkills(localSkills.technologies, 'technologies')}</div>
                    </div>
                )}

                {localSkills.skill?.length > 0 && (
                    <div className={GG.ab}>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <div className={GG.ac}>Tools/Platforms:</div>
                        <div className={GG.ad}>{renderDraggableSkills(localSkills.skill, 'skill')}</div>
                    </div>
                )}

                {localSkills.softskill?.length > 0 && (
                    <div className={GG.ab}>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <div className={GG.ac}>Soft Skills:</div>
                        <div className={GG.ad}>{renderDraggableSkills(localSkills.softskill, 'softskill')}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SkillSection;
