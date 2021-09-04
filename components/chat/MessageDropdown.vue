<template>
  <b-dropdown
    position="is-bottom-left"
    append-to-body
    aria-role="menu"
    trap-focus
  >
    <template #trigger>
      <a
        class="navbar-item"
        role="button">
        <span>Message</span>
        <span v-if="loggedInUser.unreadMsgCount > 0"><b-tag rounded class="has-background-danger has-text-white ml-2"> {{loggedInUser.unreadMsgCount}} </b-tag> </span>
      </a>
    </template>


    <b-dropdown-item
      aria-role="menu-item"
      :focusable="false"
      custom
      paddingless>
      <div class="card">
        <div class="card-content">
          <section>
            <b-tabs
              v-model="activeTab"
              position="is-centered"
              type="is-boxed"
              class="block"
              expanded
            >
              <template v-for="tab in tabs">
                <b-tab-item
                  :key="tab.id"
                  :value="tab.id"
                >
                  <template #header>
                    <b-icon :icon="tab.icon"></b-icon>
                    <span> {{tab.label}} <b-tag rounded> {{loggedInUser.unreadMsgCount}} </b-tag> </span>
                  </template>
                  <div class="empty_state">
                    <b-icon :icon="tab.icon"></b-icon>
                    <h3 class="">No posts</h3>
                    <p>There have been no posts in this section yet</p>
                  </div>
                </b-tab-item>

              </template>
            </b-tabs>
          </section>

        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <NuxtLink to="/chat">See all in inbox</NuxtLink>
          </p>
        </footer>
      </div>
    </b-dropdown-item>
  </b-dropdown>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeTab: 'notification',
      multiline: false,
      echo: null,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    baseTabs() {
      return [
        {
          id: 'notification',
          label: 'Notifications',
          content: 'Pictures: Lorem ipsum dolor sit amet.',
          displayed: true,
          icon: 'bell',
        },
        {
          id: 'inbox',
          label: 'Inbox',
          content: 'Music: Lorem ipsum dolor sit amet.',
          displayed: true,
          icon: 'chat',
        },
      ]
    },
    tabs() {
      return [...this.baseTabs]
    },
  },
  mounted() {
    this.listenNotifications()
  },
  methods: {
    listenNotifications() {
      this.$echo.channel(`user.${this.loggedInUser.id}`)
        .listen('.notification', message => {
          console.log(message)
      })
    }
  }
}
</script>

<style lang="scss">
.empty_state{
  position: relative;
  top: -20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .icon{
    margin: auto;
    margin-bottom: 30px;
    font-size: 90px;
    color: #ccc;
  }
  h3{
    margin: 8px 0;
    text-align: center;
    font-weight: normal;
  }
  p{
    font-size: 14px;
    margin: 0;
    color: #999;
    text-align: center;
  }
}
</style>