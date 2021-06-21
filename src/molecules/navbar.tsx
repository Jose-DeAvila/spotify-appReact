import React from 'react';
import {ListLinks} from 'assets/styles';
import { NavListProps } from 'assets/interfaces';

export default function NavList(props: React.PropsWithChildren<NavListProps>){
    return(
       <ListLinks className={props.visibility ? 'active' : ''}>
           {props.children}
       </ListLinks> 
    )
}