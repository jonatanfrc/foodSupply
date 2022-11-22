// assets
import { IconDashboard, IconUser, IconShoppingCart, IconShoppingCartPlus } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUser, IconShoppingCart, IconShoppingCartPlus};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const cadastros = {
    id: 'cadastros',
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
        {
            id: 'cadastroEndereco',
            title: 'Cadastro de Endereço',
            type: 'item',
            url: '/cadastro/endereco',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        }
    ]
};

export default cadastros;
