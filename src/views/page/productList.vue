<template>
  <div class='product-list'>
      <!-- 搜索 -->
      <search-box @submit="searchSubmit" :data="categoryList"/>
      <a-button class="product-add-btn">
        <router-link :to="{ name: 'ProductAdd' }">新增商品</router-link>
      </a-button>
      <!-- 列表 -->
      <products-table :data="tableData"
      :page="page" @change="changePage"
      :categoryList="categoryList"
      @edit="editProduct"
      @remove="removeProduct"/>
 </div>
</template>

<script>
import searchBox from '@/components/search.vue';
import productsTable from '@/components/productsTable.vue';
import productApi from '@/api/product';
import categoryApi from '@/api/category';
// import { message } from 'ant-design-vue';

export default {
  name: '',
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 7,
        showSizeChanger: true,
        total: 0,
      },
      categoryObj: {},
    };
  },
  props: {

  },
  components: {
    searchBox,
    productsTable,
  },
  computed: {

  },
  watch: {

  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      // 遍历拿到类目 单独映射
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  mounted() {

  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      productApi.list({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        // console.log(res);
        this.page.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
      });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color: red;">{ `确认要删除的商品为：${record.title}？`}</div>,
        onOk: () => {
          productApi.remove({
            id: record.id,
          }).then(() => {
            this.getTableData();
            // message.success('删除成功');
            this.$message.info('删除成功');
          });
        },
        onCancel: () => {
          // message.info('取消删除');
          this.$message.info('取消删除');
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>

<style scoped lang='less'>
.product-list{
  position: relative;

  .product-add-btn{
    position: absolute;
    top: 14px;
    right: 20px;
  }
}

</style>
