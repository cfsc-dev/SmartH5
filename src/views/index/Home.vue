<template>
  <div class="home">
    	<div class="menu" @click="$router.push('/news')">最新动态</div>
        <div class="menu" @click="$router.push('/visitor')">访客邀约</div>
  </div>
</template>
<script>

export default {
}
</script>
<style lang="stylus" scoped>
.home{
    font-size .2rem;
    padding 40px;
    .menu{
        margin: 10px 0;
    }
}
</style>
