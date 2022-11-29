// assets
import { IconDashboard, IconUser, IconShoppingCart, IconShoppingCartPlus, IconSquarePlus } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUser, IconShoppingCart, IconShoppingCartPlus, IconSquarePlus};

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
            icon: icons.IconSquarePlus,
            breadcrumbs: false
        }
        // {
        //     id: 'cadastroEndereco',
        //     title: 'Cadastro de Endereço',
        //     type: 'item',
        //     url: '/cadastro/endereco',
        //     icon: icons.IconSquarePlus,
        //     breadcrumbs: false
        // }
    ]
};

export default cadastros;
