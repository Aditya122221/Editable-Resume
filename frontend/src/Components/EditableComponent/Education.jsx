import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../CSS/Education.module.css';
import Navbar from './Navbar';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/education`;

const EducationSection = () => {
    const [formData, setFormData] = useState({
        institute: '',
        startDate: '',
        endDate: '',
        field: '',
        marksType: 'percentage',
        marks: '',
        address: ''
    });

    const [educationList, setEducationList] = useState([]);
    const [editingEducationId, setEditingEducationId] = useState(null);

    const apiCall = async (payload) => {
        try {
            const { data } = await axios.post(API_URL, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            return data;
        } catch (err) {
            console.error("API Error:", err);
            alert("Something went wrong with the request.");
            return null;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMarksTypeChange = (e) => {
        setFormData(prev => ({
            ...prev,
            marksType: e.target.value,
            marks: ''
        }));
    };

    const handleSubmit = async () => {
        const missingFields = [];

        if (!formData.institute) missingFields.push("Institute Name");
        if (!formData.startDate) missingFields.push("Start Date");
        if (!formData.field) missingFields.push("Field of Study");
        if (!formData.address) missingFields.push("Address");

        if (missingFields.length > 0) {
            alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
            return;
        }

        const formattedMarks =
            formData.marksType === 'percentage'
                ? `Percentage: ${formData.marks}%`
                : `CGPA: ${formData.marks}`;

        // Convert to Date objects for backend
        const startDateObj = new Date(formData.startDate);
        const endDateObj = formData.endDate ? new Date(formData.endDate) : null;

        if (editingEducationId) {
            // Update
            const data = await apiCall({
                Education_ID: editingEducationId,
                institute: formData.institute,
                startDate: startDateObj,
                endDate: endDateObj,
                field: formData.field,
                marks: formattedMarks,
                address: formData.address,
                flag: 2
            });
            if (data?.status) {
                alert(data.message);
                await fetchEducationList();
            }
        } else {
            // Add
            const data = await apiCall({
                Registration_ID: localStorage.getItem("EditableReg"),
                institute: formData.institute,
                startDate: startDateObj,
                endDate: endDateObj,
                field: formData.field,
                marks: formattedMarks,
                address: formData.address,
                flag: 4
            });
            if (data?.status) {
                alert(data.message);
                await fetchEducationList();
            }
        }

        setFormData({
            institute: '',
            startDate: '',
            endDate: '',
            field: '',
            marksType: 'percentage',
            marks: '',
            address: ''
        });
        setEditingEducationId(null);
    };

    const handleUpdate = (education) => {
        const marksValue = education.marks.includes("Percentage")
            ? education.marks.replace("Percentage: ", "").replace("%", "")
            : education.marks.replace("CGPA: ", "");

        setFormData({
            institute: education.institute,
            startDate: education.startDate ? education.startDate.split('T')[0] : '',
            endDate: education.endDate ? education.endDate.split('T')[0] : '',
            field: education.field,
            marksType: education.marks.includes("Percentage") ? 'percentage' : 'cgpa',
            marks: marksValue,
            address: education.address
        });
        setEditingEducationId(education.Education_ID);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this education entry?')) {
            const data = await apiCall({ Education_ID: id, flag: 3 });
            alert(data.message);
            await fetchEducationList();
        }
    };

    const fetchEducationList = async () => {
        const data = await apiCall({ Registration_ID: localStorage.getItem("EditableReg"), flag: 1 });
        if (data?.education) {
            const formattedData = data.education.map(edu => ({
                ...edu,
                startDate: edu.startDate ? edu.startDate.split('T')[0] : '',
                endDate: edu.endDate ? edu.endDate.split('T')[0] : ''
            }));
            setEducationList(formattedData);
        }
    };

    useEffect(() => {
        fetchEducationList();
    }, []);

    return (
        <><Navbar />
            <div className={styles.container}>
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Education Information</h2>
                    <div className={styles.form}>
                        <div className={styles.formGrid}>
                            {/* Institute */}
                            <div className={styles.formGroup}>
                                <label htmlFor="institute" className={styles.label}>Institute</label>
                                <input
                                    type="text"
                                    id="institute"
                                    name="institute"
                                    value={formData.institute}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="Enter institute name"
                                />
                            </div>

                            {/* Start Date */}
                            <div className={styles.formGroup}>
                                <label htmlFor="startDate" className={styles.label}>Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            </div>

                            {/* End Date */}
                            <div className={styles.formGroup}>
                                <label htmlFor="endDate" className={styles.label}>End Date</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            </div>

                            {/* Field */}
                            <div className={styles.formGroup}>
                                <label htmlFor="field" className={styles.label}>Field of Study</label>
                                <input
                                    type="text"
                                    id="field"
                                    name="field"
                                    value={formData.field}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="Enter field of study"
                                />
                            </div>

                            {/* Marks Type */}
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Marks Type</label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="marksType"
                                            value="percentage"
                                            checked={formData.marksType === 'percentage'}
                                            onChange={handleMarksTypeChange}
                                            className={styles.radio}
                                        />
                                        Percentage
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="marksType"
                                            value="cgpa"
                                            checked={formData.marksType === 'cgpa'}
                                            onChange={handleMarksTypeChange}
                                            className={styles.radio}
                                        />
                                        CGPA
                                    </label>
                                </div>
                            </div>

                            {/* Marks */}
                            <div className={styles.formGroup}>
                                <label htmlFor="marks" className={styles.label}>
                                    {formData.marksType === 'percentage' ? 'Percentage (%)' : 'CGPA'}
                                </label>
                                <input
                                    type="number"
                                    id="marks"
                                    name="marks"
                                    value={formData.marks}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder={formData.marksType === 'percentage' ? 'Enter percentage' : 'Enter CGPA'}
                                    min="0"
                                    max={formData.marksType === 'percentage' ? '100' : '10'}
                                    step="0.01"
                                />
                            </div>

                            {/* Address */}
                            <div className={styles.formGroup}>
                                <label htmlFor="address" className={styles.label}>Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="Enter institute address"
                                />
                            </div>
                        </div>

                        <button onClick={handleSubmit} className={styles.submitBtn}>
                            {editingEducationId ? 'Update Education' : 'Add Education'}
                        </button>
                    </div>
                </div>

                <div className={styles.displaySection}>
                    <h3 className={styles.displayTitle}>Education Records</h3>
                    {educationList.length === 0 ? (
                        <p className={styles.emptyMessage}>No education records added yet.</p>
                    ) : (
                        <div className={styles.educationGrid}>
                            {educationList.map((education) => (
                                <div key={education.Education_ID || education.id} className={styles.educationCard}>
                                    <div className={styles.cardHeader}>
                                        <h4 className={styles.instituteName}>{education.institute}</h4>
                                        <div className={styles.cardActions}>
                                            <button
                                                onClick={() => handleUpdate(education)}
                                                className={styles.updateBtn}
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(education.Education_ID)}
                                                className={styles.deleteBtn}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <p className={styles.field}>{education.field}</p>
                                        <p className={styles.duration}>
                                            {education.startDate} - {education.endDate}
                                        </p>
                                        <p className={styles.marks}>{education.marks}</p>
                                        <p className={styles.address}>{education.address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EducationSection;
