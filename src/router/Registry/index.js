import RegistryIndexView from '@/views/Registry/Index.vue';
import RegistryShowView from '@/views/Registry/Show.vue';

const RegistryRoute = [
    {
        path: '/registry',
        name: 'RegistryIndex',
        component: RegistryIndexView,
    },
    {
        path: '/registry/:fileName/show',
        name: 'RegistryShow',
        component: RegistryShowView,
        props: true,
    }
];

export default RegistryRoute;