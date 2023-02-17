// 每次调用$.ajax(),$.get(),$.post()函数的时候
// 都会先调用ajaxprefilter这个函数
// 在这个函数中，我们能拿到ajax提供的配置对象


$.ajaxPrefilter(function(options){
// 在发起真正的请求之前，配置根路径拼接
options.url='http://api-breakingnews-web.itheima.net'+options.url
})