import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard'
    },
    {
        id: 'market-view',
        title: 'Market View',
        type: 'item',
        icon: 'insert_chart',
        url: '/market-view'
    },
    {
        id: 'total-price-comparison',
        title: 'Total Price Comparison',
        type: 'item',
        icon: 'compare_arrows',
        url: '/total-price-comparison'
    },
    {
        id: 'strategy',
        title: 'Strategy',
        type: 'item',
        icon: 'update',
        url: '/strategy'
    },
    {
        id: 'group-manager',
        title: 'Group Manager',
        type: 'item',
        icon: 'table_chart',
        url: '/group-manager'
    },
    {
        id: 'user-preferences',
        title: 'User Preferences',
        type: 'item',
        icon: 'person_add',
        url: '/user-preferences',
        // type: 'collapsable',
        // icon: 'person_add',
        // children: [
        //     {
        //         id: 'option-one',
        //         title: 'Option 1',
        //         type: 'item',
        //         url: '/preferences',
        //         exactMatch: true
        //     },
        //     {
        //         id: 'option-two',
        //         title: 'Option 2',
        //         type: 'item',
        //         url: '/preferences',
        //         exactMatch: true
        //     },
        //     {
        //         id: 'option-three',
        //         title: 'Option 3',
        //         type: 'item',
        //         url: '/preferences',
        //         exactMatch: true
        //     }
        // ]
    },
];
