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
                            <div class="pic-box"></div>
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
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <el-input-number v-model="byNum"  :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}" >商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==1}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-html="goodsinfo.content" v-show="tabIndex==0">
                            </div>
                            <div class="tab-content" v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="this.totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item,index) in comments" :key="item.id">
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
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                         <Page @on-change="pageChange" :total="totalcount" placement='top' :page-size-opts="[5,10,20]" :page-size="pageSize" @on-page-size-change="sizeChange" show-sizer show-elevator/>
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
                                    <li v-for="(item,index) in hotgoodslist" :key="item.id">
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
        <BackTop :height="100" :bottom="200">
        <div class="top">返回顶端</div>
    </BackTop>
    </div>
</template>
<script>
export default {
    name:'detail',
    data() {
        return {
            //商品id
            artID:"",
            //商品详情
            goodsinfo:{},
            //热卖商品
            hotgoodslist:[],
            //图片列表
            imglist:[],
            //商品购买数量
            byNum:1,
            //底部tab索引
            tabIndex:0,
            // 评论页码
            pageIndex:1,
            //页码数量:
            pageSize:5,
            // 评论内容
            comments:[],
            //评论总数
            totalcount:0
        }
    },
    methods: {
        //初始化数据
        initData(){
            this.artID = this.$route.params.id;
            this.$axios.get(`http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`).then(res=>{
            // console.log(res);
            this.goodsinfo=res.data.message.goodsinfo
            this.hotgoodslist=res.data.message.hotgoodslist
            this.imglist=res.data.message.imglist
            })
            this.byNum=1
            this.getComments();
        },
        //获取评论数据
        getComments(){
            this.$axios.get(`http://111.230.232.110:8899/site/comment/getbypage/goods/${this.artID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res=>{
            // console.log(res);
            this.comments=res.data.message;
            this.totalcount=res.data.totalcount
        })
        },
        // 改变页码获取评论数据
        pageChange(pageIndex){
            // console.log(pageIndex);
            this.pageIndex=pageIndex
            this.getComments();
        },
        //改变页码数量
        sizeChange(pageSize){
            this.pageSize=pageSize
            this.getComments();
        }
    },
    created(){
        this.initData();
    },
    watch:{
        $route(newD,oldD){
            this.initData();
        }
    }
}
</script>
<style>
    .tab-content img{
        display: block;
        max-width: 925px;
    }
     .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
 