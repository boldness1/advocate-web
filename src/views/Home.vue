<template>
  <div class="main-content">
    <h1>Istatistikler</h1>

    <div class="d-flex flex-column">
    <div class="d-flex">
      <div class="card card-header w-100">
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between">
            <h5 class=" stat-header"> Bugunki Davalar</h5>
            <div class="d-flex justify-content-center align-items-center">
              <a class="round-count d-flex justify-content-center stat-count" data-toggle="collapse" href="#collapse_stat_today" role="button" aria-expanded="false" aria-controls="collapse_stat_today" v-if="cases.todayCases !== undefined">{{cases.todayCases.length}}</a>

            </div>
          </div>
        </div>
      </div>
    </div>

      <div class="collapse" id="collapse_stat_today">
        <div class="d-flex today-class" >
        <div v-if="cases.todayCases !== undefined && cases.todayCases.length > 0">
          <div class="card mb-4  " v-for="dava in cases.todayCases" :key="dava.id">
            <div class="form-group">
              <div class="d-flex flex-row justify-content-between align-items-center">
                <div class="d-flex flex-row justify-content-start">
                  <span class="p-3"> Dava No: </span>
                  <span class="p-3"> {{ dava.case_no }}</span>
                </div>
                <a class="collapse-btn" data-toggle="collapse" :href="'#collapse' + dava.case_no" role="button" aria-expanded="false" :aria-controls="'collapse' + dava.case_no">
                  <font-awesome-icon icon="arrow-down"/>
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
    </div>

    <div class="d-flex flex-column">
      <div class="d-flex">
        <div class="card card-header w-100">
          <div class="card-body">
            <div class="d-flex flex-row justify-content-between">
              <h5 class=" stat-header">Yaklasan Davalar</h5>
              <div class="d-flex justify-content-center align-items-center ">
                <a class="d-flex justify-content-center round-count stat-count" data-toggle="collapse" href="#collapse_stat_upcoming" role="button" aria-expanded="false" aria-controls="collapse_stat_upcoming" v-if="cases.upcomingCases !== undefined">{{cases.upcomingCases.length}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="collapse" id="collapse_stat_upcoming">
      <div class="d-flex upcoming-class">
        <div v-if="cases.upcomingCases !== undefined && cases.upcomingCases.length > 0">
          <div class="card mb-4  " v-for="dava in cases.upcomingCases" :key="dava.id">
            <div class="form-group">
              <div class="d-flex flex-row justify-content-between align-items-center">
                <div class="d-flex flex-row justify-content-start">
                  <span class="p-3"> Dava No: </span>
                  <span class="p-3"> {{ dava.case_no }}</span>
                </div>
                <a class="collapse-btn" data-toggle="collapse" :href="'#collapse' + dava.case_no" role="button" aria-expanded="false" :aria-controls="'collapse' + dava.case_no">
                  <font-awesome-icon icon="arrow-down"/>
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
    </div>

  </div>
</template>

<script>

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

export default {
  name: 'Home',
  async created() {
    await this.$store.dispatch('updateHome');
    console.log(this.cases.todayCases)
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
  color: green;
  font-weight: bold;
  font-size: 22px;
  margin-left: 20px;
}

.card{
  /*min-width: 480px;*/

}

.card-header{
  background-color: bisque;
}

.collapse-btn{
  margin-right: 15px;
  color: #5c5ee8;
}

.round-count{
  border-radius: 50%;
  background-color: white;
  min-width: 25px;
}

a:hover{
  border: none;
  border-bottom: none;
}


</style>