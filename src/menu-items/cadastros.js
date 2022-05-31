// assets
import { IconDashboard, IconUser, IconShoppingCart, IconShoppingCartPlus } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUser, IconShoppingCart, IconShoppingCartPlus};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Cadastros',
    type: 'group',
    children: [
        {
            id: 'cadProduto',
            title: 'Cadastre seu produto',
            type: 'item',
            url: '/cadastro/produto',
            icon: icons.IconShoppingCartPlus,
            breadcrumbs: false
        },
    ]
};

export default dashboard;
