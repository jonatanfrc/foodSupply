// assets
import { IconDashboard, IconUsers, IconShoppingCart, IconSquarePlus, IconPackage, IconApple} from '@tabler/icons';

// constant
const icons = { IconDashboard, IconUsers, IconShoppingCart, IconSquarePlus, IconPackage, IconApple};

let nomeVendedor = localStorage.getItem('nomeVendedor');

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
console.log('nomeVendedor', nomeVendedor);


let children = [
    {
        id: 'vendedores',
        title: 'Vendedores',
        type: 'item',
        url: '/listagem/vendedores',
        icon: icons.IconUsers,
        breadcrumbs: false
    },
    {
        id: 'meusProdutos',
        title: 'Meus Produtos',
        type: 'item',
        url: '/listagem/meusProdutos',
        icon: icons.IconApple,
        breadcrumbs: false
    }
];

if(nomeVendedor !== '' && nomeVendedor !== null){
    children.push({
        id: 'meusPedidos',
        title: 'Meus Pedidos',
        type: 'item',
        url: '/listagem/meusPedidos',
        icon: icons.IconPackage,
        breadcrumbs: false
    },
    {
        id: 'minhasVendas',
        title: 'Minhas Vendas',
        type: 'item',
        url: '/listagem/minhasVendas',
        icon: icons.IconShoppingCart,
        breadcrumbs: false
    });
}
console.log('children', children);
const listagens = {
    id: 'listagens',
    title: 'Páginas',
    type: 'group',
    children: children
};

export default listagens;
