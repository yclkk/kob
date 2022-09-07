<template>
 
    
  
  <div >
    <div>bot名称：{{ bot_name }}</div>
    <div>bot分数：{{ bot_rating}}</div>
  </div>
  <router-view></router-view>

</template> 


<script>
import $ from "jquery";
import { ref } from "vue";
export default {
  name: "App",
  setup: () => {
    // vue  
    let bot_name = ref("");
    let bot_rating = ref("");

    $.ajax({
      url: "http://127.0.0.1:3000/pk/getInfo/",
      type: "get",
      success: (resq) => {
        console.log(resq);
        bot_name.value = resq.name;
        bot_rating.value = resq.rating;
      }
    })
    return {
      bot_name,
      bot_rating,
    }
  }
}


</script>

<style>
body {
  background-image: url("assets/background.png");
  width: 100%;
  height: 100%;
}
</style>
