import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import NoteDetails from "../views/NoteDetails";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:noteIndex',
    name: 'NoteDetails',
    component: NoteDetails
  },
  {
    path: '/create',
    name: 'createNode',
    component: NoteDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
