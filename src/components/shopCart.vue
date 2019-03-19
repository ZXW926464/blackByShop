<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input
              id="jsondata"
              name="jsondata"
              type="hidden"
            >
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th
                    width="48"
                    align="center"
                  >
                    <a>选择</a>
                  </th>
                  <th align="left">商品信息</th>
                  <th
                    width="84"
                    align="left"
                  >单价</th>
                  <th
                    width="104"
                    align="center"
                  >数量</th>
                  <th
                    width="104"
                    align="left"
                  >金额(元)</th>
                  <th
                    width="54"
                    align="center"
                  >操作</th>
                </tr>
                <!-- 有商品显示的内容 -->
                <tr
                  v-for="(item,index) in goodslist"
                  :key="item.id"
                >
                  <td>
                    <el-switch
                      v-model="item.isOk"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                  </td>
                  <td class="two">
                    <img
                      :src="item.img_url"
                      alt=""
                    >
                    <span>{{item.title}}</span>
                  </td>
                  <td>{{item.sell_price}}</td>
                  <td><el-input-number
                      v-model="item.buycount"
                      size="mini"
                      :min="0"
                    ></el-input-number></td>
                  <td>{{item.buycount*item.sell_price}}</td>
                  <td>
                    <el-button @click="delShop(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                  </td>
                </tr>
                <!-- 没有商品显示的内容 -->
                <tr v-show="goodslist.length==0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    align="right"
                    colspan="8"
                  >
                    已选择商品
                    <b
                      class="red"
                      id="totalQuantity"
                    >{{zongNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b
                      class="red"
                      id="totalAmount"
                    >{{zongPrice}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <router-link to="/index"><button
                class="button"
              >继续购物</button></router-link>
              <router-link :to="'/jiesuan/'+selectedIds"><button
                class="submit"
              >立即结算</button></router-link>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>

    <audio
      controls="controls"
      style="display: none;"
    ></audio>
  </div>
</template>
<script>
export default {
  name: "shopCart",
  data() {
    return {
      //购物车数据
      goodslist: []
    };
  },
  methods: {
    //删除数据
    delShop(id){
       this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goodslist.forEach((v,index)=>{
            if(v.id==id){
              this.goodslist.splice(index,1)
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  //计算属性
  computed: {
    // 总个数
    zongNum() {
      let num = 0;
      this.goodslist.forEach(v => {
        if (v.isOk == true) {
          num += v.buycount;
        }
      });
      return num;
    },
    //总价格
    zongPrice() {
      let price = 0;
      this.goodslist.forEach(v => {
        if (v.isOk == true) {
          price += v.buycount * v.sell_price;
        }
      });
      return price;
    },
    //选中商品的id
    selectedIds(){
      let ids=''
      this.goodslist.forEach(v=>{
        if(v.isOk==true){
          ids+=v.id
          ids+=','
        }
      })
      ids=ids.slice(0,ids.length-1)
      return ids
    }
  },
  //声明周期
  created() {
    let ids = "";
    for (const key in this.$store.state.cartData) {
      ids += key;
      ids += ",";
    }
    ids = ids.slice(0, ids.length - 1);
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res => {
      // console.log(res);
      res.data.message.forEach(e => {
        e.buycount = this.$store.state.cartData[e.id];
        e.isOk = true;
      });
      this.goodslist = res.data.message;
      // console.log(this.goodslist);
    });
  },
  //深度监听数据
  watch: {
    goodslist: {
      handler: function(val, oldVal) {
        let obj = {};
        val.forEach(v => {
          obj[v.id] = v.buycount;
        });
        this.$store.commit("upCart", obj);
      },
      deep: true
    }
  }
};
</script>
<style>
td img {
  width: 100px;
}
td > span {
  margin-left: 10px;
}
td:nth-child(2) {
  display: flex;
  align-items: center;
}
</style>