<template>
  <div class="list-content">
    <div class="d-flex search-bar mb-4  justify-content-end">
      <input class="form-control w-25" id="search" placeholder="Ara.." v-model="search">
    </div>
    <div v-if="filteredList !== undefined && filteredList.length > 0">
      <div class="card mb-4  " v-for="dava in filteredList" :key="dava.id">
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

            <div class="d-flex flex-row justify-content-start">
              <span class="p-3"> Hukum: </span>
              <span class="p-3"> {{ dava.hukum }}</span>
            </div>

            <div class="d-flex flex-row justify-content-start">
              <span class="p-3"> Tarih: </span>
              <span class="p-3"> {{ getTime(dava.case_date)}}</span>
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
console.log(moment)

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
      return moment(date).format('DD-MM-YYYY')
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filteredList() {
      if (this.cases.length > 0)
        return this.cases.filter(dava => {
          return dava.Defendant.name.toLowerCase().includes(this.search.toLowerCase()) || dava.Prosecutor.name.toLowerCase().includes(this.search.toLowerCase());
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

</style>