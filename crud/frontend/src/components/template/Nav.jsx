import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
        {}
            <Link to="/home"> {/* Substitui <a para Link*/}
                <i className='fa fa-home'> Início</i>
            </Link>
            <Link to="/users">
                <i className={`fa fa-${props.icon}`}></i> {props.title} {/*Estou chamando o ícone e título do App.jsx de Nav*/}
            </Link>
        </nav>
    </aside>