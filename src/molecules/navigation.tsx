import { useState } from 'react';
import NavElement from '../atoms/navElement';
import NavList from './navbar';
import { signOutSession } from '../services/services';
import { Navigation, ProfilePhoto, NavElementLink } from '../assets/styles';

export default function NavigationMol(){

    const [NavVisibility, setNavVisibility] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    const {images} = userInfo;

    const imgProfile:string = images[0] ? images[0].url : 'https://media.istockphoto.com/illustrations/woman-with-short-hair-in-headphones-illustration-id465785399?k=6&m=465785399&s=612x612&w=0&h=R65nc5vFJLgClId1WJW8Ox6cwZbgcTjSZdbupH7LtUI=';

    return(
        <Navigation>
            <ProfilePhoto onClick={() => setNavVisibility(!NavVisibility)}>
                <NavList visibility={NavVisibility}>
                    <NavElement>
                        <NavElementLink href="/">
                            {userInfo.display_name}
                        </NavElementLink>
                    </NavElement>
                    <NavElement>
                        <NavElementLink href="/favorites">
                            Favoritos
                        </NavElementLink>
                    </NavElement>
                    <NavElement>
                        <NavElementLink href="#" onClick={signOutSession}>
                            Cerrar sesión
                        </NavElementLink>
                    </NavElement>
                </NavList>
                <img src={imgProfile} alt="User Profile" />
            </ProfilePhoto>
        </Navigation>
    )
}