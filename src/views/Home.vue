<template>
  <div>
    <h1>Istatistikler</h1>

    <div class="d-flex justify-content-start">


        <div class="card mr-3">
          <div class="card-body">
            <div class="d-flex flex-row justify-content-between">
              <h5 class=" stat-header"> Bugunki Davalar</h5>
              <span class="stat-count" v-if="cases.todayCases !== undefined">{{cases.todayCases.length}}</span>
            </div>
          </div>
        </div>


        <div class="card ml-3">
          <div class="card-body">
            <div class="d-flex flex-row justify-content-between">
            <h5 class=" stat-header">Yaklasan Davalar</h5>
            <span class="stat-count" v-if="cases.upcomingCases !== undefined">{{cases.upcomingCases.length}} dava</span>
          </div>
          </div>
        </div>

      <div v-if="cases !== undefined && cases.length > 0">
        <div class="card mb-4  " v-for="dava in cases" :key="dava.id">
          <div class="form-group">
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div class="d-flex flex-row justify-content-start">
                <span class="p-3"> Dava No: </span>
                <span class="p-3"> {{ dava.case_no }}</span>
              </div>
              <a class="collapse-btn" data-toggle="collapse" :href="'#collapse' + dava.case_no" role="button" aria-expanded="false" :aria-controls="'collapse' + dava.case_no">
                <font-awesome-icon icon="user-secret"/>
              </a>
            </div>
            <div class="collapse" :id="'collapse' + dava.case_no">
              <hr>
              <div class="card-body">
                <div class="d-flex flex-row justify-content-start">
                  <span class="p-3"> Bölge: </span>
                  <span class="p-3">  {{ dava.location }} </span>
                </div>

                <div class="d-flex flex-row justify-content-start">
                  <span class="p-3"> Davali: </span>
                  <span class="p-3"> {{ dava.Defendant.name }}</span>
                </div>

                <div class="d-flex flex-row justify-content-start">
                  <span class="p-3"> Davaci: </span>
                  <span class="p-3"> {{ dava.Prosecutor.name }}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>




    </div>
  </div>
</template>

<script>

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

export default {
  name: 'Home',
  async created() {
    await this.$store.dispatch('updateHome');
  },
  computed: {
    cases() {
      return this.$store.getters.getHomePage;
    }
  },
  components: {FontAwesomeIcon},

};
</script>

<style>
.stat-header{
  color: #8d96ac;
}

.stat-count{
  color: #5c5ee8;
  font-weight: bold;
  font-size: 18px;
  margin-left: 20px;
}
</style>