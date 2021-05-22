import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  margin: 1rem;
  margin-top: 4rem;
  font-size: 2rem;
  color: white;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    text-decoration: none;
  }
`;

const StyledLink = styled.a`
  cursor: pointer;
  display: inline-block;
  margin: 1rem;
  font-size: 2rem;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

export { StyledLink, LoginLink };
