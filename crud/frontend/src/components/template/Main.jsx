import './Main.css'
import React from 'react'
import Header from './Header'

export default props =>
    <React.Fragment> {/*Como não é possível importar dois componentes JSX em uma div, então utilizamos React.Fragment*/}
        <Header {...props} /> {/* props = As propriedades que eu recebi no Main.jsx estão sendo propagadas no Header. Recebendo Ícone, título e subtítulo */} 
            <main className="content container-fluid"> {/* Container-fluid adicionado porque vou usar padrão de 12 colunas etc*/}
                <div className="p-3 mt-3"> {/* Paddin: 3 && Margem-top: 3 */}
                    {props.children} {/* Componentes filho */}
                </div>
            </main>
    </React.Fragment>
