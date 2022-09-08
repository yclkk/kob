import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from "../views/pk/PkIndexView";
import RankListIndexView from "../views/ranklist/RankListIndexView"
import ReCordIndexView from '../views/record/ReCordIndexView';
import NotFound from "../views/error/NotFound";
import UserBotIndexView from "../views/user/bot/UserBotIndexView";

const routes = [
  {
    name: "home",
    path: "/",
    redirect:"/pk/",
  },
  {
    name:"pk_index",
    path: "/pk/",
    component: PkIndexView
  },
  {
    name: "ranklist_index",
    path: "/ranklist/",
    component: RankListIndexView
  },
  {
    name: "record_index",
    path: "/record/",
    component: ReCordIndexView,
  },
  {
    name: "notFound",
    path: "/404/",
    component: NotFound,
  },
  {
    name: "user_bot_index",
    path: "/user/bot",
    component:UserBotIndexView,
  },
  {
    path:"/:catchAll(.*)", // 不能被以上路径识别的路径会在这里被捕捉
    redirect: "/404/",

  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
