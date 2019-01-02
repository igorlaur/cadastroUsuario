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

    state = {...initialState}

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
    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id) // filter gera uma nova lista // filtro a lista de usuários = ou seja, estou removendo usuário da lista
        list.unshift(user)// unshift = Adiciono usuário na lista na primeira posição 
        return list
    }

    /* Antes do componente ser exibito ele executará está funcão */
    render(){
        return(
            <Main {...headerProps}>
                Cadastro de Usuário
            </Main>
        )
    }
}