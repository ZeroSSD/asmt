import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EntityCRUD = ({ entity }) => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await axios.get(`http://localhost:3000/api/${entity}`);
        setItems(result.data);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:3000/api/${entity}`, formData);
        fetchData();
        setFormData({});
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3000/api/${entity}/${id}`);
        fetchData();
    };

    return (
        <div>
            <h2>{entity}</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key, index) => (
                    <div key={index}>
                        <label>{key}:</label>
                        <input name={key} value={formData[key]} onChange={handleChange} />
                    </div>
                ))}
                <button type="submit">Add/Update</button>
            </form>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {Object.entries(item).map(([key, value]) => (
                            <span key={key}>{key}: {value} </span>
                        ))}
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EntityCRUD;
