<!--  -->
<template>
  <div class="publish-contarin">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/">{{
              $route.query.id ? "修改文章" : "发表文章"
            }}</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="60px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" :rules="content">
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh"
            height="350"
          />
        </el-form-item>
        <el-form-item label="封面  ">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">一图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type>0">
            <div  class="img-content" >
              <uploadimgae 
                 v-for="(cover, index) in article.cover.type" 
                 :key="index"
                 @uploadtype="uploadqwe(index,$event)"
                 :imageso=article.cover.images[index]
                  />
            </div>
           
          </template>
       
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option
              v-for="(item, index) in channel"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fabiao(false)">发表</el-button>
          <el-button @click="fabiao(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getpindao, addArticle, oneArticle, xiuArticle } from "@/api/article";
import { uploadImage} from "@/api/file";
import uploadimgae from "./conponents/uplod-image"

import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
} from "element-tiptap";
import "element-tiptap/lib/index.css";

export default {
  name: "publishIndex",
  data() {
    return {
      article: {
        title: "",
        content: "",
        cover: {
          type: 1,
          images: [],
        },
        channel_id: null,
      },
      channel: null,
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          uploadRequest(file) {
            const fd = new FormData();
            fd.append("image", file);
            return uploadImage(fd).then((res) => {
              return res.data.data.url;
            });
          },
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
      ],
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 3,  message: "长度应大于5", trigger: "blur" },
        ],
        content: [
          {
            validator(rule, value, callback) {
              if (value === "<p></p>") {
                callback(new Error("请输入文章内容"));
              } else {
                callback();
              }
            },
          },
        ],
      },
    };
  },
  created() {
    this.getarticle();
    if (this.$route.query.id) {
      this.xiugai();
    }
  },
  components: {
    "el-tiptap": ElementTiptap,
     uploadimgae
  },

  computed: {},

  mounted: {},

  methods: {
    getarticle() {
      console.log("我是");
      getpindao().then((res) => {
        this.channel = res.data.data.channels;
      });
    },
    fabiao(draft) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const articleid = this.$route.query.id;
          if (!articleid) {
            addArticle(this.article, draft).then((res) => {
              this.$message({
                message: `${draft ? "存入草稿" : "发布"}成功`,
                type: "success",
              });
            });
            this.$router.push("/article");
          } else {
            xiuArticle(articleid, this.article, draft).then((res) => {
              this.$message({
                message: `${draft ? "存入草稿" : "发布"}成功`,
                type: "success",
              });
            });
            this.$router.go(-1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    xiugai() {
      const articleid = this.$route.query.id;
      oneArticle(articleid).then((res) => {
        this.article = res.data.data;
      });
    },
    uploadqwe(index,img) {
      this.article.cover.images[index]=img
    }
  },
};
</script>
<style lang='less' scoped>
.img-content {
  width: 500px;
  display: flex;
  justify-content: space-between;
}
</style>