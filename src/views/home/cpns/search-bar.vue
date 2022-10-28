<script setup>
  import useDate from '@/hooks/useDate';

  const { startDateStr, endDateStr } = useDate('MM.DD')

</script>

<template>
  <div class="search-bar">
    <div class="search-inner">
      <div class="select-date">
        <div class="start-date">
          <span class="name">住</span>
          <span class="date">{{ startDateStr }}</span>
        </div>
        <div class="end-date">
          <span class="name">离</span>
          <span class="date">{{ endDateStr }}</span>
        </div>
      </div>
      <div class="content">关键字/位置/民宿</div>
      <div class="right">
        <i class="search-icon"></i>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 16px 16px 10px 16px;
    .search-inner {
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      line-height: 45px;
      padding: 0 10px;
      border-radius: 6px;
      color: #999;
      .select-date {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        
        .start-date, .end-date {
          line-height: normal;
          .date {
            margin: 0 10px 0 5px;
            color: #333;
          }
        }
        .end-date {
          .date {
            position: relative;
            &::after {
              content: "";
              position: absolute;
              rotate: 45deg;
              bottom: 0px;
              right: -12px;
              border-radius: 4px;
              border: 4px solid #333;
              border-right-color: rgba(0, 0, 0, 0);
              border-top-color: rgba(0, 0, 0, 0);
              border-bottom-color: rgba(0, 0, 0, 0);
            }
          }
          }
      }
      .content {
        border-left: 1px solid #fff;
        padding: 0 10px;
        flex: 1;
      }
      .right {
        display: flex;
        align-items: center;
        .search-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          background: url("@/assets/img/home/home-sprite.png") -29px -151px/207px 192px;
        }
      }
    }
  }
</style>