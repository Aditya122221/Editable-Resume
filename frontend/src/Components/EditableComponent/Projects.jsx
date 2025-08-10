import { useState, useEffect } from 'react';
import PP from '../../CSS/Projects.module.css';
import axios from "axios";
import Navbar from './Navbar';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/project`;

const Projects = () => {
    // Form state
    const [formData, setFormData] = useState({
        Project_ID: '',
        name: '',
        technologies: '',
        startDate: '',
        endDate: '',
        description: '',
        githubLink: ''
    });

    // Arrays for technologies and descriptions
    const [technologiesList, setTechnologiesList] = useState([]);
    const [descriptionsList, setDescriptionsList] = useState([]);

    // Projects list and editing state
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Add technology to array
    const addTechnology = () => {
        if (formData.technologies.trim()) {
            setTechnologiesList(prev => [...prev, formData.technologies.trim()]);
            setFormData(prev => ({ ...prev, technologies: '' }));
        }
    };

    // Add description to array
    const addDescription = () => {
        if (formData.description.trim()) {
            setDescriptionsList(prev => [...prev, formData.description.trim()]);
            setFormData(prev => ({ ...prev, description: '' }));
        }
    };

    // Remove technology from array
    const removeTechnology = (index) => {
        setTechnologiesList(prev => prev.filter((_, i) => i !== index));
    };

    // Remove description from array
    const removeDescription = (index) => {
        setDescriptionsList(prev => prev.filter((_, i) => i !== index));
    };

    // Add or update project
    const handleAddProject = async () => {
        const missingFields = [];

        if (!formData.name?.trim()) missingFields.push("Project Name");
        if (!formData.startDate) missingFields.push("Start Date");
        if (!formData.description || formData.description.length === 0) missingFields.push("Description");
        if (!formData.technologies || formData.technologies.length === 0) missingFields.push("Technologies");

        if (missingFields.length > 0) {
            alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
            return;
        }

        const payload = {
            Registration_ID: localStorage.getItem('EditableReg'),
            Name: formData.name,
            technologies: technologiesList,
            startDate: formatMonthYear(formData.startDate),
            endDate: formatMonthYear(formData.endDate),
            description: descriptionsList,
            githubLink: formData.githubLink,
        };

        try {
            if (editingId) {
                // Update (flag = 2)
                const res = await axios.post(API_URL, {
                    Project_ID: editingId,
                    ...payload,
                    flag: 2
                });
                if (res.data.status) {
                    setProjects(prev =>
                        prev.map(p => p.id === editingId ? { id: editingId, ...payload } : p)
                    );
                }
            } else {
                // Add new (flag = else)
                const res = await axios.post(API_URL, {
                    ...payload,
                    flag: 4
                });
                if (res.data.status) {
                    alert(res.data.message)
                }
            }
        } catch (err) {
            console.error("Error saving project", err);
        }

        // Reset form
        setFormData({
            name: '',
            technologies: '',
            startDate: '',
            endDate: '',
            description: '',
            githubLink: ''
        });
        setTechnologiesList([]);
        setDescriptionsList([]);
        setEditingId(null);
    };


    const handleUpdateProject = (project) => {
        setFormData({
            name: project.name,
            technologies: '',
            startDate: parseMonthYear(project.startDate),
            endDate: parseMonthYear(project.endDate),
            description: '',
            githubLink: project.githubLink
        });
        setTechnologiesList([...project.technologies]);
        setDescriptionsList([...project.description]);
        setEditingId(project.Project_ID);
    };

    // Delete project
    const handleDeleteProject = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/project`, {
                    Project_ID: id,
                    flag: 3
                });
                if (res.status === 200) {
                    alert("Project Deleted");
                }
            } catch (err) {
                console.error("Error deleting project", err);
            }
        }
    };


    // Cancel editing
    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({
            Project_ID: '',
            name: '',
            technologies: '',
            startDate: '',
            endDate: '',
            description: '',
            githubLink: ''
        });
        setTechnologiesList([]);
        setDescriptionsList([]);
    };

    const formatMonthYear = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleString("en-US", { month: "short", year: "numeric" });
    };

    const parseMonthYear = (monthYear) => {
        if (!monthYear) return "";
        const d = new Date(monthYear);
        // pad month/day so it's "YYYY-MM-DD"
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
    };


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.post(API_URL, {
                    Registration_ID: localStorage.getItem("EditableReg"),
                    flag: 1
                });
                setProjects(res.data.project || []);
            } catch (err) {
                console.error("Error fetching projects", err);
            }
        };
        fetchProjects();
    }, [handleAddProject, handleDeleteProject, handleUpdateProject]);


    return (
        <div className={PP.container}>
            <Navbar />
            <div className={PP.formSection}>
                <h2 className={PP.sectionTitle}>
                    {editingId ? 'Update Project' : 'Add New Project'}
                </h2>

                <div className={PP.form}>
                    <div className={PP.inputGroup}>
                        <label className={PP.label}>Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={PP.input}
                            placeholder="Enter project name"
                            required
                        />
                    </div>

                    <div className={PP.inputGroup}>
                        <label className={PP.label}>Technologies</label>
                        <div className={PP.inputWithButton}>
                            <input
                                type="text"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleInputChange}
                                className={PP.input}
                                placeholder="Enter technology"
                            />
                            <button
                                type="button"
                                onClick={addTechnology}
                                className={PP.addButton}
                            >
                                Add
                            </button>
                        </div>
                        {technologiesList.length > 0 && (
                            <div className={PP.tagContainer}>
                                {technologiesList.map((tech, index) => (
                                    <span key={index} className={PP.tag}>
                                        {tech}
                                        <button
                                            type="button"
                                            onClick={() => removeTechnology(index)}
                                            className={PP.removeTag}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={PP.dateGroup}>
                        <div className={PP.inputGroup}>
                            <label className={PP.label}>Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className={PP.input}
                            />
                        </div>
                        <div className={PP.inputGroup}>
                            <label className={PP.label}>End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className={PP.input}
                            />
                        </div>
                    </div>

                    <div className={PP.inputGroup}>
                        <label className={PP.label}>Description</label>
                        <div className={PP.inputWithButton}>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className={PP.textarea}
                                placeholder="Enter description point"
                                rows="3"
                            />
                            <button
                                type="button"
                                onClick={addDescription}
                                className={PP.addButton}
                            >
                                Add
                            </button>
                        </div>
                        {descriptionsList.length > 0 && (
                            <div className={PP.descriptionList}>
                                {descriptionsList.map((desc, index) => (
                                    <div key={index} className={PP.descriptionItem}>
                                        <span>• {desc}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeDescription(index)}
                                            className={PP.removeDescription}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={PP.inputGroup}>
                        <label className={PP.label}>GitHub Link</label>
                        <input
                            type="url"
                            name="githubLink"
                            value={formData.githubLink}
                            onChange={handleInputChange}
                            className={PP.input}
                            placeholder="https://github.com/username/repository"
                        />
                    </div>

                    <div className={PP.buttonGroup}>
                        <button
                            type="button"
                            onClick={handleAddProject}
                            className={PP.submitButton}
                        >
                            {editingId ? 'Update Project' : 'Add Project'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className={PP.cancelButton}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className={PP.projectsSection}>
                <h2 className={PP.sectionTitle}>Projects ({projects.length})</h2>

                {projects.length === 0 ? (
                    <div className={PP.emptyState}>
                        <p>No projects added yet. Create your first project above!</p>
                    </div>
                ) : (
                    <div className={PP.projectGrid}>
                        {projects.map((project) => (
                            <div key={project.Project_ID} className={PP.projectCard}>
                                <div className={PP.cardHeader}>
                                    <h3 className={PP.projectName}>{project.name}</h3>
                                    <div className={PP.cardActions}>
                                        <button
                                            onClick={() => handleUpdateProject(project)}
                                            className={PP.updateButton}
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.Project_ID)}
                                            className={PP.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {project.technologies.length > 0 && (
                                    <div className={PP.cardSection}>
                                        <h4 className={PP.sectionLabel}>Technologies:</h4>
                                        <div className={PP.tagContainer}>
                                            {project.technologies.map((tech, index) => (
                                                <span key={index} className={PP.techTag}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {(project.startDate || project.endDate) && (
                                    <div className={PP.cardSection}>
                                        <h4 className={PP.sectionLabel}>Duration:</h4>
                                        <p className={PP.dateRange}>
                                            {project.startDate && new Date(project.startDate).toLocaleDateString()}
                                            {project.startDate && project.endDate && ' - '}
                                            {project.endDate && new Date(project.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}

                                {project.description.length > 0 && (
                                    <div className={PP.cardSection}>
                                        <h4 className={PP.sectionLabel}>Description:</h4>
                                        <ul className={PP.descriptionPoints}>
                                            {project.description.map((desc, index) => (
                                                <li key={index}>{desc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.githubLink && (
                                    <div className={PP.cardSection}>
                                        <h4 className={PP.sectionLabel}>GitHub:</h4>
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={PP.githubLink}
                                        >
                                            View Repository
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;