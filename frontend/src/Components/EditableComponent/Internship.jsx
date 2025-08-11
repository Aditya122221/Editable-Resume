import { useState, useEffect } from 'react';
import axios from 'axios';
import II from '../../CSS/Internship.module.css';
import Navbar from './Navbar';

const InternshipSection = () => {
    const [formData, setFormData] = useState({
        internshipType: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: '',
        technology: ''
    });

    const [descriptions, setDescriptions] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [internships, setInternships] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Format for display (MMM YYYY)
    const formatDateDisplay = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    const fetchInternships = async () => {
        const Registration_ID = localStorage.getItem('EditableReg');
        if (!Registration_ID) {
            alert('Registration ID not found in localStorage');
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/internship`, {
                Registration_ID,
                flag: 1
            });
            if (response.status === 200 && response.data?.internship) {
                const internshipsFromApi = response.data.internship.map(item => ({
                    Internship_ID: item.Internship_ID,
                    type: item.type,
                    companyName: item.companyName,
                    startDate: item.startDate, // stored as ISO date
                    endDate: item.endDate,
                    description: item.description || [],
                    technologies: item.technologies || []
                }));
                setInternships(internshipsFromApi);
            } else {
                alert('Failed to fetch internships');
            }
        } catch (error) {
            console.error('Fetch internships error:', error);
            alert('Error fetching internships');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addDescription = () => {
        if (formData.description.trim()) {
            setDescriptions(prev => [...prev, formData.description.trim()]);
            setFormData(prev => ({ ...prev, description: '' }));
        }
    };

    const addTechnology = () => {
        if (formData.technology.trim()) {
            setTechnologies(prev => [...prev, formData.technology.trim()]);
            setFormData(prev => ({ ...prev, technology: '' }));
        }
    };

    const removeDescription = (index) => {
        setDescriptions(prev => prev.filter((_, i) => i !== index));
    };

    const removeTechnology = (index) => {
        setTechnologies(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const Registration_ID = localStorage.getItem('EditableReg');
        if (!Registration_ID) {
            alert('Registration ID not found in localStorage');
            return;
        }

        if (!formData.internshipType || !formData.companyName || !formData.startDate) {
            alert('Please fill in all required fields');
            return;
        }

        const payload = {
            Registration_ID,
            companyName: formData.companyName,
            startDate: new Date(formData.startDate), // store real Date
            endDate: formData.endDate ? new Date(formData.endDate) : null,
            description: descriptions,
            technologies: technologies,
            type: formData.internshipType,
            flag: editingId ? 2 : 4
        };

        if (editingId) {
            payload.Internship_ID = editingId;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/internship`, payload);
            alert(response.data.message);
            fetchInternships();
            resetForm();
        } catch (error) {
            console.error('Submit internship error:', error);
            alert('Error submitting internship');
        }
    };

    const resetForm = () => {
        setFormData({
            internshipType: '',
            companyName: '',
            startDate: '',
            endDate: '',
            description: '',
            technology: ''
        });
        setDescriptions([]);
        setTechnologies([]);
        setEditingId(null);
    };

    const handleEdit = (internship) => {
        setFormData({
            internshipType: internship.type,
            companyName: internship.companyName,
            startDate: internship.startDate ? new Date(internship.startDate).toISOString().split("T")[0] : "",
            endDate: internship.endDate ? new Date(internship.endDate).toISOString().split("T")[0] : "",
            description: '',
            technology: ''
        });
        setDescriptions([...internship.description]);
        setTechnologies([...internship.technologies]);
        setEditingId(internship.Internship_ID);
    };

    const handleDelete = async (id) => {
        const Registration_ID = localStorage.getItem('EditableReg');
        if (!Registration_ID) {
            alert('Registration ID not found in localStorage');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this internship?')) return;

        try {
            const response = await axios.post(`${API_BASE_URL}/internship`, {
                Registration_ID,
                Internship_ID: id,
                flag: 3
            });
            alert(response.data.message);
            fetchInternships();
        } catch (error) {
            console.error('Delete internship error:', error);
            alert('Error deleting internship');
        }
    };

    useEffect(() => {
        fetchInternships();
    }, [handleSubmit, handleDelete]);

    return (
        <div className={II.container}>
            <Navbar />
            <div className={II.formSection}>
                <h2 className={II.sectionTitle}>
                    {editingId ? 'Edit Internship' : 'Add New Internship'}
                </h2>

                <div className={II.form}>
                    <div className={II.formRow}>
                        <div className={II.formGroup}>
                            <label className={II.label}>Internship Type *</label>
                            <select
                                name="internshipType"
                                value={formData.internshipType}
                                onChange={handleInputChange}
                                className={II.select}
                            >
                                <option value="">Select Type</option>
                                <option value="Summer Training">Summer Training</option>
                                <option value="Internship">Internship</option>
                                <option value="Experience">Experience</option>
                            </select>
                        </div>

                        <div className={II.formGroup}>
                            <label className={II.label}>Company Name *</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Enter company name"
                                className={II.input}
                            />
                        </div>
                    </div>

                    <div className={II.formRow}>
                        <div className={II.formGroup}>
                            <label className={II.label}>Start Date *</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className={II.input}
                            />
                        </div>

                        <div className={II.formGroup}>
                            <label className={II.label}>End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className={II.input}
                            />
                        </div>
                    </div>

                    <div className={II.formGroup}>
                        <label className={II.label}>Description</label>
                        <div className={II.inputWithButton}>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter description"
                                className={II.textarea}
                                rows="3"
                            />
                            <button type="button" onClick={addDescription} className={II.addButton}>
                                Add
                            </button>
                        </div>
                        {descriptions.length > 0 && (
                            <div className={II.badgeContainer}>
                                {descriptions.map((desc, index) => (
                                    <span key={index} className={II.badge}>
                                        {desc}
                                        <button onClick={() => removeDescription(index)} className={II.removeBadge}>
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={II.formGroup}>
                        <label className={II.label}>Technologies</label>
                        <div className={II.inputWithButton}>
                            <input
                                type="text"
                                name="technology"
                                value={formData.technology}
                                onChange={handleInputChange}
                                placeholder="Enter technology"
                                className={II.input}
                            />
                            <button type="button" onClick={addTechnology} className={II.addButton}>
                                Add
                            </button>
                        </div>
                        {technologies.length > 0 && (
                            <div className={II.badgeContainer}>
                                {technologies.map((tech, index) => (
                                    <span key={index} className={II.badge}>
                                        {tech}
                                        <button onClick={() => removeTechnology(index)} className={II.removeBadge}>
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={II.formActions}>
                        <button onClick={handleSubmit} className={II.submitButton}>
                            {editingId ? 'Update Internship' : 'Add Internship'}
                        </button>
                        {editingId && (
                            <button onClick={resetForm} className={II.cancelButton}>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className={II.internshipsSection}>
                <h2 className={II.sectionTitle}>Your Internships</h2>

                {internships.length === 0 ? (
                    <div className={II.emptyState}>
                        <p>No internships added yet. Add your first internship above!</p>
                    </div>
                ) : (
                    <div className={II.internshipGrid}>
                        {internships.map(internship => (
                            <div key={internship.Internship_ID} className={II.internshipCard}>
                                <div className={II.cardHeader}>
                                    <h3 className={II.cardTitle}>{internship.companyName}</h3>
                                    <span className={II.internshipType}>{internship.type}</span>
                                </div>

                                <div className={II.cardDates}>
                                    {formatDateDisplay(internship.startDate)} - {formatDateDisplay(internship.endDate)}
                                </div>

                                {internship.description.length > 0 && (
                                    <div className={II.cardSection}>
                                        <h4 className={II.cardSectionTitle}>Descriptions</h4>
                                        <div className={II.cardBadges}>
                                            {internship.description.map((desc, index) => (
                                                <span key={index} className={II.cardBadge}>{desc}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {internship.technologies.length > 0 && (
                                    <div className={II.cardSection}>
                                        <h4 className={II.cardSectionTitle}>Technologies</h4>
                                        <div className={II.cardBadges}>
                                            {internship.technologies.map((tech, index) => (
                                                <span key={index} className={II.cardBadge}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className={II.cardActions}>
                                    <button onClick={() => handleEdit(internship)} className={II.updateButton}>
                                        Update
                                    </button>
                                    <button onClick={() => handleDelete(internship.Internship_ID)} className={II.deleteButton}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InternshipSection;