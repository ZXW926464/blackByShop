<template>
  <div class="right-auto">
    <div
      class="bg-wrap"
      style="min-height: 765px;"
    >
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          class="ftable"
        >
          <tbody>
            <tr>
              <th
                width="16%"
                align="left"
              >订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <tr v-for="(item,index) in orderList" :key="item.id">
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br> 在线支付
              </td>
              <td align="left">{{item.add_time|shorTimeP}}</td>
              <td align="left">
                {{item.statusName}}
              </td>
              <td align="left">
               <el-button type="success" plain><router-link :to="'/vipContent/orderDetail/'+item.id">查看订单</router-link></el-button>
                <br>
                <el-button type="success" plain v-show="item.status==1" >
                  <router-link :to="'/orderInfo/'+item.id"> 去付款</router-link>
                </el-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">

        </div>
      </div>
    </div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalcount">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "orderList",
  data() {
    return {
      pageIndex:1,
      pageSize:5,
      orderList:[],
      totalcount:0
    }
  },
  methods:{
    //页数改变
    handleSizeChange(pageSize){
      this.pageSize=pageSize
      this.pageIndex=1
      this.getOrderList()
    },
    // 页码改变
    handleCurrentChange(pageIndex){
      this.pageIndex=pageIndex
      this.getOrderList()
    },
    // 获取评论的函数
    getOrderList(){
      this.$axios.get(`site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res=>{
      // console.log(res);
      this.orderList=res.data.message
      this.totalcount=res.data.totalcount
    })
    }
  },
  created(){
    this.getOrderList()
  }
};
</script>
<style>
.el-button{
 width: 100px;
}
.el-button:nth-child(1){
  margin-bottom: 5px;
}
</style>
