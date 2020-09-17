<template>
  <div class="title">
      <div class="content">
          <div class="name">{{name}}</div>
          <div class="more" v-if="show"><a @click.prevent="toggel" href="">{{more}}<i class="el-icon-arrow-right"></i></a></div>
      </div>
  </div>
    <!-- <router-link :to="{ name : 'index' }">
        </router-link> -->
</template>

<script>
export default {
    name:'TitleHeader',
    props:{
        name:{
            type:String,
            default:'名字'
        },
        more:{
            type:String,
            default:'更多'
        },
        path:{
            type:String,
            default:'/home/rtsongs'
        },
        show:{
            type:Boolean,
            default:true,
        }
    },
    methods:{
        toggel(){
            this.$router.push(this.path)
        }
    }
}
</script>

<style scoped>
.title{
    width: 100%;
    display: flex;
    color: #333;
    margin-top: 10px;
}
.content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.name{
    font-size: 19px;
}
.more{
    font-size: 12px;
}
</style>