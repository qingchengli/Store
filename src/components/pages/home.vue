<template>
    <div class="home">
        <el-row>
            <el-col :span='7' class="home-order" id="order-list">
                <el-tabs type="card">
                    <el-tab-pane label='点餐'>
                        <el-table border :data="tableData">
                            <el-table-column prop="goodsName" label="商品名称" align="left" width="120px"></el-table-column>
                            <el-table-column prop="count" label="数量" width='60px'></el-table-column>
                            <el-table-column prop="price" label="价格" width='60px'></el-table-column>
                            <el-table-column label="操作" fixed='right' align="left">
                                <template slot-scope="scope">
                                    <!-- 添加 -->
                                    <el-button type="primary" size="mini" icon="el-icon-plus" @click='addGoods(scope.row)' circle></el-button>
                                    <!-- 减少 -->
                                    <el-button type="primary" size="mini" icon="el-icon-minus" @click="reduceGoods(scope.$index,tableData)" circle></el-button>
                                    <!-- 删除 -->
                                    <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteGoods(scope.$index,tableData)" circle></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 总价和总数 -->
                        <div class="list-total">
                            <span>数量:
                                <a>{{countTotal}}</a>
                            </span>
                            <span>总价:
                                <a>{{priceTotal}}元</a>
                            </span>
                        </div>
                        <div class="div-btn">
                            <el-button type="warning">挂单</el-button>
                            <el-button type="danger" @click="deleteList">删除</el-button>
                            <el-button type="success" @click="checkout">结账</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label='挂单'>
                        挂单
                    </el-tab-pane>
                    <el-tab-pane label='外卖'>
                        外卖
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="17">
                <div class="hot-goods">
                    <div class="title">热门商品</div>
                    <div class="hot-goods-list">
                        <ul>
                            <li v-for="goods in hotGoods" @click="addGoods(goods)">
                                <span>{{goods.goodsName}}</span>
                                <span class="hot-goods-price">¥ {{goods.price}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="goods-type">
                        <el-tabs type="border-card">
                            <el-tab-pane label="汉堡">
                                <div>
                                    <ul class='cookList'>
                                        <li v-for="good in goodsType" @click='addGoods(good)'>
                                            <span class="foodImg">
                                                <img :src="good.goodsImg" width="100%">
                                            </span>
                                            <span class="foodName">{{good.goodsName}}</span>
                                            <span class="foodPrice">￥{{good.price}}元</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="小吃">
                                <div>
                                    <ul class='cookList'>
                                        <li v-for="good in goodsType2" @click='addGoods(good)'>
                                            <span class="foodImg">
                                                <img :src="good.goodsImg" width="100%">
                                            </span>
                                            <span class="foodName">{{good.goodsName}}</span>
                                            <span class="foodPrice">￥{{good.price}}元</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="饮料">
                                <div>
                                    <ul class='cookList'>
                                        <li v-for="good in goodsType3" @click='addGoods(good)'>
                                            <span class="foodImg">
                                                <img :src="good.goodsImg" width="100%">
                                            </span>
                                            <span class="foodName">{{good.goodsName}}</span>
                                            <span class="foodPrice">￥{{good.price}}元</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="套餐">
                                <div>
                                    <ul class='cookList'>
                                        <li v-for="good in goodsType4" @click='addGoods(good)'>
                                            <span class="foodImg">
                                                <img :src="good.goodsImg" width="100%">
                                            </span>
                                            <span class="foodName">{{good.goodsName}}</span>
                                            <span class="foodPrice">￥{{good.price}}元</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'home',
        created: function () {
            // 请求热门商品列表
            axios.get('http://jspang.com/DemoApi/oftenGoods.php').then(data => {
                this.hotGoods = data.data;
            }).catch(err => {
                console.log('网络错误,请刷新重试');
            });
            // 请求商品分类列表
            axios.get('http://jspang.com/DemoApi/typeGoods.php').then(data => {
                this.goodsType = data.data[0]
                this.goodsType2 = data.data[1]
                this.goodsType3 = data.data[2]
                this.goodsType4 = data.data[3]

            }).catch(err => {
                alert('网络错误,请刷新重试');
            })
        },
        mounted: function () {
            let listHeight = document.body.clientHeight;
            document.getElementById('order-list').style.height = listHeight + 'px';
        },
        data() {
            return {
                tableData: [],
                hotGoods: [],
                goodsType: [],
                goodsType2: [],
                goodsType3: [],
                goodsType4: [],
                countTotal: 0,
                priceTotal: 0,
            }
        },
        methods: {
            addGoods: function (goods) {
                // 清空总数
                this.countTotal = 0;
                this.priceTotal = 0;
                // 判断商品是否已存在
                let isHave = false;
                for (var i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].goodsId == goods.goodsId) {
                        isHave = true;
                    };
                };
                if (isHave) {
                    let arr = this.tableData.filter(elem => elem.goodsId == goods.goodsId);
                    arr[0].count += 1;
                } else {
                    let newGoods = {
                        goodsId: goods.goodsId,
                        goodsName: goods.goodsName,
                        price: goods.price,
                        count: 1
                    };
                    this.tableData.push(newGoods);
                };
                this.allPrice();
            },
            // 计算总数和总价
            allPrice: function () {
                // 清零操作
                this.countTotal = 0;
                this.priceTotal = 0;
                this.tableData.forEach(elem => {
                    this.countTotal += elem.count;
                    this.priceTotal += elem.count * elem.price;
                });
            },
            // 设置删除事件
            reduceGoods: function (index, table) {
                if (table[index].count > 1) {
                    table[index].count -= 1;
                } else {
                    table.splice(index, 1);
                };
                this.allPrice();
            },
            // 设置删除一行
            deleteGoods: function (index, table) {
                table.splice(index, 1);
                this.allPrice();
            },
            // 设置删除列表
            deleteList: function () {
                if (this.countTotal != 0) {
                    this.$confirm('此操作将清空列表, 是否继续?', '清空', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.tableData = [];
                        this.allPrice();
                    })
                }else {
                    this.$message.error('商品列表已经为空')
                }
            },
            checkout: function () {
                if (this.countTotal != 0) {
                    this.tableData = [];
                    this.$message({
                        message: `成功!本次共 ${this.countTotal} 件商品,合计 ${this.priceTotal} 元`,
                        type: 'success'
                    });
                } else {
                    this.$message.error('商品列表为空,请先选择商品')
                }
            }
        },
    }
