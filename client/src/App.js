import React, { useState } from 'react';
import EntityForm from './components/Entities';
import EntityCRUD from './components/EntityCRUD';

function App() {
    const [entity, setEntity] = useState('');

    return (
        <div>
            <h1>Rudimentary Headless CMS</h1>
            <EntityForm />
            <div>
                <label>Entity Name for CRUD:</label>
                <input value={entity} onChange={(e) => setEntity(e.target.value)} />
                {entity && <EntityCRUD entity={entity} />}
            </div>
        </div>
    );
}

export default App;
