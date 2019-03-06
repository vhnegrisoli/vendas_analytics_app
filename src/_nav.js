export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'cui-dashboard',
      badge: {
        variant: 'info',
      },
    },
    {
      title: true,
      name: 'Vendas',
      wrapper: {
        // optional wrapper object
        element: '', // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '', // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Tratar Venda',
      url: '/theme/colors',
      icon: 'cui-cart',
    },
    {
      name: 'Histórico de Vendas',
      url: '/theme/colors',
      icon: 'icon-list',
    },
    {
      name: 'Exportar Relatórios',
      url: '/theme/colors',
      icon: 'icon-cloud-download',
    },
    {
      name: 'Analytics',
      url: '/charts',
      icon: 'icon-pie-chart',
    },
    {
      title: true,
      name: 'Gestão do Sistema',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Clientes',
      url: '/base',
      icon: 'icon-people',
      children: [
        {
          name: 'Cadastrar',
          url: '/base/forms',
          icon: 'icon-user-follow',
        },
        {
          name: 'Listar',
          url: '/users/users',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Produtos',
      url: '/base',
      icon: 'icon-basket-loaded',
      children: [
        {
          name: 'Cadastrar',
          url: '/base/forms',
          icon: 'icon-check',
        },
        {
          name: 'Listar',
          url: '/base/list-groups',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Fornecedores',
      url: '/base',
      icon: 'icon-briefcase',
      children: [
        {
          name: 'Cadastrar',
          url: '/base/forms',
          icon: 'icon-user',
        },
        {
          name: 'Listar',
          url: '/base/list-groups',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Categorias',
      url: '/base',
      icon: 'cui-tags',
      children: [
        {
          name: 'Cadastrar',
          url: '/base/forms',
          icon: 'cui-task',
        },
        {
          name: 'Listar',
          url: '/base/list-groups',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Usuários',
      url: '/base',
      icon: 'icon-people',
      children: [
        {
          name: 'Novo usuário',
          url: '/base/forms',
          icon: 'icon-user-follow',
        },
        {
          name: 'Listar',
          url: '/base/list-groups',
          icon: 'icon-list',
        },
      ],
    },
    /*
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          url: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    */
   
    /*{
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      attributes: { disabled: true },
    },
    {
      name: 'Download CoreUI',
      url: 'https://coreui.io/react/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: 'noopener' },
    },
    {
      name: 'Try CoreUI PRO',
      url: 'https://coreui.io/pro/react/',
      icon: 'icon-layers',
      variant: 'danger',
      attributes: { target: '_blank', rel: 'noopener' },
    },
    */
    {
      name: 'Sair',
      url: '/pages',
      icon: 'icon-logout',
    },
  ],
};
