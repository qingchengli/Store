<template>
    <div class="left-nav">
        <ul>
            <li>
                <router-link to="/">
                    <i class='iconfont icon-goumai'></i>
                    <div>收银</div>
                </router-link>
            </li>
            <li>
                <router-link to="/store">
                    <i class='iconfont icon-dianpu'></i>
                    <div>店铺</div>
                </router-link>

            </li>
            <li @click="noNoNo">
                <i class='iconfont icon-hanbao'></i>
                <div>商品</div>
            </li>
            <li @click="noNoNo">
                <i class='iconfont icon-gongnengjianyi'></i>
                <div>会员</div>
            </li>
            <li @click="noNoNo">
                <i class='iconfont icon-chanpincanshu'></i>
                <div>统计</div>
            </li>
            <li @click="noNoNo">
                <i class='iconfont icon-gongnengjianyi'></i>
                <div>设置</div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'leftNav',
        methods: {
            noNoNo: function () {
                this.$message({
                    message: '虽然你点了,但我就是不想跳转,哈哈哈,没写怎么跳',
                    type: 'warning'
                })
            }
        }
    }
</script>
<style>
    .left-nav {
        color: #fff;
        font-size: 10px;
        height: 100%;
        background: #1d8ce0;
        float: left;
        width: 5%;
        padding-top: 10px;
    }

    .iconfont {
        font-size: 24px;
    }

    .left-nav ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .left-nav li {
        border-bottom: 1px solid #20a0ff;
        text-align: center;
        padding: 10px;
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    a:link {
        color: #fff;
    }

    a:visited {
        color: #fff;
    }
</style>