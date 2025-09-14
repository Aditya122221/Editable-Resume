import { useState } from 'react';
import styles from '../../style.module.css';
import axios from 'axios';

function TechnicalSkill({ skills = {}, onSkillsUpdate }) {
    const { language = [], technologies = [], skill = [], softskill = [] } = skills;
    const [draggedItem, setDraggedItem] = useState(null);
    const [draggedCategory, setDraggedCategory] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [localSkills, setLocalSkills] = useState({
        language: [...language],
        technologies: [...technologies],
        skill: [...skill],
        softskill: [...softskill]
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

    const renderDraggableList = (items, category) =>
        items && items.length > 0
            ? items.map((item, index) => (
                <span
                    key={`${category}-${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, category, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, category, index)}
                    className={styles.draggableSkill}
                >
                    {item}
                    {index < items.length - 1 && ", "}
                </span>
            ))
            : "";

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Technical Skills</h2>
            <div className={styles.skillsContainer}>
                {localSkills.language.length !== 0 ? <p className={styles.skillLine}>
                    <strong>Languages:</strong> {renderDraggableList(localSkills.language, 'language')}
                </p> : ''}
                {localSkills.technologies.length !== 0 ? <p className={styles.skillLine}>
                    <strong>Technologies/Frameworks:</strong> {renderDraggableList(localSkills.technologies, 'technologies')}
                </p> : ''}
                {localSkills.skill.length !== 0 ? <p className={styles.skillLine}>
                    <strong>Tools/Platforms:</strong> {renderDraggableList(localSkills.skill, 'skill')}
                </p> : ''}
                {localSkills.softskill.length !== 0 ? <p className={styles.skillLine}>
                    <strong>Soft Skills:</strong> {renderDraggableList(localSkills.softskill, 'softskill')}
                </p> : ''}
            </div>
        </div>
    );
}

export default TechnicalSkill;