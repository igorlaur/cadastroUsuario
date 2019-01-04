import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}


const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: ''},
    list: []

}


export default class UserCrud extends Component {

    state = {...initialState} // chamo state

    // Função chamada quando componente for ser exibido na tela 
    componentWillMount(){
        axios(baseUrl).then(resp => { // Consulta trará os 3 usuários do DB. // Axios faz get em baseUrl que tras todas URLS // Then trás resposta
            this.setState({list: resp.data }) // O que eu recebi como resposta da minha aquisição eu salvo dentro da lista
        })
    }

    // Limpo usuário
    clear() {
        this.setState({ user: initialState.user }) // Limpo o usuário
    }

    // Incluo ou altero usuário
    save() { // Vai servir para incluir novo usuário ou alterar usuário existente
        //Quando eu quero incluir, o usuário não tem ID. Quando eu quero alterar, o usuário tem ID
        const user = this.state.user // obtendo usuário
        const method = user.id ? 'put' : 'post' // Se uder.id for verdadeiro ele fará um put, caso contŕario faço post
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl // se for put eu tbm passarei a URL e ID do usuário, no caso do post nao preciso passar id
        axios[method](url, user) // chamo a função, passo os parâmetros(url,user) // Como é baseado em promise, vou chamar o THEN
            .then(resp => {
                const list = this.getUpdatedList(resp.data) // resp.data = pego usuário que foi obtido através do webservice. // Nesse caso estou fazendo um post ou put para a URL de usuários
                this.setState({ user: initialState.user, list }) // chamo para alterar ou incluir o user ele limpa o formulário
            })
        }

    // Adiciono usuário na primeira posição
    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id) // filter gera uma nova lista // filtro a lista de usuários = ou seja, estou removendo usuário da lista
        if(add) list.unshift(user) // Se usuário está setado => // unshift = Adiciono usuário na lista na primeira posição 
        return list
    }

    // Atualizar nome e email
    updateField(event){
        const user = {...this.state.user} // Clono o usuário e armazeno na constante
        user[event.target.name] = event.target.value // nome do input name e email // seto igual ao valor que está dentro do meu campo input
        this.setState({ user }) // Vai setar o estado
    }

    // JSX para renderizar formulário
    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6"> {/* Celular ocupaa 12 colunas e Dispositivo medio, grande ou extra grande ocupará 6 colunas */}
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..."
                                /> {/* Passando evento onChange */}
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end"> {/* d-flex = display flexível / justify = justificar botões para o final */}
                        <button className="btn btn-primary" onClick={e => this.save(e)}> {/* save e passo evento */}
                            Salvar
                        </button>
                        <button className="btn btnsecondary ml-2" onClick={e => this.clear(e)}> {/* ml-2 = margem */}
                            Cancelar
                        </button> 
                    </div>
                </div>
            </div>
        )
    }

    // Carrega usuário      -       quando clica na caneta
    load(user) {
        this.setState({ user })
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false) // false = nao vai adicionar elemento na lista e terá a lista menos aquele elemento
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4"> {/* mt = margem top */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table> 
        )
    }

    renderRows() {
        return this.state.list.map(user => { // mapeio lista de usuário que está dentro do estado do meu objeto que está dentro do meu jsx
            return ( // Mapeio meu usuário e passo neste trecho de código abaixo
                <tr key={user.id}> {/* Sempre que retorno array jsx tem que ter atributo key para nao gerar divertencia */}
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}> {/* Poderia passar letra "e" de event no lugar do () */}
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}> {/* ML = Margem Left */}
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    /* Antes do componente ser exibito ele executará está funcão */
    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()} {/* Renderiza o formulário */}
                {this.renderTable()}
            </Main>
        )
    }
}