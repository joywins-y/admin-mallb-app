<template>
  <div class="home">
    <left-menu :key="key"></left-menu>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <slider-nav></slider-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftMenu from './components/menu.vue';
import sliderNav from './components/sliderNav.vue';

export default {
  name: '',
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  props: {},
  components: {
    leftMenu,
    sliderNav,
  },
  computed: {},
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  created() {},
  mounted() {},
  methods: {

  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
