<template>
  <v-app dark>
    <navbar></navbar>
  <v-container fluid>

      <v-main>
        <router-view/>
      </v-main>
    <v-footer app></v-footer>
  </v-container>
  </v-app>
</template>

<script>


import Navbar from "@/components/navbar";
export default {
  components: {Navbar},
}
</script>

<style>
router-link {
  text-decoration: none;
}

#app-bar{
  padding-right: 20px;
}
</style>