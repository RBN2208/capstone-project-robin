import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

export default function SlideMenu({ isSlideMenuOpen, setIsSlideMenuOpen }) {
  return (
    <MenuBox position={isSlideMenuOpen}>
      <Nav>
        <Link to="/" onClick={() => setIsSlideMenuOpen(false)}>
          Home
        </Link>
        <Link to="/history" onClick={() => setIsSlideMenuOpen(false)}>
          History
        </Link>
      </Nav>
    </MenuBox>
  )
}

const MenuBox = styled.div`
  position: fixed;
  left: ${props => (props.position ? '0' : '-100vw')};
  background-color: gainsboro;
  width: 150px;
  height: 100vh;
  padding: 50px 20px;
  z-index: 1;
  transition: all 0.4s;
`
const Nav = styled.nav`
  display: grid;
  gap: 30px;
`
