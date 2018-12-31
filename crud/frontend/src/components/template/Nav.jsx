import './Nav.css'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
        {}
            <a href="#/home">
                <i className='fa fa-home'>Início</i>
            </a>
            <a href="#/users">
                <i className={`fa fa-${props.icon}`}></i> {props.title} {/*Estou chamando o ícone e título do App.jsx de Nav*/}
            </a>
        </nav>
    </aside>