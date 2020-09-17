<template>
  <div class="friends">
    <div class="friend-main">
      <h2>我的朋友</h2>
      <div class="friend-user">
        <div class="friend-box" v-for="item in friends" :key="item.userId">
          <img :src='item.avatarUrl' alt='404' @click="togUser(item.userId)"/>
          <p>{{item.nickname}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserFollows } from "network/login";
export default {
  name: "Friends",
  data() {
    return {
      currentUserInfo:
        window.localStorage.getItem("currentUserInfo") === "null"
          ? null
          : JSON.parse(window.localStorage.getItem("currentUserInfo")),
      friends: [],
    };
  },
  methods: {
    //获取用户的朋友们数据
    getUserFollows(uid) {
      getUserFollows(uid).then((res) => {
        // console.log(res.follow);
        this.friends = res.follow;
      });
    },
    //跳转到用户界面 暂无
    togUser(id){
        console.log(id);
    }
  },
  created() {
    // console.log(this.currentUserInfo.userId);
    //判断是否有用户登录了
    if (this.currentUserInfo) {
      this.getUserFollows(this.currentUserInfo.userId);
    }
  },
};
</script>

<style scoped>
.friends {
  width: 100%;
  max-height: 630px;
  overflow: auto;
  padding-top:30px ;
}
.friend-main {
  width: 90%;
  margin: 0 auto;
}
.friend-main h2{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}
.friend-user {
    margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: start;
  flex-wrap: wrap;
}
.friend-box {
  width: 12%;
  margin-right: 20px;
}
.friend-box img {
  width: 100%;
  border-radius: 50%;
  cursor: pointer;
}
.friend-box p{
    text-align: center;
    margin-top: 15px;
    color: #888;
}
.friend-box p:hover{
    color: #333;
    cursor: default;
}
</style>