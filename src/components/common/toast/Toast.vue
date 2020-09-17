<template>
  <div id="toast" v-show="isShow">
      <span>{{message}}</span>
  </div>
</template>

<script>
export default {
    name:'Toast',
    data(){
        return{
            message:'当前内容为空!',
            isShow:false
            }
        },
    methods:{
        show(message,time=1000){
            this.isShow = true;
            this.message = message;
            setTimeout(() => {
                this.isShow = false;
                this.message = '';
            },time)
        }
    }
    }

</script>

<style scoped>
 #toast{
     position: fixed;
     left: 50%;
     top: 50%;
     transform: translate(-50%,-50%);
     z-index: 9999;
     padding: 10px;
     background: rgba(0, 0, 0, 0.75);
 }
  #toast span{
      color: white;
  }
</style>