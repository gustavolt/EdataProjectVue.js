import Vue from 'vue'
import Router from 'vue-router'
import 'regenerator-runtime/runtime'

// Containers
const Layout = () => import('@/layout/TheContainer')

//404
const Error404 = () => import('@/layout/Page404')

// Login
const Login = () => import('@/components/pages/Authentication/Login')

const CreateClient = () => import('@/components/pages/CreateClient')
const Clients = () => import('@/components/pages/Clients')
const EditClient = () => import('@/components/pages/Client/_id')

Vue.use(Router)
 
const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes:  [{
    path: '/',
      redirect: '/clientes',
      name: 'Home',
      component: Layout,
      children: [ 
        {
          path: 'cadastro-cliente',
          name: 'registerClient',
          component: CreateClient
        },
        {
          path: 'clientes',
          name: 'Clients',
          component: Clients
        },
        {
          path: 'editar-cliente/:id',
          name: 'editClient',
          component: EditClient
        },
      ]
    },
    {
      path: '/autenticacao',
      redirect: '/autenticacao/login',
      name: 'Autenticacao',
      component: {
          render(c) { return c('router-view') }
      },
      children: [
          {
              path: 'login',
              name: 'Login',
              component: Login
          },
      ]
  },  
  {
    path: '/erro',
    redirect: '/erro/404',
    name: 'Erro',
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '404',
            name: 'Erro 404',
            component: Error404
        },
    ]
  },
  ]
})

export default router;