import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useAuthStore } from '../stores/auth/user_auth'
import { useStorageStore } from '../stores/auth/user_storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChangePasswordView.vue')
    },
    {
      path: '/reminder',
      name: 'reminder',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReminderMainView.vue')
    }
  ]
})



router.beforeEach(async (to) => {
  const auth = useAuthStore()
  const storage = useStorageStore()

  if (to.name == 'login') {
    if (storage.getUser() && storage.getToken()) {
      const result = await auth.isAuthenticated()
      if (result) {
        return { name: 'reminder' }
      }
    }
    return
  }else{
    if ( to.name !== 'home' && to.name !== 'register' && to.name !== 'test') {
      const result = await auth.isAuthenticated()
      if (!result) {
        return { name: 'login' }
      }
      return
    }
  }

})





export default router
