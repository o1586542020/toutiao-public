<!--  -->
<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <nav-menu :iscollapse="iscollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header @fromChild="getChild" />
      </el-header>
      <el-main class="mian">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from "@/components/navmemu/index";
import Header from "@/components/header/index";
export default {
  data() {
    return {
      iscollapse: true,
    };
  },

  components: {
    NavMenu,
    Header,
  },

  computed: {},

  mounted: {},

  methods: {
    getChild(v) {
      this.iscollapse=v
    },
  },
};
</script>
<style lang='less' scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background: #002033;
}
</style>