import './Header.css'
import React from 'react'

export default props =>
    <header className="header d-none d-sm-flex flex-column"> {/* d-nome = para celulares o header não aparecerá. d-sm-flex para dispositivos small para cima ele vai usar display flex */}
        <h1 className="mt-3"> {/* Margem top 3 */}
            <i className={`fa fa-${props.icon}`}></i> {props.title} {/* fa fa = classe do font-awesome para aparecer a casinha */}
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>
