<template>
  <div class="titlebox">
    <span>{{name}}:</span>
    <div class="title-row" v-for="(item,index) in titles" :key="index">
      <span
        style="cursor: pointer;padding:5px 3px;display: inline-block;borderRadius:3px"
        :class="[curIndex === index ? 'active' : '']"
        @click="changeOne(item,index)"
      >{{item}}</span>
      <i style="paddingLeft:8px;color:#666;">{{index === titles.length-1 ? '' : "|"}}</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleBox",
  props: {
    name: {
      type: String,
      default: "语种",
    },
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      curIndex: 0,
    };
  },
  methods: {
    changeOne(name, i) {
    //   console.log(name, i);
      this.curIndex = i;
      //告诉父组件切换了
      this.$emit('changeClass',name,this.name)
    },
  },
};
</script>

<style scoped>
.titlebox{
    margin-top: 20px;
}
.titlebox span {
  margin: 0 8px;
  line-height: 1.5;
}
.titlebox span.active {
  background: #bf9096;
  color: #f5f5f5;
}
.title-row {
  display: inline-block;
}
</style>