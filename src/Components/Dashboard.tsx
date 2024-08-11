import React, { useState } from 'react';
import APIKeySetCard from './APIKeySetCard';
import APIKeySetForm from './APIKeySetForm';
import styled from 'styled-components';
import APIKeySet from '../apiKeySet';


const Dashboard: React.FC = () => {
  const [apiKeySets, setApiKeySets] = useState<APIKeySet[]>([]);
  const [editingKeySet, setEditingKeySet] = useState<APIKeySet | null>(null);

  const handleAddNewKeySet = () => {
    setEditingKeySet({ id: '', provider: '', model: '', apiKey: '', isDefault: false });
  };

  const handleSaveKeySet = (keySet: APIKeySet) => {
    if (keySet.id) {
      // Update existing key set
      setApiKeySets(prevKeySets =>
        prevKeySets.map(k => (k.id === keySet.id ? keySet : k))
      );
    } else {
      // Add a new key set with a unique ID
      setApiKeySets(prevKeySets => [
        ...prevKeySets,
        { ...keySet, id: `${Date.now()}` },
      ]);
    }
    setEditingKeySet(null); // Close the form after saving
  };

  const handleDeleteKeySet = (id: string) => {
    setApiKeySets(prevKeySets => prevKeySets.filter(k => k.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setApiKeySets(prevKeySets =>
      prevKeySets.map(k => ({
        ...k,
        isDefault: k.id === id,
      }))
    );
  };

  const handleEdit = (id: string) => {
    const keySetToEdit = apiKeySets.find(k => k.id === id);
    if (keySetToEdit) {
      setEditingKeySet(keySetToEdit);
    }
  };

  return (
    <div>
      <ButtonContainer>
        <button onClick={handleAddNewKeySet}>Add New Key</button>
      </ButtonContainer>
      
        {editingKeySet && (
          <APIKeySetForm  keySet={editingKeySet} onSave={handleSaveKeySet} />
      )}
        <DisplayMessage>
        {apiKeySets.length === 0 && (
          <div>No API Key Sets available. Click "Add New Key" to create one.</div>
        )}
        </DisplayMessage>
      <DashboardContainer>
        {apiKeySets.length > 0 && (
          <>
            {apiKeySets.map((keySet, index) => (
              <APIKeySetCard
                key={keySet.id}
                keySet={keySet}
                index={index}
                onEdit={() => handleEdit(keySet.id)}
                onDelete={() => handleDeleteKeySet(keySet.id)}
                onSetDefault={() => handleSetDefault(keySet.id)}
              />
            ))}
          </>
        )}
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  padding: 24px;
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: 1rem;
  height:100vh;
  margin:16px;

  @media only screen and (max-width:760px){
  display:flex;
 flex-direction:column;
  }
 
`;

const ButtonContainer = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  text-align: center;

  button{
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
  }
`;

const DisplayMessage = styled.div`

font-family: "Noto Sans JP", sans-serif;
margin-top:20px;
font-size:14px;
`


