import { useState, useEffect } from 'react';
import axios from 'axios';
import CC from '../../CSS/Certificate.module.css';
import Navbar from './Navbar';

const Certificate = () => {
    const [certificates, setCertificates] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        company: ''
    });
    const [editingId, setEditingId] = useState(null);

    const Registration_ID = localStorage.getItem('EditableReg');

    const fetchCertificates = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/certificate`,
                { Registration_ID, flag: 1 }
            );

            // Store dates as plain strings for display
            const formattedData = (res.data.cert || []).map(cert => ({
                ...cert,
                startDate: cert.startDate ? cert.startDate.split('T')[0] : '',
                endDate: cert.endDate ? cert.endDate.split('T')[0] : ''
            }));

            setCertificates(formattedData);
        } catch (error) {
            console.error("Error fetching certificates:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const missingFields = [];
        if (!formData.name) missingFields.push("Name");
        if (!formData.startDate) missingFields.push("Start Date");
        if (!formData.company) missingFields.push("Company");

        if (missingFields.length > 0) {
            alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
            return;
        }

        // Convert to Date objects for backend
        const startDateObj = new Date(formData.startDate);
        const endDateObj = formData.endDate ? new Date(formData.endDate) : null;

        const payload = {
            Registration_ID,
            name: formData.name,
            startDate: startDateObj,
            endDate: endDateObj,
            company: formData.company,
            flag: editingId ? 2 : 4,
            Certificate_ID: editingId
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/certificate`, payload);
            await fetchCertificates();
        } catch (error) {
            console.error("Error saving certificate:", error);
        }

        setFormData({ name: "", startDate: "", endDate: "", company: "" });
        setEditingId(null);
    };

    const handleUpdate = (certificate) => {
        setFormData({
            name: certificate.name,
            startDate: certificate.startDate ? certificate.startDate.split('T')[0] : '',
            endDate: certificate.endDate ? certificate.endDate.split('T')[0] : '',
            company: certificate.company
        });
        setEditingId(certificate.Certificate_ID);
    };

    const handleDelete = async (Certificate_ID) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/certificate`, {
                Certificate_ID,
                flag: 3
            });
            await fetchCertificates();
        } catch (error) {
            console.error("Error deleting certificate:", error);
        }

        if (editingId === Certificate_ID) {
            setFormData({ name: '', startDate: '', endDate: '', company: '' });
            setEditingId(null);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    return (
        <><Navbar />
            <div className={CC.container}>
                <div className={CC.formSection}>
                    <h2 className={CC.sectionTitle}>
                        {editingId ? 'Update Certificate' : 'Add Certificate'}
                    </h2>

                    <form onSubmit={handleSubmit} className={CC.form}>
                        <div className={CC.formGroup}>
                            <label htmlFor="name" className={CC.label}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={CC.input}
                                placeholder="Certificate name"
                            />
                        </div>

                        <div className={CC.formRow}>
                            <div className={CC.formGroup}>
                                <label htmlFor="startDate" className={CC.label}>Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className={CC.input}
                                />
                            </div>

                            <div className={CC.formGroup}>
                                <label htmlFor="endDate" className={CC.label}>End Date</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    className={CC.input}
                                />
                            </div>
                        </div>

                        <div className={CC.formGroup}>
                            <label htmlFor="company" className={CC.label}>Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className={CC.input}
                                placeholder="Issuing company/organization"
                            />
                        </div>

                        <button type="submit" className={CC.submitButton}>
                            {editingId ? 'Update Certificate' : 'Add Certificate'}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({ name: '', startDate: '', endDate: '', company: '' });
                                    setEditingId(null);
                                }}
                                className={CC.cancelButton}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>

                <div className={CC.certificatesSection}>
                    <h2 className={CC.sectionTitle}>My Certificates</h2>

                    {certificates.length === 0 ? (
                        <p className={CC.emptyMessage}>No certificates added yet.</p>
                    ) : (
                        <div className={CC.certificatesGrid}>
                            {certificates.map(certificate => (
                                <div key={certificate.Certificate_ID} className={CC.certificateCard}>
                                    <div className={CC.certificateInfo}>
                                        <h3 className={CC.certificateName}>{certificate.name}</h3>
                                        <p className={CC.certificateCompany}>{certificate.company}</p>
                                        <p className={CC.certificateDate}>
                                            {certificate.startDate} - {certificate.endDate}
                                        </p>
                                    </div>

                                    <div className={CC.certificateActions}>
                                        <button
                                            onClick={() => handleUpdate(certificate)}
                                            className={CC.updateButton}
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(certificate.Certificate_ID)}
                                            className={CC.deleteButton}
                                        >
                                            Delete
                                        </button>
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

export default Certificate;
