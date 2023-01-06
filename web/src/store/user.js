import $ from "jquery";

export default {
    state: {
        id : "",
        username: "",
        photo: "",
        token: "",
        is_login: "false",
    },
    mutations: {  // 用来修改数据的
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },
        updateToken(state, token) {
            state.token = token;
        }
    },
    actions: {
        login(context, data) {
            
            $.ajax({
                url: "http://127.0.0.1:3000/user/account/token/",
                type: "POST",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success: function(resp) {
                    // 调用mutations的函数需要用commit("function()")
                    if (resp.error_message === "success") {
                        context.commit("updateToken", data.token);
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error: function() {
                    data.error();
                }
            })
        },
        getInfo(context, data) {
            $.ajax({
                url: "http://127.0.0.1:3000/user/account/info",
                type:"GET",
                success: function(resp) {
                    context.commit("updateUser", {
                        ...resp,
                        is_login: true,
                    });
                    data.success(resp);
                },
                error: function(resp) {
                    data.error(resp)
                }
            })
        }

    },
    modules: {
    }
}