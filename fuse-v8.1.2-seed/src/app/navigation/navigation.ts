import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'home',
                title: 'Home',
                translate: 'Home',
                type: 'item',
                icon: 'home',
                url: '/home'
            }
        ]
    },
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'sample',
                title: 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'insert_chart',
                url: '/search'
            }
        ]
    },
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'total-price-comparison',
                title: 'Total Price Comparison',
                translate: 'Total Price Comparison',
                type: 'item',
                icon: 'compare_arrows',
                url: '/total-price-comparison'
            }
        ]
    },
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'strategy',
                title: 'Strategy',
                translate: 'Strategy',
                type: 'item',
                icon: 'update',
                url: '/strategy'
            }
        ]
    },
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'group-manager',
                title: 'Group Manager',
                translate: 'Group Manager',
                type: 'item',
                icon: 'table_chart',
                url: '/group-manager'
            }
        ]
    },
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'user-preferences',
                title: 'User Preferences',
                translate: 'User Preferences',
                type: 'item',
                icon: 'person_add',
                url: '/preferences'
            }
        ]
    }
    // {
    //     id: 'applications',
    //     title: 'Applications',
    //     translate: 'NAV.APPLICATIONS',
    //     type: 'group',
    //     children: [
    //         {
    //             id: 'totalPriceComparison',
    //             title: 'Total Price Comparison',
    //             translate: 'Total Price Comparison',
    //             type: 'item',
    //             faIcon: 'fas fa-columns fa-sm', // font-awesome example
    //             url: '/total-price-comparison'
    //         }
    //     ]
    // },
];
