import Vue from 'vue'
import routes from './routes.js'

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      let matchingView = routes[this.currentRoute]
      return matchingView ? require(`./pages/${matchingView}.vue`) : require('./pages/404.vue')
    }
  },
  render (h) {
    console.log(window.location)
    console.log(this.ViewComponent)
    return h(this.ViewComponent)
  },
  mounted() {
    console.log(window.location, 'location')
  }
})


// 监听浏览器状态---可以理解为监听浏览器后退、前进的操作，只要后退或者前进就会触发。
// popstate----简而言之就是HTML5新增的用来控制浏览器历史记录的api。
window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})