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
      url: '/tratar-venda',
      icon: 'cui-cart',
    },
    {
      name: 'Aprovar Venda',
      url: '/aprovar-venda',
      icon: 'icon-check',
    },
    {
      name: 'Histórico de Vendas',
      url: 'historicovenda/historicovenda',
      icon: 'icon-list',
    },
    {
      name: 'Exportar Relatórios',
      url: '/exportar',
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
      url: '/clientes',
      icon: 'icon-people',
      children: [
        {
          name: 'Cadastrar',
          url: '/cliente/cadastrar',
          icon: 'icon-user-follow',
        },
        {
          name: 'Listar',
          url: '/cliente/listar',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Produtos',
      url: '/produtos',
      icon: 'icon-basket-loaded',
      children: [
        {
          name: 'Cadastrar',
          url: '/produtos/cadastrar',
          icon: 'icon-check',
        },
        {
          name: 'Listar',
          url: '/produtos/listar',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Fornecedores',
      url: '/fornecedores',
      icon: 'icon-briefcase',
      children: [
        {
          name: 'Cadastrar',
          url: '/fornecedores/cadastrar',
          icon: 'icon-user',
        },
        {
          name: 'Listar',
          url: '/fornecedores/listar',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Categorias',
      url: '/categorias',
      icon: 'cui-tags',
      children: [
        {
          name: 'Cadastrar',
          url: '/categorias/cadastrar',
          icon: 'cui-task',
        },
        {
          name: 'Listar',
          url: '/categorias/listar',
          icon: 'icon-list',
        },
      ],
    },
    {
      name: 'Usuários',
      url: '/users',
      icon: 'icon-people',
      children: [
        {
          name: 'Cadastrar',
          url: '/usuarios/cadastrar',
          icon: 'icon-user-follow',
        },
        {
          name: 'Listar',
          url: '/usuarios/listar',
          icon: 'icon-list',
        },
      ],
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
      name: 'Sair',
      url: '/pages',
      icon: 'icon-logout',
    },
  ],
};
