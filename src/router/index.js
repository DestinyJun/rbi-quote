import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect:"/login"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [
        {path: 'report', name: 'report', component: () => import('@/views/common/report/report.vue')},
        {path: 'secreview', name: 'secreview', component: () => import('@/views/common/review/secReview/secReview.vue')},
        {path: 'thrreview', name: 'thrreview', component: () => import('@/views/common/review/thrReview/thrReview.vue')},
        {path: 'user', name: 'user', component: () => import('@/views/common/authormanage/user/user.vue')},
        {path: 'sign', name: 'sign', component: () => import('@/views/common/authormanage/signatory/sign.vue')},
        {path: 'inquire', name: 'inquire', component: () => import('@/views/common/project/itemInquire/inquire.vue')},
        {path: 'graphic', name: 'graphic', component: () => import('@/views/common/graphic/graphic.vue')}
    ]
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
