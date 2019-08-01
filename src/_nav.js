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
      url: 'historico-venda',
      icon: 'icon-list',
    },
    {
      name: 'Exportar Relatórios',
      url: '/exportar',
      icon: 'icon-cloud-download',
    },
    {
      name: 'Analytics & BI',
      url: '/analytics',
      icon: 'fa fa-bar-chart',
      children: [
        {
          name: 'Relatórios',
          url: '/charts',
          icon: 'icon-pie-chart',
        },
        {
          name: 'Personalizados',
          url: '/relatorios-personalizados',
          icon: 'fa fa-line-chart',
        },
        {
          name: 'Microsoft Power BI',
          url: '/relatorios-power-bi',
          icon: 'fa fa-pie-chart',
        },
      ],
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
      name: 'Vendedores',
      url: '/vendedores',
      icon: 'icon-people',
      children: [
        {
          name: 'Cadastrar',
          url: '/vendedores/cadastrar',
          icon: 'icon-user-follow',
        },
        {
          name: 'Listar',
          url: '/vendedores/listar',
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
      name: 'Sair',
      url: '/login',
      icon: 'icon-logout',
    },
  ],
};
