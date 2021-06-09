import React, { useState } from "react";
import { slide as Menu } from 'react-burger-menu'
import burgerMenuIcon from '../../resources/imgs/burgerMenu.svg'

function BurgerMenu(props) {
    return(
        <>
            <Menu customBurgerIcon={ <img src={burgerMenuIcon} /> } width={"27%"} >
                <p id="menuAudio">Audio</p>
                {props.audioLinks.exercises.map(link => (
                    <a className="audioExercises" href={'#' + link.id}>{link.title}</a>
                ))}

                <p id="menuVideo">Video</p>
                {props.videoLinks.exercises.map(link => (
                    <a className="videoExercises" href={'#' + link.id}>{link.title}</a>
                ))}
            </Menu>
        </>
    );
}

export default BurgerMenu;