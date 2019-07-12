import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const HistoricoVenda = React.lazy(() => import('./views/HistoricoVenda/HistoricoVenda'));
const VendedorForm = React.lazy(() => import('./views/Vendedor/Cadastrar/VendedorForm'));
const VendedorList = React.lazy(() => import('./views/Vendedor/Listar/VendedorList'));
const ProdutoForm = React.lazy(() => import('./views/Produto/Cadastrar/ProdutoForm'));
const ProdutoList = React.lazy(() => import('./views/Produto/Listar/ProdutoList'));
const CategoriaForm = React.lazy(() => import('./views/Categoria/Cadastrar/CategoriaForm'));
const CategoriaList = React.lazy(() => import('./views/Categoria/Listar/CategoriaList'));
const FornecedorForm = React.lazy(() => import('./views/Fornecedor/Cadastrar/FornecedorForm'));
const FornecedorList = React.lazy(() => import('./views/Fornecedor/Listar/FornecedorList'));
const UsuarioForm = React.lazy(() => import('./views/Usuario/Cadastrar/UsuarioForm'));
const UsuarioList = React.lazy(() => import('./views/Usuario/Listar/UsuarioList'));
const ExportarCsv = React.lazy(() => import('./views/ExportarRelatorioCsv/ExportarCsv'));
const TratarVendaFormAdmin = React.lazy(() =>
  import('./views/TratarVenda/Tratar/TratarVendaAdminForm'),
);
const AprovarVendaForm = React.lazy(() => import('./views/TratarVenda/Aprovar/AprovarVendaForm'));
const DetalharVendaForm = React.lazy(() =>
  import('./views/TratarVenda/Detalhar/DetalharVendaForm'),
);
const Custom = React.lazy(() => import('./views/Personalizados/Custom'));
const RelatoriosPowerBi = React.lazy(() => import('./views/RelatoriosPowerBi/RelatoriosPowerBi'));
const Login = React.lazy(() => import('./views/Login/Login'));
const AtualizarSenha = React.lazy(() => import('./views/Login/AtualizarSenha/AtualizarSenha'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/historicovenda', name: 'Histórico de Vendas', component: HistoricoVenda },
  { path: '/vendedores/cadastrar', name: ' Cadastrar Vendedor', component: VendedorForm },
  { path: '/vendedores/listar', name: 'Listar Vendedores', component: VendedorList },
  { path: '/produtos/cadastrar', name: 'Cadastrar Produto', component: ProdutoForm },
  { path: '/produtos/listar', name: 'Listar Produtos', component: ProdutoList },
  { path: '/categorias/cadastrar', name: 'Cadastrar Categoria', component: CategoriaForm },
  { path: '/categorias/listar', name: 'Listar Categorias', component: CategoriaList },
  { path: '/fornecedores/cadastrar', name: 'Cadastrar Fornecedor', component: FornecedorForm },
  { path: '/fornecedores/listar', name: 'Listar Fornecedores', component: FornecedorList },
  { path: '/usuarios/cadastrar', name: 'Cadastrar Usuário', component: UsuarioForm },
  { path: '/usuarios/listar', name: 'Listar Usuários', component: UsuarioList },
  { path: '/exportar', name: 'Exportar Relatório', component: ExportarCsv },
  { path: '/tratar-venda', name: 'Tratar Venda', component: TratarVendaFormAdmin },
  { path: '/aprovar-venda', name: 'Aprovar Vendas', component: AprovarVendaForm },
  { path: '/detalhar-venda', name: 'Detalhar Vendas', component: DetalharVendaForm },
  { path: '/relatorios-personalizados', name: 'Relatórios Personalizados', component: Custom },
  {
    path: '/relatorios-power-bi',
    name: 'Relatorios do Microsoft Power BI',
    component: RelatoriosPowerBi,
  },
  { path: 'login', name: 'Login', component: Login },
  { path: 'alterar--senha', name: 'Atualizar Senha', component: AtualizarSenha },
];

export default routes;
