import { useState } from 'react';
import styled from 'styled-components';
import NavElement from '../atoms/navElement';
import NavList from './navbar';

const ProfilePhoto = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    position: relative;
    padding: 0;
    img{
        cursor: pointer;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        object-fit: cover;
    }
`

const Navigation = styled.nav`
    text-align: center;
    display: flex;
    flex-direction: column;
`

const NavElementLink = styled.a`
    color: white;
    text-decoration: none;
    font-size: 1rem;
`

export default function NavigationMol(){

    const [NavVisibility, setNavVisibility] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    const {images} = userInfo;

    const imgProfile:string = images[0].url || 'https://media.istockphoto.com/illustrations/woman-with-short-hair-in-headphones-illustration-id465785399?k=6&m=465785399&s=612x612&w=0&h=R65nc5vFJLgClId1WJW8Ox6cwZbgcTjSZdbupH7LtUI=';

    return(
        <Navigation>
            <ProfilePhoto onClick={() => setNavVisibility(!NavVisibility)}>
                <NavList visibility={NavVisibility}>
                    <NavElement>
                        <NavElementLink href="#">
                            {userInfo.display_name}
                        </NavElementLink>
                    </NavElement>
                    <NavElement>
                        <NavElementLink href="#">
                            Favoritos
                        </NavElementLink>
                    </NavElement>
                    <NavElement>
                        <NavElementLink href="#">
                            Cerrar sesión
                        </NavElementLink>
                    </NavElement>
                </NavList>
                <img src={imgProfile} alt="User Profile" />
            </ProfilePhoto>
        </Navigation>
    )
}