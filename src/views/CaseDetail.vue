<template>
  <div id="case_detail" v-if="caseDetail.Prosecutor !== undefined">
    <div class="card">
      <div class="card-body" style="background-color: #5c5ee8">

        <div class="d-flex justify-content-around align-items-center">
          <div class="font-weight-bold">
          <label for="casenoinp" class="detail-header form-label" style="color: bisque">
            Dava No:
          </label>
            <input id="casenoinp" class="form-control inp-control" type="text" :disabled="modify" v-model="caseDetail.case_no"
                   style="color: bisque">


          </div>

          <div class="font-weight-bold">
            <label for="loceinp"  class="detail-header form-label" style="color: bisque">
              Bolge:
            </label>
            <input id="loceinp" class="form-control inp-control" type="text" :disabled="modify" v-model="caseDetail.location"
                   style="color: bisque">
          </div>

          <div class="detail-header font-weight-bold">
           <label for="dateinp" class="detail-header form-label" style="color: bisque">
             Dava Tarihi:
           </label>
            <input id="dateinp" class="form-control inp-control" type="datetime-local" :disabled="modify" v-model="caseDate" style="color: bisque">
          </div>
        </div>


      </div>
    </div>

    <div class="card">
      <div class="card-body">

        <div class="d-flex justify-content-start">

          <div class="d-flex flex-column w-50 davali-column">
            <div class="d-flex flex-row">
              <span class="davaci-header">Davaci</span>
            </div>


            <div class="mb-3">
              <label for="nameinput" class="form-label">Ad-Soyad</label>
              <input :disabled="modify" class="form-control" id="nameinput" placeholder="Ad-Soyad"
                     v-model="caseDetail.Prosecutor.name">
            </div>

            <div class="mb-3">
              <label for="advocateinp" class="form-label">Avukat</label>
              <input :disabled="modify" class="form-control" id="advocateinp" placeholder="Avukat"
                     v-model="caseDetail.Prosecutor.advocate">
            </div>

            <div class="mb-3">
              <label for="adresinput" class="form-label">Adres</label>
              <textarea :disabled="modify" class="form-control" id="adresinput" rows="3"
                        v-model="caseDetail.Prosecutor.address"></textarea>
            </div>


            <div class="mb-3">
              <label for="mailinp" class="form-label">E-mail</label>
              <input :disabled="modify" type="email" class="form-control" id="mailinp" placeholder="E-mail"
                     v-model="caseDetail.Prosecutor.email">
            </div>

            <div class="mb-3">
              <label for="phoneinp" class="form-label">Telefon</label>
              <input :disabled="modify"   class="form-control" id="phoneinp" placeholder="Telefon" @input="handleNumberInput"
                     v-model="caseDetail.Prosecutor.phone_number">
            </div>

            <div class="d-flex flex-row justify-content-center align-items-center mt-auto">

              <div class="mb-3 w-50 ">
                <button class="form-control btn  adv-btn" @click="setModify">
                  Duzenle
                </button>
              </div>
              <div class="mb-3 w-50 ">
                <button class="form-control btn  adv-btn" @click="updateCase(caseDetail)">
                  Kaydet
                </button>
              </div>
            </div>
          </div>


          <div class="d-flex flex-column w-50">
            <div class="d-flex flex-row davali-header">
              <span class="davali-header">Davali</span>
            </div>

            <div class="mb-3">
              <label for="nameinput2" class="form-label">Ad-Soyad</label>
              <input :disabled="modify" class="form-control" id="nameinput2" placeholder="Ad-Soyad"
                     v-model="caseDetail.Defendant.name">
            </div>

            <div class="mb-3">
              <label for="advocateinp2" class="form-label">Avukat</label>
              <input :disabled="modify" class="form-control" id="advocateinp2" placeholder="Avukat"
                     v-model="caseDetail.Defendant.advocate">
            </div>

            <div class="mb-3">
              <label for="adresinput2" class="form-label">Adres</label>
              <textarea :disabled="modify" class="form-control" id="adresinput2" rows="3"
                        v-model="caseDetail.Defendant.address"></textarea>
            </div>

            <div class="mb-3">
              <label for="mailinp2" class="form-label">E-mail</label>
              <input :disabled="modify" type="email" class="form-control" id="mailinp2" placeholder="E-mail"
                     v-model="caseDetail.Defendant.email">
            </div>

            <div class="mb-3">
              <label for="hukum" class="form-label">Hukum</label>
              <input :disabled="modify" type="email" class="form-control" id="hukum" placeholder="Hukum"
                     v-model="caseDetail.Defendant.hukum">
            </div>

            <div class="mb-3">
              <label for="icra" class="form-label">Icra</label>
              <input :disabled="modify" type="email" class="form-control" id="icra" placeholder="Icra"
                     v-model="caseDetail.Defendant.icra">
            </div>

            <div class="mb-3">
              <label for="taksit_orani" class="form-label">Taksit Orani:</label>
              <input :disabled="modify" type="email" class="form-control" id="taksit_orani" placeholder="Taksit Orani"
                     v-model="caseDetail.Defendant.taksit_orani">
            </div>

            <div class="mb-3">
              <label for="hapislik" class="form-label">Hapislik emri</label>
              <input :disabled="modify" type="email" class="form-control" id="hapislik" placeholder="Hapislik emri"
                     v-model="caseDetail.Defendant.hapislik">
            </div>

            <div class="mb-3">
              <label for="phoneinp2" class="form-label">Telefon</label>
              <input :disabled="modify" type="email" class="form-control" id="phoneinp2" placeholder="Telefon"
                     v-model="caseDetail.Defendant.phone_number">
            </div>
          </div>


        </div>


      </div>
    </div>

  </div>
</template>

<script>
// import moment from "moment";

export default {
  name: "CaseDetail",
  data() {
    return {
      caseId: null,
      modify: true,
      formatted: '',
      case_data: {},
    }
  },
  async created() {

    this.caseId = await this.$route.params.id;
    await this.$store.dispatch('updateCaseDetail', this.caseId)

  },
  methods: {
   async updateCase(caseDetail) {
      await this.$store.dispatch('editCase', caseDetail).then( response =>{
        this.$swal({
          position: 'center',
          icon: 'success',
          title: 'Gunceleme Basarili!',
          showConfirmButton: false,
          timer: 1500
        });
        return response;

      }, error => {
        console.log(error);
      })
    },
    setModify() {
      this.modify = this.modify === false;
    },
    handleNumberInput(){
      if(isNaN(this.caseDetail.Prosecutor.phone_number) ){
        this.caseDetail.Prosecutor.phone_number = this.caseDetail.Prosecutor.phone_number.replace(/[a-zA-Z ]/g, '')
      }
    }

  },
  computed: {
    caseDetail() {
      return this.$store.getters.getCaseDetail
    },
    caseDate() {
      let formatted = null;
      if (this.$store.getters.getCaseDetail.case_date !== undefined) {
        let date = this.$store.getters.getCaseDetail.case_date;
        let splited = date.split(':');
        formatted = splited[0] + ':' + splited[1]
      }
      return formatted;
    }
  },
}
</script>

<style scoped>
.davali-header {
  color: #5c5ee8;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 32px;
}

.davaci-header {
  margin-bottom: 25px;
  color: #5c5ee8;
  font-weight: bold;
  font-size: 32px;
}

.davali-column {
  padding-right: 20px;
}

.adv-btn {
  background-color: blueviolet;
  color: bisque;
}

.inp-control{
  background-color: transparent;
}


</style>