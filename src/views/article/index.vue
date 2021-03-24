<!--  -->
<template>
  <div class="article-contairn">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-for="o in 1" :key="o" class="text item">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="状态" prop="resource">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="region">
            <el-select v-model="channelId" placeholder="请选择频道">
              <el-option label="全部" :value="null"></el-option>
              <el-option
                v-for="(channel, index) in channels"
                :key="index"
                :label="channel.name"
                :value="channel.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="日期" required>
            <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getacticle(1)">查找</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 表格区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共有{{ totalpages }}条数据</span>
      </div>
      <div v-for="o in 1" :key="o" class="text item">
        <el-table
          :data="articles"
          stripe
          style="width: 100%"
          size="mini"
          v-loading="loading"
        >
          <el-table-column prop="" label="封面">
            <template slot-scope="scope">
              <img
                v-if="scope.row.cover.images[0]"
                :src="scope.row.cover.images[0]"
                alt=""
                class="sloimg"
              />
              <img v-else src="./a.jpg" alt="" class="sloimg" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 0">草稿</el-tag>
              <el-tag type="success" v-else-if="scope.row.status == 1"
                >待审核</el-tag
              >
              <el-tag type="info" v-else-if="scope.row.status == 2"
                >审核通过</el-tag
              >
              <el-tag type="warning" v-else-if="scope.row.status == 3"
                >审核失败</el-tag
              >
              <el-tag type="danger" v-else-if="scope.row.status == 4"
                >已删除</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" circle icon="el-icon-edit" @click="$router.push('/publish?id='+scope.row.id)"></el-button>
              <el-button
                size="mini"
                type="danger"
                circle
                icon="el-icon-delete"
                @click="ondelete(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 分页区域 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalpages"
      @current-change="tiaozhuan"
      :page-size="pageSize"
      :disabled="loading"
      :current-page.sync="page"
    >
    </el-pagination>
  </div>
</template>

<script>
import { Aticle, getpindao, deletearticle ,xiuArticle } from "@/api/article.js";
export default {
  name: "article",
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      articles: [],
      totalpages: 0, //总页码数量
      pageSize: 10,
      status: null,
      channels: [],
      channelId: null,
      rangeDate: null,
      loading: true,
      page: null,
    };
  },

  components: {},
  created() {
    this.getacticle();
    this.getpindaos();
  },
  computed: {},

  mounted: {},

  methods: {
    getacticle(page=1) {
      this.loading = true;
      Aticle({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null,
      }).then((res) => {
        0;
        this.articles = res.data.data.results;
        this.totalpages = res.data.data.total_count;
      });
      this.loading = false;
    },
    tiaozhuan(page) {
      this.getacticle(page);
    },
    getpindaos() {
      getpindao().then((res) => {
        console.log(res);
        this.channels = res.data.data.channels;
      });
    },
    ondelete(list) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletearticle(list.toString()).then(res=>{
              this.getacticle(this.page)
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
    },
  },
};
</script>
<style lang='less' scoped>
.box-card {
  margin-bottom: 30px;
}
.sloimg {
  width: 50px;
}
</style>
