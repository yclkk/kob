<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <!-- prevnet 阻止默认行为 -->
                <form @submit.prevent="login" >  
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <!-- 跟ref的username绑定起来 -->
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class="error-message">{{error_message}}</div>
                    <button type="submit" class="btn btn-primary">提交</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from "../../../components/ContentField"
import { useStore } from "vuex";
import { ref } from "vue";
import router from "../../../router/index"

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_message = ref('');
        
        const login = () => {
            // 清空信息
            error_message.value = "";
            //要使用actions里的函数需要使用dispatch
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success: function() {
                    // 跳转到name为home的页面
                    router.push({ name: 'home'});
                },
                error: function() {
                    error_message.value = "用户名或者密码错误";
                }
            })
        }

        return {
            username,
            password,
            error_message,
            login,
        }
    }

}
</script>

<style scoped>
.error-message {
    color: red;
}
</style>