import React from 'react';
import styled from 'styled-components';

interface NavListProps{
    children?: React.ReactNode,
    visibility: boolean
}

const ListLinks = styled.ul`
    position: absolute;
    background-color: #03414d;
    color: white;
    border-radius: 10px;
    list-style: none;
    top: 100%;
    width: 100%;
    padding: 0;
    transform: translateY(-100px);
    opacity: 0;
    transition: .5s ease all;
    pointer-events: none;
    &:before{
        content: '';
        width: 0px;
        height: 0px;
        position: absolute;
        border: 15px solid;
        border-color: transparent transparent #03414d transparent;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
    }
    &.active{
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
    }
`

export default function NavList(props: React.PropsWithChildren<NavListProps>){

    return(
       <ListLinks className={props.visibility ? 'active' : ''}>
           {props.children}
       </ListLinks> 
    )
}