<template>
<div @click="closeAllDropdown" @keydown="closeAllDropdown">
  <header class="header">
    <div class="container h-100 d-flex jc-between ai-center">
      <router-link to="/">
        <h1>MetaWall</h1>
      </router-link>
      <div class="d-flex ai-center">
        <div class="userPhotoBox">
          <img :src="user.photo" class="userPhoto" alt="user照片">
        </div>
        <p class="userName">Member</p>
        <div class="line"></div>
      </div>
    </div>
  </header>
  <main class="main container">
    <div class="pageContent">
      <router-view/>
    </div>
    <aside class="sideBar">
      <ul class="menu">
        <li class="mb-12">
          <router-link to="addPost" class="postBtn btn-l btn-primary">
            張貼動態
          </router-link>
        </li>
        <li class="mb-11">
          <a href="javascript:;" class="d-flex ai-center">
            <div class="userPhotoBox photo-l">
              <img :src="user.photo" class="userPhoto" alt="user照片">
            </div>
            <p class="userName">{{ user.name }}</p>
          </a>
        </li>
        <li class="mb-11">
          <a href="javascript:;" class="d-flex ai-center">
            <div class="iconOutline">
              <span class="material-icons-outlined icon">
                notifications
              </span>
            </div>
            <p class="userName">追蹤名單</p>
          </a>
        </li>
        <li>
          <a href="javascript:;" class="d-flex ai-center">
            <div class="iconOutline">
              <span class="material-icons-outlined icon">
                thumb_up_alt
              </span>
            </div>
            <p class="userName">追蹤名單</p>
          </a>
        </li>
      </ul>
    </aside>
  </main>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    closeAllDropdown(e) {
      if (e.type === 'click') {
        this.$store.commit('closeDropdown', 'sort');
      }
    },
  },
  created() {},
};
</script>
