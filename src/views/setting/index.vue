<!--  -->
<template>
  <div class="setting-contarin">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">个人设置</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-col :span="15">
          <el-form ref="form" :model="user" label-width="70px">
            <el-form-item label="账号">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="密码">
              {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :offset="2">
          <label for="file">
            <el-avatar
              shape="square"
              :size="180"
              :fit="fill"
              :src="user.photo"
            ></el-avatar>
            <p>点击更换头像</p>
          </label>
          <input
            type="file"
            id="file"
            ref="file"
            hidden
            @change="changtupian"
          />
        </el-col>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          append-to-body
          @opened="changeimg"
   
          @closed="changgeimged"
        >
          <div class="preimg"></div>
          <img :src="previewimg" alt="" ref="previeimg" class="previeimg" />
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="forgotimg">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile,changePhoto,changeuserInfo } from "@/api/user";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import globalBus from '@/utils/globelBus'
export default {
  name: "setting",
  data() {
    return {
      user: {},
      dialogVisible: false,
      previewimg: "",
      cropper: null,
    };
  },
  created() {
    this.getueser();
   
  },
  components: {},

  computed: {},

  mounted: {},

  methods: {
    onSubmit() {
      const {name,intro,email} =this.user
      changeuserInfo({
        name,
        intro,
        email
      }).then(res => {
        console.log(res)
      })
     globalBus.$emit('zhi',this.user)
    },
    getueser() {
      getUserProfile().then((res) => {
        this.user = res.data.data;
      });
    },
    changtupian() {
      this.dialogVisible = true;
      const imgfile = this.$refs.file;
      const blodata = window.URL.createObjectURL(imgfile.files[0]);
      this.previewimg = blodata;
      this.$refs["file"].value = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    changeimg() {
      const image = this.$refs["previeimg"];
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        crop: function (e) {
          // Output the result data for cropping image.
          viewMode: 1;
        },
      });
    },
    changgeimged() {
      this.cropper.destroy();
    },
    forgotimg() {
      this.cropper.getCroppedCanvas().toBlob(file =>{
        const fd =new FormData()
        fd.append('photo',file)
        changePhoto(fd).then(res => {
           this.dialogVisible=false
           this.user.photo=window.URL.createObjectURL(file)
          globalBus.$emit('zhi',this.user)
        })
      }   
      
      );
    },
  },
};
</script>
<style lang='less' scoped>
.preimg {
  .previeimg {
  
    display: block;
    max-width: 100%; /* This rule is very important, please do not ignore this! */
  }
}
</style>