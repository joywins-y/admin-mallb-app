<template>
  <div class="sale-detail">
    <a-form-model ref="ruleForm" :model="form" :rules="rules"
    :label-col="{span: 5}"
    :wrapper-col="{span: 13}">
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price"></a-input>
      </a-form-model-item>

<a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="form.price_off"></a-input>
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory" required>
        <a-input v-model="form.inventory"></a-input>
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit"></a-input>
      </a-form-model-item>
      <a-form-model-item label="商品图片" prop="images">
        <a-upload :action="'http://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.user.appkey"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
        name="avatar">
          <div v-if="fileList.length < 8">
            <a-icon :type="loading ? 'loading' : 'plus'"></a-icon>
            <div class="ant-upload-text">Upload</div>
          </div>
          <a-model :visible="previewVisible" :footer="null"
          @cancel="handleCancel">
            <img src="previewImage" alt="example" style="width: 100%">
          </a-model>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label class="next-btn" :wrapper-col="{span: 24}">
        <a-button type="default" @click="prev">
          上一步
        </a-button>
        <a-button type="primary" @click="next">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      rules: {},
      fileList: [],
      loading: false,
      previewVisible: false,
      previewImage: '',
    };
  },
  props: ['form'],
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    // 图片预览
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.orginFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
    // handleChange({ file, fileList, event }) {
    //   console.log(file, fileList, event);
    //   // 状态为done 表示成功
    //   if (file.status === 'done') {
    //     this.form.images.push(file.response.data.url);
    //   } else if (file.status === 'removed') {
    //     // 移除
    //     const { url } = file.response.data;
    //     this.form.images = this.form.images.filter((item) => item !== url);
    //   }
    //   this.fileList = fileList;
    // },
    // 提交
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    // 上一步
    prev() {
      this.$emit('prev');
    },
  },
};
</script>

<style>

</style>
