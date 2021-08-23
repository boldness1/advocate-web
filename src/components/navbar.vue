<template>

  <v-app-bar app  id="app-bar" style="background-color: #5c5ee8">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="auth" style="background-color: bisque"></v-app-bar-nav-icon>
    <v-app-bar-title style="color: gainsboro">AdvocateV</v-app-bar-title>

    <v-icon style="color: bisque">mdi-rocket</v-icon>

    <v-row align-content="end" justify="end">
      <v-list-item style="color: bisque ">

        <v-icon>mdi-home</v-icon>
        <a @click="logout_user" v-if="auth">
          <v-list-item-title >Logout</v-list-item-title>
        </a>


      </v-list-item>
    </v-row>
  </v-app-bar>


  <v-navigation-drawer app style="background-color: #5c5ee8"
                       v-model="drawer"
  >
    <v-list dense >

      <v-list-item style="color: bisque ">


        <v-icon>mdi-account</v-icon>


        <v-list-item-title> <router-link class="route-links" to="/"  >Home</router-link></v-list-item-title>


      </v-list-item>

      <v-list-item style="color: bisque ">


        <v-icon>mdi-account</v-icon>


        <v-list-item-title> <router-link class="route-links" to="/case-form"> Dava ekle</router-link></v-list-item-title>


      </v-list-item>

      <v-list-item style="color: bisque ">

        <v-icon>mdi-home</v-icon>

        <v-list-item-title> <router-link class="route-links" to="/case-list"> Liste </router-link></v-list-item-title>

      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: "navbar",
  data: () => ({
    drawer: false,
    group: null,
    // auth: localStorage.auth,
  }),
  watch: {
    group () {
      this.drawer = false
    },
    // auth(current){
    //    localStorage.auth = current;
    // }
  },
  methods:{
    logout_user(){
      this.$store.commit('logout_user')
      this.$router.push('login')
    }
  },
  computed:{
    auth(){
      return this.$store.getters.auth;
    }
  }
}
</script>

<style scoped>
.route-links{
  color: white
}
</style>