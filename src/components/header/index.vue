<template>
  <div class="header-container">
    <div>
      <i class="el-icon-s-fold" @click="toParent"></i>
      <span>中华一番</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar" :src="photo" alt="" />
        <span>{{ name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item @click.native="cancer">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import globalBus from '@/utils/globelBus'
export default {
  name: "AppHeader",
  components: {},
  props: {},
  data() {
    return {
      name: "",
      photo: "",
      iscollapse: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    getUserProfile().then((res) => {
      this.name = res.data.data.name;
      this.photo = res.data.data.photo;
    });
    globalBus.$on('zhi',(data) => {
         this.name=data.name
         this.photo=data.photo
    })
  },
  mounted() {},
  methods: {
    toParent() {
      this.$emit("fromChild", (this.iscollapse = !this.iscollapse));
    },
    cancer() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.removeItem('user')
          this.$router.push('login')
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>