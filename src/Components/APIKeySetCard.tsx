import React, { useState } from 'react';
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';
import APIKeySet from '../apiKeySet';

interface APIKeySetCardProps {
  keySet: APIKeySet;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

const APIKeySetCard: React.FC<APIKeySetCardProps> = ({
  keySet, index, onEdit, onDelete, onSetDefault
}) => {
  const [showApiKey, setShowApiKey] = useState<boolean>(false);

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <CardContainer>
      <CardBody>
        <CardActions style={{ marginTop: '-10px', textAlign: 'center' }}>
          <h3>API Key Set {index + 1}</h3>
          <div>
            <EditButton onClick={onEdit}>Edit<i className="fa fa-pencil" style={{ paddingLeft: "4px" }}></i></EditButton>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          </div>
        </CardActions>
        <div>
          <CardContent>

          <sub>Provider</sub><p>{keySet.provider}</p>
          <sub>Default Model Versions </sub><p>{keySet.model}</p>
          <sub>API Key</sub>
          </CardContent>
        <PasswordContainer>
          <input
            type={showApiKey ? 'text' : 'password'}
            value={keySet.apiKey}
            readOnly
            />
          <ToggleIcon onClick={toggleShowApiKey}>
            {showApiKey ? '🙈' : '👁️'}
          </ToggleIcon>
        </PasswordContainer>
            </div>
      </CardBody>
          <DefaultButton onClick={onSetDefault} disabled={keySet.isDefault}>
            {keySet.isDefault ? 'Default' : 'Set as Default'}
          </DefaultButton>
    </CardContainer>
  );
};

export default APIKeySetCard;

const CardContainer = styled.div`
  background: #f9f9f9;
  display:flex;
  height: 250px;
  width:90%;
  flex-direction: column; 
  border-radius: 14px;
  padding: 16px;
  margin: 10px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;
  const CardBody = styled.div`
  height:100%;
  width:100%;
  margin-top:5px;
  justify-content: space-around;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
`;

const CardActions = styled.div`
  display: flex;
  margin-top:10px;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;

  h3 {
    margin: 0px;
    padding:0px;
    font-size:20px;
    }
    
    div {
      display: flex;
      gap: 10px;
  }
`;

const CardContent = styled.div`

p{
margin:5px 0px;
}
`;
const EditButton = styled.button`
  padding: 6px 18px;
  background-color: #FFFFFF;
  color: green;
  border-color: Green;
  border-radius: 20px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 6px 18px;
  background-color: red;
  color: white;
  border-color:white;
  border-radius: 20px;
  cursor: pointer;
  border:none;
  &:hover{
  background-color: #d13539;
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-top:4px;
    margin-left: 0px;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
`;

const ToggleIcon = styled.span`
  margin-left: -30px;
  cursor: pointer;
  font-size: 1.2rem;
  user-select: none;
`;


const DefaultButton = styled.button`
  align-self:end;
  padding: 6px 12px;
  background-color: ${props => (props.disabled ? '#6c757d' : '#28a745')};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;


