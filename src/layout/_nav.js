export default [
  {
    
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavTitle',
        _children: ['Menu']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Clientes',
        to: '/cliente',
        icon: 'cil-user',
        badge: {
          color: 'primary',
          text: 'NOVO'
        }
      },
      
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Gráficos',
      //   to: '/graficos',
      //   icon: 'cil-speedometer',
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Widgets',
      //   to: '/widgets',
      //   icon: 'cil-speedometer',
      // }
    ]
  }
]