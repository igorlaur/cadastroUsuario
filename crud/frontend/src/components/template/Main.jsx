import './Main.css'
import React from 'react'
import Header from './Header'

export default props =>
    <React.Fragment> {/*Como não é possível importar dois componentes JSX em uma div, então utilizamos React.Fragment*/}
        <Header /> 
            <main className="content">
                Conteúdo
            </main>
    </React.Fragment>