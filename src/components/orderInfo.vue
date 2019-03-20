<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a
              href="javascript:;"
              class="selected"
            >支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{goodsInfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{goodsInfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{goodsInfo.address}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{goodsInfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{goodsInfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{goodsInfo.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div id="container2">
                  <qrcode
                    :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderId"
                    :options="{ width: 300 }"
                  ></qrcode>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  naem: "orderInfo",
  data() {
    return {
      //订单id
      orderId: 0,
      //订单详情
      goodsInfo: {},
      //定时器id
      setId: 0
    };
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.$axios
      .get(`site/validate/order/getorder/${this.orderId}`)
      .then(res => {
        //   console.log(res);
        this.goodsInfo = res.data.message[0];
      });
    this.setId = setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/${this.orderId}`)
        .then(res => {
          if (res.data.message[0].status === 2) {
            this.$message({
              message: "付款成功!",
              type: "success"
            });
            this.$router.push("/paySuccess");
            clearInterval(this.setId);
          }
        });
    }, 2000);
  }
};
</script>
<style>
</style>
