<script setup>
</script>

<template>
  <div class="home">
    <van-nav-bar title="旅途demo" />
    <div class="banner">
      <img class="banner" src="@/assets/img/home/banner.webp" alt="">
    </div>
    <div class="search-box">
      <div class="item location">
        <span class="position">杭州</span>
        <div class="switch">
          <span>我的位置</span>
          <i class="position-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  .banner {
    width: 100%;
  }
  .search-box {
    .item {
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: #999;
    }
    .location {
      height: 44px;
      .position {
        flex: 1;
        color: #333;
        font-size: 15px;
      }
      .switch {
        width: 77px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .position-icon {
          width: 18px;
          height: 18px;
          background: url("@/assets/img/home/icon_location.png") no-repeat center/18px;
        }
      }
    }
  }
}

</style>