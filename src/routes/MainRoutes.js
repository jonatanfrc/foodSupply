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

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

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
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
