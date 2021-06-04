import React from "react";
import { slide as Menu } from 'react-burger-menu'

function BurgerMenu(props) {
    return(
        <>
            <Menu>
                <p>Audio</p>
                {props.links.map(section =>
                    <a href={'#' + section.id}>{section.title}</a>
                )}
            </Menu>
        </>
    );
}

export default BurgerMenu;