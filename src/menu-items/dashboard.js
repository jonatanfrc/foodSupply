// assets
import { IconDashboard, IconUser, IconShoppingCart } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUser, IconShoppingCart };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Páginas',
    type: 'group',
    children: [
        {
            id: 'vendedores',
            title: 'Vendedores',
            type: 'item',
            url: '/listagem/vendedores',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'produtos',
            title: 'Produtos',
            type: 'item',
            url: '/listagem/produtos',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        },
        {
            id: 'meusProdutos',
            title: 'Meus Produtos',
            type: 'item',
            url: '/listagem/meusProdutos',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
