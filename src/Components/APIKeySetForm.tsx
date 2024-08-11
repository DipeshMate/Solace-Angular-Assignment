import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface APIKeySet {
  id: string;
  provider: string;
  model: string;
  apiKey: string;
  isDefault: boolean;
}

interface APIKeySetFormProps {
  keySet: APIKeySet;
  onSave: (keySet: APIKeySet) => void;
}

const APIKeySetForm: React.FC<APIKeySetFormProps> = ({ keySet, onSave }) => {
    const [formData, setFormData] = useState<APIKeySet>(keySet);
    const [showApiKey, setShowApiKey] = useState<boolean>(false);


  useEffect(() => {
    setFormData(keySet);
  }, [keySet]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    // Call the onSave function passed in as a prop
    onSave(formData);
    };
    const toggleShowApiKey = () => {
        setShowApiKey(!showApiKey);
      };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <label>Provider</label>
        <input
          type="text"
          name="provider"
          value={formData.provider}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Model</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>API Key</label>
        <PasswordContainer>
          <input
            type={showApiKey ? "password" : "text"}
            name="apiKey"
            value={formData.apiKey}
            onChange={handleInputChange}
            required
          />
          <ToggleIcon onClick={toggleShowApiKey}>
            {showApiKey ? '🙈' : '👁️'}
          </ToggleIcon>
        </PasswordContainer>
      </div>
      <button type="submit">Save</button>
    </FormContainer>
  );
};

export default APIKeySetForm;

const FormContainer = styled.form`
  
  background: #fff;
  border-radius: 18px;
  padding: 20px;
  margin:auto;
  display:grid;
  height:220px;
  width:250px;

  div {
    margin-bottom: 8px;
  }

  label {
    font-weight: bold;
    margin-right: 8px;
  }

  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
  }

  button {
    align-self: flex-end;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

    @media only screen and (max-width:760px){
     width:50%;
    }
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ToggleIcon = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  user-select: none;
`;
