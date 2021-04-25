import PageNotFoundView from '@/views/PageNotFound.vue';

const PageNotFoundRoute = [
    {
        path: "*",
        name: '404',
        component: PageNotFoundView,
    }
];

export default PageNotFoundRoute;