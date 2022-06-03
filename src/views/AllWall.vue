<template>
<div class="wall">
  <article class="w-100 d-flex mb-8">
    <div class="selectArea">
      <button type="button" class="selectBtn" @click.stop="openDropdown('sort')">
        {{ sortStatus === 'dec' ? '最新貼文' : '最舊貼文' }}
        <span class="material-icons-outlined">
          expand_more
        </span>
      </button>
      <ul class="dropdownList" v-if="dropdown.sort">
        <li>
          <button type="button" @click="changeSort('dec')" class="w-100 h-100">最新貼文</button>
        </li>
        <li>
          <button type="button" @click="changeSort('asc')" class="w-100 h-100">最舊貼文</button>
        </li>
      </ul>
    </div>
    <div class="searchArea">
      <label for="search">
        <input type="text" v-model="searchInput" placeholder="搜尋貼文" @keydown="searchEnter">
      </label>
      <button type="button" class="deleteBtn" v-if="searchInput !== ''" @click="deleteSearch">
        <span class="material-icons-outlined">
          close
        </span>
      </button>
      <button type="button" class="searchBtn btn-primary" @click="searchPosts()">
        <span class="text-white material-icons-outlined">
          search
        </span>
      </button>
    </div>
  </article>
  <article class="postsWall">
    <div class="postsItem" v-if="postsData.length === 0">
      <div class="wallHeader">
        <span class="circle bg-red-600"></span>
        <span class="circle bg-yellow"></span>
        <span class="circle bg-green"></span>
      </div>
      <div class="noPosts">
        <p class="text-gray-500" v-if="searchTxt === ''">目前尚無動態，新增一則貼文吧！</p>
        <p class="text-gray-500" v-else>沒有與「{{ searchTxt }}」相關的貼文</p>
      </div>
    </div>
    <ul class="postsList" v-else>
      <li class="postsItem mb-8" v-for="item in postsData" :key="item.id">
        <a href="javascript:;" class="d-flex ai-center mb-8">
          <div class="userPhotoBox photo-m">
            <img :src="item.user.photo" class="userPhoto" alt="user照片">
          </div>
          <div>
            <p class="userName">{{ item.user.name }}</p>
            <p class="fs-6 text-gray-500 fw-400">
              {{ getDateTxt(item.createdAt) }}
            </p>
          </div>
        </a>
        <p class="postContent mb-8">{{ item.content }}</p>
        <div class="postImageBox" v-if="item.image !== ''">
          <img :src="item.image" class="postImage" alt="貼文圖片">
        </div>
      </li>
    </ul>
  </article>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      sortStatus: 'dec',
      searchInput: '',
      searchTxt: '',
      postsData: [],
    };
  },
  computed: {
    ...mapState(['dropdown']),
  },
  watch: {
    sortStatus() {
      this.searchInput = this.searchTxt;
      this.getPostData(this.searchTxt);
    },
  },
  methods: {
    getPostData(search = '') {
      this.$http.get(`${process.env.VUE_APP_URL}posts?q=${search}&timeSort=${this.sortStatus}`)
        .then((res) => {
          this.postsData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDropdown(dropdownName) {
      if (this.dropdown.sort) {
        this.$store.commit('closeDropdown', dropdownName);
      } else {
        this.$store.commit('openDropdown', dropdownName);
      }
    },
    changeSort(status) {
      this.sortStatus = status;
    },
    getDateTxt(date) {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = `${newDate.getMonth() < 10 ? '0' : ''}${newDate.getMonth()}`;
      const day = `${newDate.getDate() < 10 ? '0' : ''}${newDate.getDate()}`;
      const hr = `${newDate.getHours() < 10 ? '0' : ''}${newDate.getHours()}`;
      const min = `${newDate.getMinutes() < 10 ? '0' : ''}${newDate.getMinutes()}`;
      const dateTxt = `${year}/${month}/${day} ${hr}:${min}`;
      return dateTxt;
    },
    searchEnter(e) {
      if (e.keyCode === 13) {
        this.searchPosts();
      }
    },
    searchPosts() {
      this.searchTxt = this.searchInput;
      this.getPostData(this.searchTxt);
    },
    deleteSearch() {
      this.searchTxt = '';
      this.searchInput = '';
      this.getPostData();
    },
  },
  created() {
    this.getPostData();
  },
};
</script>
