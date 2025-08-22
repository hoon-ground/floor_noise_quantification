import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavBar = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  padding: 10px 12px;
  z-index: 50;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const Button = styled(NavLink)`
  flex: 1;
  width: 6.3125rem;
  padding: 0.375rem 0.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.25rem;
  background-color: #f6f6f6;
  color: #4c4c4c;
  &.active {
    color: #ffffff;
    background-color: rgba(116, 176, 255, 0.9);
  }
`;

const BottomNav = () => (
  <NavBar>
    <NavContainer>
      <Button to="/report">REPORT</Button>
      <Button to="/main">MAIN</Button>
      <Button to="/community">COMMUNITY</Button>
    </NavContainer>
  </NavBar>
);

export default BottomNav;
