// assets
import { IconDashboard, IconUser, IconShoppingCart } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUser, IconShoppingCart };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const listagens = {
    id: 'listagens',
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
            id: 'meusProdutos',
            title: 'Meus Produtos',
            type: 'item',
            url: '/listagem/meusProdutos',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        }
    ]
};

export default listagens;
