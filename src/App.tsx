import React from 'react';
import Dashboard from './Components/Dashboard';
import styled from 'styled-components';

const App: React.FC = () => {
  return (
    <Container>
      <Title>API Key Sets</Title>
      <DashboardContainer>
      <Dashboard />
      </DashboardContainer>
    </Container>
  );
};

export default App;

const Container = styled.div`
  background-color: #CCE5FF;
  display: grid;
  max-height-100vh;
  overflow:auto;
  align-items: center;
  position: relative;
  z-index: 1;
`;


const DashboardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;


