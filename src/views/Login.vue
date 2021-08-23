<template>

    <v-container>

        <div class="d-flex justify-content-center align-items-center">

        <div class="d-flex flex-column login-container">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="username">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
          </div>

          <button @click="login_user"  class="btn btn-save">Giris Yap</button>
        </div>

        </div>


    </v-container>

</template>

<script>

// import apiService from '../apiService';

import apiService from "@/apiService";

export default {
  name: "Login",
  methods:{
    async login_user(){
      let login_info = {
        email: this.username,
        password: this.password,
        expoToken: this.expoToken,
      }

      await this.$store.dispatch('loginUser', login_info).then( response => {
        if (response.data.success && response.data.access_token ) {
          this.$swal('Giris basarili!!!');
          this.$store.commit('loginUser', response.data)
          apiService.setHeader(response.data.access_token)
          this.$router.push('/');
        } else {
          // this.$store.commit('logout_user')
          this.$swal('Kullanici BIlgileri Hatali!');
        }
      })
    },
  },

  data(){
    return{
      username: null,
      password: null
    }
  },


}
</script>

<style scoped>
.btn-save{
  background-color: #5c5ee8;
  color: white;
  margin-top: 50px;
}

.login-container{
  margin-top: 50px;
}
</style>