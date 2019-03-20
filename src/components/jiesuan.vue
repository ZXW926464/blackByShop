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
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div
              id="orderForm"
              name="orderForm"
              url=""
            >
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item
                  label="收货人姓名"
                  prop="accept_name"
                >
                  <el-input v-model="ruleForm.accept_name"></el-input>
                </el-form-item>
                <el-form-item
                  label="所属地区"
                  prop="area"
                >
                  <v-distpicker
                    @selected='changeSeleted'
                    :province="ruleForm.area.province.value"
                    :city="ruleForm.area.city.value"
                    :area="ruleForm.area.area.value"
                  ></v-distpicker>
                </el-form-item>
                <el-form-item
                  label="收货人地址"
                  prop="address"
                >
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item
                  label="手机号码"
                  prop="mobile"
                >
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item
                  label="电子邮箱"
                  prop="email"
                >
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item
                  label="邮政编码"
                  prop="post_code"
                >
                  <el-input v-model="ruleForm.post_code"></el-input>
                </el-form-item>
                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <el-radio
                        v-model="ruleForm.payment_id"
                        :label="6"
                      >在线支付</el-radio>
                      <em>手续费：0元</em>
                      <span class="Validform_checktip"></span>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <el-radio
                        v-model="ruleForm.express_id"
                        @change="ruleForm.expressMoment=20"
                        :label="1"
                      >顺丰</el-radio>
                      <em>费用：20.00元</em>&nbsp;&nbsp;&nbsp;
                      <el-radio
                        v-model="ruleForm.express_id"
                        @change="ruleForm.expressMoment=12"
                        :label="2"
                      >韵达</el-radio>
                      <em>费用：12.00元</em>&nbsp;&nbsp;&nbsp;
                      <el-radio
                        v-model="ruleForm.express_id"
                        @change="ruleForm.expressMoment=8"
                        :label="3"
                      >圆通</el-radio>
                      <em>费用：8.00元</em>
                      <span class="Validform_checktip"></span>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="8"
                  cellspacing="0"
                  class="cart-table"
                >
                  <tbody>
                    <tr>
                      <th
                        colspan="2"
                        align="left"
                      >商品信息</th>
                      <th
                        width="84"
                        align="left"
                      >单价</th>
                      <th
                        width="84"
                        align="center"
                      >购买数量</th>
                      <th
                        width="104"
                        align="left"
                      >金额(元)</th>
                    </tr>
                    <tr
                      v-for="(item,index) in goodslist"
                      :key="item.id"
                    >
                      <td width="68">
                        <router-link :to="'/detail/'+item.id"><img
                            :src="item.img_url"
                            class="img"
                          ></router-link>
                      </td>
                      <td>
                        <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                      </td>
                      <td>
                        <span class="red">
                          ￥{{item.sell_price}}
                        </span>
                      </td>
                      <td align="center">{{item.buycount}}</td>
                      <td>
                        <span class="red">
                          ￥{{item.buycount*item.sell_price}}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea
                          v-model="ruleForm.message"
                          name="message"
                          class="input"
                          style="height:35px;"
                        ></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{goodsNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label
                        id="goodsAmount"
                        class="price"
                      >{{goodsPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label
                        id="expressFee"
                        class="price"
                      >{{ruleForm.expressMoment}}</label> 元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label
                        id="totalAmount"
                        class="price"
                      >{{ruleForm.expressMoment+goodsPrice}}</label>
                    </p>
                    <p class="btn-box">
                      <router-link
                        id="btnSubmit"
                        class="btn submit"
                        to="/shopCart"
                      >返回购物车</router-link>
                      <a
                        @click="submit('ruleForm')"
                        id="btnSubmit"
                        class="btn submit"
                      >确认提交</a>
                    </p>
                  </div>
                </div>

              </el-form>
            </div>
          </div>
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
  name: "jiesuan",
  data() {
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        let mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (mobile.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        let mobile = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (mobile.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮编"));
      } else {
        let mobile = /^[1-9]\d{5}(?!\d)$/;
        if (mobile.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮编"));
        }
      }
    };
    return {
      //商品id
      ids: "",
      //商品列表
      goodslist: [],
      //商品个数
      goodsNum: 0,
      //商品总价
      goodsPrice: 0,
      ruleForm: {
        accept_name: "张三",
        address: "广东省深圳市宝安区1010",
        mobile: "18186430949",
        email: "11123@qq.com",
        post_code: "440306",
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
        payment_id: 6,
        express_id: 1,
        expressMoment: 20,
        message: "哈哈哈"
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 5 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入收货人地址", trigger: "change" },
          { min: 2, message: "请输入详细地址", trigger: "change" }
        ],
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validateCode, trigger: "change" }]
      }
    };
  },
  methods: {
    changeSeleted(newArea) {
      this.ruleForm.area = newArea;
    },
    // 提交订单
    submit(formName) {
      //提交前的表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.goodsAmount = this.goodsPrice;
          this.ruleForm.goodsids = this.ids;
          let obj = {};
          this.goodslist.forEach(v => {
            obj[v.id] = v.buycount;
          });
          this.ruleForm.cargoodsobj = obj;
          this.$axios
            .post("site/validate/order/setorder", this.ruleForm)
            .then(res => {
              // console.log(res);
              this.$message({
                message: "订单提交成功!",
                type: "success"
              });
              this.$router.push("/orderInfo/"+res.data.message.orderid);
              this.goodslist.forEach(v=>{
                this.$store.commit('delbyid',v.id)
              })
            });
        } else {
          this.$message({
            message: "请提交完整的信息.",
            type: "warning"
          });
          return false;
        }
      });
    }
  },
  created() {
    this.ids = this.$route.params.ids;
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ids}`)
      .then(res => {
        this.goodslist = res.data.message;
        this.goodslist.forEach(v => {
          v.buycount = this.$store.state.cartData[v.id];
          this.goodsNum += v.buycount;
          this.goodsPrice += v.buycount * v.sell_price;
        });
        // console.log(this.goodslist);
      });
  }
};
</script>
<style>
.el-radio {
  margin-right: 5px;
}
</style>

