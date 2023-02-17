// 每次调用$.ajax(),$.get(),$.post()函数的时候
// 都会先调用ajaxprefilter这个函数
// 在这个函数中，我们能拿到ajax提供的配置对象


$.ajaxPrefilter(function (options) {
    // 在发起真正的请求之前，配置根路径拼接
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 统一为有权限接口，设置headers请求头
    if (options.url.indexOf('/my/') !== 1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }


    // 全局统一挂载complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转到登陆页面
            location.href = '/login.html'
        }
    }

})