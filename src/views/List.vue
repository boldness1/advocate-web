<template>
  <div class="list-content">
    <div class="d-flex search-bar mb-4  justify-content-end">
      <input class="form-control w-25" id="search" placeholder="Ara.." v-model="search">
    </div>
    <div v-if="filteredList !== undefined && filteredList.length > 0">
      <div class="card mb-4" v-for="dava in filteredList" :key="dava.id">
        <div class="form-group">
          <div class="d-flex flex-row justify-content-between align-items-center item-header">
            <div class="d-flex flex-row justify-content-end align-items-center start-items">
              <div class="d-flex flex-row justify-content-start">
                <span class="p-3" style="color: #5c5ee8; font-weight: bold"> Dava No: </span>
                <span class="p-3" style="font-weight: bold"> {{ dava.case_no }}</span>
              </div>

            </div>
            <div class="end-items">
              <a class="collapse-btn" data-toggle="collapse" :href="'#collapse' + dava.id" role="button" aria-expanded="false" :aria-controls="'collapse' + dava.id">
                <font-awesome-icon icon="arrow-down"/>
              </a>
            </div>
          </div>
          <div class="collapse" :id="'collapse' + dava.id">

          <div class="card-body item-body">
            <div class="d-flex flex-row justify-content-start">
              <span class="p-3 input-header"> Bölge: </span>
              <span class="p-3">  {{ dava.location }} </span>
            </div>

            <div class="d-flex flex-row justify-content-start">
              <span class="p-3 input-header"> Davali: </span>
              <span class="p-3"> {{ dava.Defendant.name }}</span>
            </div>

            <div class="d-flex flex-row justify-content-start">
              <span class="p-3 input-header"> Davaci: </span>
              <span class="p-3"> {{ dava.Prosecutor.name }}</span>
            </div>

            <div class="d-flex flex-row justify-content-start">
              <span class="p-3 input-header"> Hukum: </span>
              <span class="p-3"> {{ dava.hukum }}</span>
            </div>

            <div class="d-flex flex-row justify-content-start">
              <span class="p-3 input-header"> Tarih: </span>
              <span class="p-3"> {{ getTime(dava.case_date)}}</span>
            </div>


            <div clas="d-flex flex-row justify-content-end">

              <button class="d-flex justify-content-center w-25 btn" style="background-color: #5c5ee8; margin-right: 30px" @click="redirectDetail(dava.id)">
                Detay
              </button>


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
import moment from "moment";


export default {
  name: "List",
  data() {
    return {
      search: '',
      cases: []
    };
  },
  async created() {
    await this.$store.dispatch('updateList');
    this.cases = this.$store.getters.getCaseList;

  },
  methods:{
    getTime(date){
      if(date !== null)
      return moment(date).format('DD-MM-YYYY - hh:mm')

      return '';
    },
    redirectDetail(id){

      this.$router.push({ name: 'CaseDetail', params: { id: id } })
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filteredList() {
      if (this.cases.length > 0)
        return this.cases.filter(dava => {
          return dava.Defendant.name.toLowerCase().includes(this.search.toLowerCase()) ||
              dava.Prosecutor.name.toLowerCase().includes(this.search.toLowerCase()) ||
              dava.case_no.includes(this.search.toLowerCase());
        })
    },
  },
  components: {FontAwesomeIcon}
}
</script>

<style scoped>

.list-content {
  margin-right: 30px;
}

.collapse-btn{
  margin-right: 30px;
}

.item-body{
  background-color: bisque;
}

.item-header{
  background-color:  #B4A2AE;
}

.form-group{
  margin-bottom: 0!important;
}

.input-header{
  color: #5c5ee8;
}

</style>