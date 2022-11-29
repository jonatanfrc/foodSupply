import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// main routing
const ListagemVendedores = Loadable(lazy(() => import('views/pages/vendedores')));
const ListagemProduto = Loadable(lazy(() => import('views/pages/produtos/listagem')));
const CadastroProduto = Loadable(lazy(() => import('views/pages/produtos/cadastro')));
const MeusProdutos = Loadable(lazy(() => import('views/pages/produtos/meusProdutos')));
const CadastroEndereco = Loadable(lazy(() => import('views/pages/endereco/cadastro')));
const SelecionaEndereco = Loadable(lazy(() => import('views/pages/produtos/selecionaEndereco')));
const MenuUsuario = Loadable(lazy(() => import('views/pages/usuario/menuUsuario')));
const RedefinicaoSenha = Loadable(lazy(() => import('views/pages/usuario/redefineSenha')));
const DefinirNomeVendedor = Loadable(lazy(() => import('views/pages/usuario/defineNomeVendedor')));
const DefineToken = Loadable(lazy(() => import('views/pages/usuario/defineToken')));
const MeusPedidos = Loadable(lazy(() => import('views/pages/pedidos/meusPedidos')));
const MinhasVendas = Loadable(lazy(() => import('views/pages/vendas/minhasVendas')));
const DefineValorFrete = Loadable(lazy(() => import('views/pages/vendas/defineValorFrete')));
const DefineInfRastreio = Loadable(lazy(() => import('views/pages/vendas/defineInfRastreio')));
const InformacoesPedido = Loadable(lazy(() => import('views/pages/pedidos/informacoesPedido')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/listagem/vendedores',
            element: <ListagemVendedores />
        },
        {
            path: '/listagem/produtos',
            element: <ListagemProduto />
        },
        {
            path: '/cadastro/produto',
            element: <CadastroProduto />
        },
        {
            path: '/listagem/MeusProdutos',
            element: <MeusProdutos />
        },
        {
            path: '/cadastro/endereco',
            element: <CadastroEndereco />
        },  
        {
            path: '/pedido/selecionaEndereco',
            element: <SelecionaEndereco />
        },  
        {
            path: '/usuario/configuracoes',
            element: <MenuUsuario />
        },  
        {
            path: '/usuario/configuracoes/redefinicaoSenha',
            element: <RedefinicaoSenha />
        },  
        {
            path: '/usuario/configuracoes/defineNomeVendedor',
            element: <DefinirNomeVendedor />
        },  
        {
            path: '/usuario/configuracoes/defineToken',
            element: <DefineToken />
        },  
        {
            path: '/listagem/meusPedidos',
            element: <MeusPedidos />
        },  
        {
            path: '/listagem/meusPedidos/InformacoesPedido',
            element: <InformacoesPedido />
        },  
        {
            path: '/listagem/minhasVendas',
            element: <MinhasVendas />
        },  
        {
            path: '/listagem/minhasVendas/defineValorFrete',
            element: <DefineValorFrete />
        },
        {
            path: '/listagem/minhasVendas/defineInfRastreio',
            element: <DefineInfRastreio />
        },
    ]
};

export default MainRoutes;
