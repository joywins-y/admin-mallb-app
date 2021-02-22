<template>
  <div class="search-box">
    <a-form-model layout="inline" :model="searchForm" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item label="检索关键字">
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字"></a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          show-search
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option v-for="cate in data" :key="cate.id" :value="cate.id">
            {{ cate.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit">
          搜索
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  components: {},
  computed: {},
  watch: {},
  created() {
    // api.list().then((res) => {
    //   this.categoryList = res.data;
    // });
  },
  mounted() {},
  methods: {
    // 提交表单触发的函数
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    // 切换类目时触发的函数
    handleChange(val) {
      // console.log(val);
      this.searchForm.category = val;
    },
  },
};
</script>

<style scoped lang="less">
    .search-box{
        padding: 10px 30px;
    }
</style>
