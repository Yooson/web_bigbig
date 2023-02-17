$(function() {
    //  点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录的链接
    $('#link_login').on('click', function() {

        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui里提取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义的一个pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位,且不能出现空格'],
        // 校验两次密码是否一直的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则ruturn一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }

            layer.msg('z注册成功')
                // 模拟点击“去登录”
            $('#link_login').click()
        })
    })

    // 登录的监听提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的字据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                    // 将登录成功的token信息存到localstorage中
                console.log(res.token);
                localStorage.setItem('token', res.token)
                    // 跳转到index页面
                    location.href = '/index.html'

            }
        })
    })
})