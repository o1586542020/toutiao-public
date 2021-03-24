<!--  -->
<template>
  <div class="comment-contarin">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">评论管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 表格 -->
      <div class="text item">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数">
          </el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数">
          </el-table-column>
          <el-table-column prop="name" label="评论状态">
            <template slot-scope="scope">
              {{ scope.row.comment_status ? "正常" : "关闭" }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changswiche(scope.row)"
                :disabled=scope.row.loading
              > 
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页列表 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="perpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalpage">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { Aticle,xiucomment } from "@/api/article";
export default {
  name: "commentIndex",
  data() {
    return {
      tableData: [],
      totalpage:0,
      perpage:10,
      currentPage2:1        
    };
  },
  created() {
    this.commentList();
  },
  components: {},

  computed: {},

  mounted: {},

  methods: {
    commentList(page=1) {
      Aticle({
        response_type: "comment",
        page,
        per_page:this.perpage
        
      }).then((res) => {
        const { results} =res.data.data;
         results.forEach(res => {
           res.loading=false
         })
         console.log(res)
        this.tableData = res.data.data.results;
        this.totalpage=res.data.data.total_count
      });
    },
    changswiche(status){
     status.loading=true
     xiucomment(status.id.toString(),status.comment_status).then(res => {
     
     })
     status.loading=false
     this.$message({
       message:status.comment_status?'开启评论成功':'关闭评论成功',
       type: 'success'
     })
    },
    handleSizeChange(page) {
     this.perpage=page
     this.commentList(this.currentPage2)
    },
    handleCurrentChange(page){
      this.commentList(page)
    }
  },
};
</script>
<style lang='less' scoped>
</style>