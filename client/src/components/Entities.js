import React, { useState } from 'react';
import axios from 'axios';

const EntityForm = () => {
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([{ name: '', type: '' }]);

    const handleAttributeChange = (index, event) => {
        const values = [...attributes];
        values[index][event.target.name] = event.target.value;
        setAttributes(values);
    };

    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: '', type: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:3000/api/entity', { name, attributes });
        setName('');
        setAttributes([{ name: '', type: '' }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Entity Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {attributes.map((attribute, index) => (
                <div key={index}>
                    <label>Attribute Name:</label>
                    <input name="name" value={attribute.name} onChange={(e) => handleAttributeChange(index, e)} />
                    <label>Type:</label>
                    <select name="type" value={attribute.type} onChange={(e) => handleAttributeChange(index, e)}>
                        <option value="STRING">String</option>
                        <option value="INTEGER">Integer</option>
                        <option value="DATE">Date</option>
                    </select>
                </div>
            ))}
            <button type="button" onClick={handleAddAttribute}>Add Attribute</button>
            <button type="submit">Create Entity</button>
        </form>
    );
};

export default EntityForm;
