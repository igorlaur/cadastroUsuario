import React from 'react'
import { Switch, Route, Redirect } from 'react-router' // O Switch é a escolha // O Redirect é caso eu coloque uma URL que não tem haver com nenhum, ele vai me redirecionar para o início

import Home from '../components/home/Home'
import UserCrud from '../components/user/userCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />{/* Sempre que o usuário navegar para / ele irá renderizar o componente Home */}
        <Route path='/users' component={UserCrud} /> {/* Sempre que usuário navegar a partir de /users ele renderizará UserCrud */}
        <Redirect from='*' to="/" /> {/* Caso seja qualquer outra URL ele redirecionará para / que renderizará o Home */}
    </Switch>
