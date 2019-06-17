export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'cui-dashboard',
      badge: {
        variant: 'info',
      },
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
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
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    },
    {
      name: 'Aprovar Venda',
      url: '/aprovar-venda',
      icon: 'icon-check',
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    },
    {
      name: 'Histórico de Vendas',
      url: 'historicovenda/historicovenda',
      icon: 'icon-list',
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    },
    {
      name: 'Exportar Relatórios',
      url: '/exportar',
      icon: 'icon-cloud-download',
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    },
    {
      name: 'Analytics & BI',
      url: '/analytics',
      icon: 'fa fa-bar-chart',
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
      children: [
        {
          name: 'Relatórios',
          url: '/charts',
          icon: 'icon-pie-chart',
          permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
        },
        {
          name: 'Personalizados',
          url: '/relatorios-personalizados',
          icon: 'fa fa-line-chart',
          permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
        },
        {
          name: 'Microsoft Power BI',
          url: '/relatorios-power-bi',
          icon: 'fa fa-pie-chart',
          permissao: ['SUPER_ADMIN', 'ADMIN'],
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
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
      children: [
        {
          name: 'Cadastrar',
          url: '/vendedores/cadastrar',
          icon: 'icon-user-follow',
          permissao: ['SUPER_ADMIN', 'ADMIN'],
        },
        {
          name: 'Listar',
          url: '/vendedores/listar',
          icon: 'icon-list',
          permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
        },
      ],
    },
    {
      name: 'Produtos',
      url: '/produtos',
      icon: 'icon-basket-loaded',
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
      children: [
        {
          name: 'Cadastrar',
          url: '/produtos/cadastrar',
          icon: 'icon-check',
          permissao: ['SUPER_ADMIN', 'ADMIN'],
        },
        {
          name: 'Listar',
          url: '/produtos/listar',
          icon: 'icon-list',
          permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
        },
      ],
    },
    {
      name: 'Fornecedores',
      url: '/fornecedores',
      icon: 'icon-briefcase',
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
      children: [
        {
          name: 'Cadastrar',
          url: '/fornecedores/cadastrar',
          icon: 'icon-user',
          permissao: ['SUPER_ADMIN', 'ADMIN'],
        },
        {
          name: 'Listar',
          url: '/fornecedores/listar',
          icon: 'icon-list',
          permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
        },
      ],
    },
    {
      name: 'Categorias',
      url: '/categorias',
      icon: 'cui-tags',
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
      children: [
        {
          name: 'Cadastrar',
          url: '/categorias/cadastrar',
          icon: 'cui-task',
          permissao: ['SUPER_ADMIN', 'ADMIN'],
        },
        {
          name: 'Listar',
          url: '/categorias/listar',
          icon: 'icon-list',
          permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
        },
      ],
    },
    {
      name: 'Usuários',
      url: '/users',
      icon: 'icon-people',
      permissao: ['SUPER_ADMIN', 'ADMIN'],
      children: [
        {
          name: 'Cadastrar',
          url: '/usuarios/cadastrar',
          icon: 'icon-user-follow',
          permissao: ['SUPER_ADMIN', 'ADMIN'],
        },
        {
          name: 'Listar',
          url: '/usuarios/listar',
          icon: 'icon-list',
          permissao: ['SUPER_ADMIN', 'ADMIN'],
        },
      ],
    },
    {
      name: 'Sair',
      url: '/login',
      icon: 'icon-logout',
      permissao: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    },
  ],
};