</script>
<style scoped>
    .home-order {
        background: #f9fafc;
        border-right: 1px solid #C0CCDA;
    }

    .div-btn {
        margin-top: 15px;
    }

    .title {
        height: 20px;
        border-bottom: 1px solid #d3dce6;
        background-color: #f9fafc;
        padding: 10px;
        text-align: left;
    }

    .hot-goods-list ul li {
        list-style: none;
        float: left;
        border: 1px solid #e5e9f2;
        padding: 10px;
        margin: 10px;
        background: #fff;
        cursor: pointer;
    }

    .hot-goods-price {
        color: #58bcff
    }

    .goods-type {
        clear: both;
    }

    .cookList li {
        list-style: none;
        width: 23%;
        border: 1px solid rgb(205, 214, 236);
        height: auot;
        overflow: hidden;
        background-color: #fff;
        padding: 2px;
        float: left;
        margin: 5px;
        border-radius: 6px;
        cursor: pointer;
    }

    .cookList li span {

        display: block;
        float: left;
    }

    .foodImg {
        width: 40%;
    }

    .foodImg img {
        border-radius: 8px;
    }

    .foodName {
        font-size: 18px;
        padding-left: 10px;
        color: #c40000;
        min-width: 50%;
        max-width: 52%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;

    }

    .foodPrice {
        font-size: 16px;
        padding-left: 10px;
        padding-top: 10px;
    }

    .list-total {
        margin-top: 10px;
        text-align: left;
        padding-left: 20px;
    }

    .list-total span {
        margin-right: 20px;
        font-size: 14px;
    }

    .list-total a {
        font-style: none;
        font-size: 18px;
        margin-left: 10px;
    }
</style>