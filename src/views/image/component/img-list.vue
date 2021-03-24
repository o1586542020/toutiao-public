<!--  -->
<template>
  <div class="img-content">
    <div class="header">
      <el-radio-group v-model="radio1" @change="jiazaitu()">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="mini" @click="dialogTableVisible = true"
      v-if="imgbooen"
        >上传图片</el-button
      >
      </div>

    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="6"
        :lg="4"
        v-for="(img, index) in images"
        :key="index"
        class="content"
      >
        <el-image style="height: 100px" :src="img.url" fit="cover" @click="selected=index" >
          <div slot="error" class="image-slot">
            <img src="../a.jpg" alt="" style="width: 100%; height: 100%" />
          </div>
        </el-image>
        <div class="gou"  v-if="selected===index&&isShowslected" >

        </div>
        <div class="bottom" v-if="isShowAction">
          <div class="el-icon-delete" @click="imgdelete(img.id)"></div>

          <div
            :class="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            @click="collete(img.id, (img.is_collected = !img.is_collected))"
          ></div>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total_count"
      @current-change="currunt"
      :page-size="pagesize"
      :current-page.sync="page"
    >
    </el-pagination>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
    >
      <el-upload
        class="upload-demo"
        v-if="dialogTableVisible"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        multiple
        :headers="tokens"
        name="image"
        :on-success="uploassuccse"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImage, deleteImage, colleted } from "@/api/file";
export default {
  data() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return {
      images: [],
      radio1: false,
      dialogTableVisible: false,
      tokens: {
        Authorization: `Bearer ${user.token}`,
      },
      current: 0,
      collect: null,
      pagesize: 20,
      total_count: null,
      page: 1,
      selected:false
      
    };
  },
  created() {
    this.jiazaitu(1);
  },
  props:{
    imgbooen:{
      type:Boolean,
      default:false
    },
    isShowAction: {
      type:Boolean,
      default:false
    },
    isShowslected:{
       type:Boolean,
       default:true
    }
  },
  components: {},

  computed: {},

  mounted: {},

  methods: {
    jiazaitu(value = 1) {
      this.page = value;
      getImage({
        collect: this.radio1,
        page: value,
        per_page: this.pagesize,
      }).then((res) => {
        this.images = res.data.data.results;
        this.total_count = res.data.data.total_count;
        console.log(res);
      });
    },
    uploassuccse() {
      this.dialogTableVisible = false;
      this.jiazaitu(this.page);
    },
    currunt(value) {
      this.jiazaitu(value);
    },
    imgdelete(id) {
      this.$confirm("此操作将永久删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteImage(id).then((res) => {
            console.log(res);
          });

          this.$message({
            type: "succuss",
            message: "已删除",
          });
          this.jiazaitu(this.page);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    collete(id, collect) {
      colleted(id, {
        collect,
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.bottom {
  position: absolute;
  left: 5px;
  right: 5px;
  bottom: 4px;
  background-color: rgba(25, 25, 12, 0.3);
  text-align: center;
  display: flex;
  justify-content: center;
}
.content {
  position: relative;
}
.el-icon-star-on {
  color: yellow;
}
.el-icon-star-off {
  color: blue;
}
.gou {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:url(./gou.jpg) no-repeat;
  opacity: 0.6;
  background-size:100% 100%;
  width: 120px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
</style>