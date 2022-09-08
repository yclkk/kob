<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <!-- <a class="navbar-brand" href="/">king of bots</a> -->
    <!-- 后面也替换成router-link，跟react的route差不多，都是变成前端渲染-->
    <router-link class="navbar-brand" :to="{name: 'home'}" >King of bots</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'" :to="{name:'pk_index'}" >PK</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'record_index' ? 'nav-link active' : 'nav-link'" :to="{name:'record_index'}">对局记录</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'" :to="{name:'ranklist_index'}">排行榜</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            用户
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link class="dropdown-item" :to="{name:'user_bot_index'}">bot</router-link>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">退出</a></li>
          </ul>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
</template>


<script>
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';

export default {
    setup() {
        const route = useRoute();
        let route_name = computed(() => route.name)
        
        return {
            route_name
        }
    }
}
</script>

<!-- scoped会给这里的css加上一个随机字符串，这里的样式不会影响到其他的组件 -->
<style scoped>  

</style>