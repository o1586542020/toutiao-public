<!--  -->
<template>
  <div class="image-contairn" @click="dialogVisible=true">
     <img :src="imageso" alt="" class="imagecontent" ref="imgUrl" >
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      append-to-body="true"
    >
    <el-tabs v-model="activeName" @tab-click="handleClick">
       <el-tab-pane label="用户管理" name="first">
            <imglist :imgbooen=flase :isShowAction=flase ref="zero" />
       </el-tab-pane>
       <el-tab-pane label="配置管理" name="second">
          <input type="file" ref="uplodimages" @change="upload">      
          <img :src="imageviews" alt="" :class="imageviews ? 'imageviews':''" >
     </el-tab-pane>   
  </el-tabs>
   <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="uploadfiles">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {uploadimage} from '@/api/image'
import imglist from '@/views/image/component/img-list'
export default {
  data() {
    return {
         dialogVisible: false,
         activeName: 'second',
         imageviews:'',
         imageurl:''
    };
  },

  components: {
     imglist
  },
  props:['imageso'],
  computed: {},

  mounted: {},

  methods: {
    upload() {
      
       const image =this.$refs['uplodimages'].files[0];
       this.imageviews=window.URL.createObjectURL(image)
    },
    uploadfiles() {
         const image =this.$refs['uplodimages'].files[0];
         if(this.activeName=="second") {
            if(!image) {
                this.message('请选择文件')
                return
            }
           
            const fd =new FormData()
            fd.append('image',image)

            uploadimage(fd).then(res => {
              this.$refs['imgUrl'].src=res.data.data.url
              this.$emit('uploadtype',res.data.data.url)
            })
          
            
         }else if (this.activeName=="first") {
           const imagescontent=this.$refs['zero']
           const index =imagescontent.selected
           if(index== null) {
             this.$message('请选择图片')
             return
           }
             this.dialogVisible=false
          this.$refs['imgUrl'].src=imagescontent.images[index].url
           this.$emit('uploadtype',imagescontent.images[index].url)
         }
   
    }
}
  
};
</script>
<style lang='less' scoped>
.image-contairn {
  width: 100px;

  height: 100px;
  border: 1px solid #ccc;
}
.imageviews {
    width: 100px;
    height: 100px;
}
.imagecontent {
  width: 100%;
}
</style>