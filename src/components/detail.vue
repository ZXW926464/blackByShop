<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <ProductZoomer
                  v-if="images.normal_size.length!=0"
                  :base-images="images"
                  :base-zoomer-options="zoomerOptions"
                />
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em
                        id="commoditySellPrice"
                        class="price"
                      >¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <el-input-number
                        v-model="byNum"
                        :min="1"
                        :max="goodsinfo.stock_quantity"
                        label="描述文字"
                      ></el-input-number>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div
                        id="buyButton"
                        class="btn-buy"
                      >
                        <button
                          onclick=""
                          class="buy"
                        >立即购买</button>
                        <button
                          @click="addCart"
                          class="add"
                        >加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div
              id="goodsTabs"
              class="goods-tab bg-wrap"
            >
              <Affix>
                <div
                  id="tabHead"
                  class="tab-head"
                  style="position: static; top: 517px; width: 925px;"
                >
                  <ul>
                    <li>
                      <a
                        href="javascript:;"
                        @click="tabIndex=0"
                        :class="{selected:tabIndex==0}"
                      >商品介绍</a>
                    </li>
                    <li>
                      <a
                        href="javascript:;"
                        @click="tabIndex=1"
                        :class="{selected:tabIndex==1}"
                      >商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <div
                class="tab-content entry"
                v-html="goodsinfo.content"
                v-show="tabIndex==0"
              >
              </div>
              <div
                class="tab-content"
                v-show="tabIndex==1"
              >
                <div class="comment-box">
                  <div
                    id="commentForm"
                    name="commentForm"
                    class="form-box"
                  >
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          v-model="sbcomments"
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          datatype="*10-1000"
                          nullmsg="请填写评论内容！"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          @click="sbComments"
                          class="submit"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul
                    id="commentList"
                    class="list-box"
                  >
                    <p
                      v-show="this.totalcount==0"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li
                      v-for="(item,index) in comments"
                      :key="item.id"
                    >
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.reply_time|shorTimeP}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div
                    class="page-box"
                    style="margin: 5px 0px 0px 62px;"
                  >
                    <Page
                      :current='pageIndex'
                      @on-change="pageChange"
                      :total="totalcount"
                      placement='top'
                      :page-size-opts="[5,10,20]"
                      :page-size="pageSize"
                      @on-page-size-change="sizeChange"
                      show-sizer
                      show-elevator
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li
                    v-for="(item,index) in hotgoodslist"
                    :key="item.id"
                  >
                    <div class="img-box">
                      <router-link :to="'/detail/'+item.id">
                        <img :src="item.img_url"></router-link>
                    </div>
                    <div class="txt-box">
                      <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                      <span>{{item.add_time|shorTime}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BackTop
      :height="100"
      :bottom="200"
    >
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
      //商品id
      artID: "",
      //商品详情
      goodsinfo: {},
      //热卖商品
      hotgoodslist: [],
      //图片列表
      imglist: [],
      //商品购买数量
      byNum: 1,
      //底部tab索引
      tabIndex: 0,
      // 评论页码
      pageIndex: 1,
      //页码数量:
      pageSize: 5,
      // 评论内容
      comments: [],
      //评论总数
      totalcount: 0,
      // 评论内容
      sbcomments: "",
      //放大镜数据
      images: {
        normal_size: []
      },
      // 放大镜的设置
      zoomerOptions: {
        zoomFactor: 8,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  methods: {
    //初始化数据
    initData() {
      this.byNum = 1;
      this.artID = this.$route.params.id;
      this.$axios.get(`site/goods/getgoodsinfo/${this.artID}`).then(res => {
        // console.log(res);
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
        // 设置放大镜数据
        this.images.normal_size = [];
        this.imglist.forEach(v => {
          this.images.normal_size.push({
            id: v.id,
            url: v.original_path
          });
        });
      });
      this.getComments();
    },
    //获取评论数据
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.artID}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          // console.log(res);
          this.comments = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    },
    // 改变页码获取评论数据
    pageChange(pageIndex) {
      // console.log(pageIndex);
      this.pageIndex = pageIndex;
      this.getComments();
    },
    //改变页码数量
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getComments();
    },
    // 提交评论
    sbComments() {
      if (this.sbcomments == "") {
        this.$Message.warning("请输入评论内容!");
      } else {
        this.$axios
          .post(`site/validate/comment/post/goods/${this.artID}`, {
            commenttxt: this.sbcomments
          })
          .then(res => {
            // console.log(res);
            if (res.data.status == 0) {
              this.$Message.success("评论成功");
              this.sbcomments = "";
              this.pageIndex = 1;
              this.getComments();
            } else {
              this.$Message.warning("评论失败");
            }
          });
      }
    },
    //添加购物车
    addCart(){
      this.$store.commit('addCart',{
        goodsID:this.artID,
        goodsNum:this.byNum
      }),
      this.$notify({
          title: '成功',
          message: '添加购物车成功.',
          type: 'success',
          duration:1000
        });
    }
  },
  created() {
    this.initData();
  },
  watch: {
    $route(newD, oldD) {
      // 设置 图片数组为空 让放大镜组件 重新生成
      this.images.normal_size = [];
      // 初始化数据
      this.initData();
    }
  }
};
</script>
<style>
.tab-content img {
  display: block;
  max-width: 925px;
}
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
.inline-zoomer-zoomer-box {
  width: 395px;
}
.thumb-list img{
    width: 100px;
    height: 100px;
}
</style>
 