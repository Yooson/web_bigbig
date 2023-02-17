$(function () {
    // 调用getuserinfo获取用户基本信息
    getUserInfo()
    // 退出的点击

    var layer = layui.layer
    $('#btnLogout').on('click', function () {


        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭cinfirm询问框
            layer.close(index)
        })
    })

})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }

            //    调用 renderAvatar渲染用户的头像
            renderAvatar(res.data)
        }
        // 不论成功或者失败，最终都会调用complete
        // complete: function (res) {
        //     // 可以用responseJSON拿到返回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登陆页面
        //         location.href = '/login.html'
        //     }

        // }

    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}