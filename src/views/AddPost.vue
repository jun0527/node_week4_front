<template>
  <div class="wall">
    <div class="titleArea mb-8">
      <h2 class="font-family-azeret">張貼動態</h2>
    </div>
    <form class="addPostForm">
      <label for="content" class="d-block mb-8">
        貼文內容
        <textarea id="content" placeholder="輸入您的貼文內容" v-model="content"></textarea>
      </label>
      <div class="fs-6 text-red-500 text-center" v-if="content === '' &&
      !this.validate.content.status">
        {{ validate.content.message }}
      </div>
      <div class="addImageArea mb-8">
        <label for="image" class="w-100">
          貼文圖片
          <input type="text" id="image" v-model="image" placeholder="輸入您的圖片網址">
        </label>
      </div>
      <div v-if="image !== '' && this.validate.image.status" class="imageArea">
        <img :src="image" alt="貼文照片" @error="photoStatus('error')"
        @load="photoStatus('success')">
      </div>
      <div class="fs-6 text-red-500 text-center" v-else-if="image !== '' &&
      !this.validate.image.status">
        圖片網址錯誤
      </div>
      <div class="buttonArea">
        <button type="button" class="btn-l btn-gray" @click="submit">送出貼文</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import iconAlert from '../assets/js/iconAlert';

export default {
  data() {
    return {
      content: '',
      image: '',
      validate: {
        image: {
          message: '',
          status: true,
        },
        content: {
          message: '',
          status: true,
        },
      },
    };
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {
    image() {
      this.validate.image.message = '';
      this.validate.image.status = true;
    },
    content() {
      if (!this.validate.content.status && this.content !== '') {
        this.validate.content.message = '';
        this.validate.content.status = true;
      }
    },
  },
  methods: {
    photoStatus(status) {
      switch (status) {
        case 'success':
          this.validate.image.message = '';
          this.validate.image.status = true;
          break;
        case 'error':
          this.validate.image.message = '圖片網址錯誤';
          this.validate.image.status = false;
          break;
        default:
          break;
      }
    },
    submit() {
      if (this.content === '') {
        this.validate.content.message = '貼文內容為必填';
        this.validate.content.status = false;
      }
      if (this.content !== '' && this.validate.image.status) {
        const obj = {};
        obj.content = this.content;
        obj.image = this.image;
        const id = '_id';
        obj.user = this.user[id];
        this.$http.post(`${process.env.VUE_APP_URL}posts`, obj)
          .then((res) => {
            if (res.data.status === 'success') {
              iconAlert('動態張貼成功!', 'success');
              this.$router.push('/');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
