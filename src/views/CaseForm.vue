<template>
<h2>Dava Kayit</h2>
  <div class="card">
    <div class="card-body">
    <div class="form-group">

      <div class="d-flex flex-column w-25">
        <div class="mb-3">
          <label for="location" class="form-label">Bolge</label>
          <input   class="form-control" id="location" placeholder="Konum" v-model="case_data.location">
        </div>

        <div class="mb-3">
          <label for="case_no" class="form-label">Dava No:</label>
          <input  class="form-control" id="case_no" placeholder="Dava no:" v-model="case_data.case_no">
        </div>

        <div class="mb-3">
          <label class="form-label" for="case_date">Dava Tarihi:</label>
          <input class="form-control" type="datetime-local" id="case_date" name="case_date" v-model="case_data.case_date">
        </div>
      </div>


      <div class="d-flex ">
        <div class="d-flex flex-column w-50 davali-column">
          <div class="d-flex flex-row">
            <span class="davaci-header">Davaci</span>
          </div>


          <div class="mb-3">
            <label for="nameinput" class="form-label">Ad-Soyad</label>
            <input   class="form-control" id="nameinput" placeholder="Ad-Soyad" v-model="case_data.prosecutor.name">
          </div>

          <div class="mb-3">
            <label for="advocateinp" class="form-label">Avukat</label>
            <input  class="form-control" id="advocateinp" placeholder="Avukat" v-model="case_data.prosecutor.advocate">
          </div>

          <div class="mb-3">
            <label for="adresinput" class="form-label">Adres</label>
            <textarea class="form-control" id="adresinput" rows="3" v-model="case_data.prosecutor.address"></textarea>
          </div>


        <div class="mb-3">
          <label for="mailinp" class="form-label">E-mail</label>
          <input type="email" class="form-control" id="mailinp" placeholder="E-mail" v-model="case_data.prosecutor.email">
        </div>

        <div class="mb-3">
          <label for="phoneinp" class="form-label">Telefon</label>
          <input type="email" class="form-control" id="phoneinp" placeholder="Telefon" v-model="case_data.prosecutor.phone_number">
        </div>

          <div class="d-flex flex-row justify-content-center align-items-center mt-auto">

            <div class="mb-3 w-50 ">
              <button class="form-control btn btn-primary" @click="saveCase">
                Kaydet
              </button>
            </div>
          </div>
        </div>



        <div class="d-flex flex-column w-50">
          <div class="d-flex flex-row davali-header" >
            <span class="davali-header">Davali</span>
          </div>

          <div class="mb-3">
            <label for="nameinput2" class="form-label">Ad-Soyad</label>
            <input   class="form-control" id="nameinput2" placeholder="Ad-Soyad" v-model="case_data.defendant.name">
          </div>

          <div class="mb-3">
            <label for="advocateinp2" class="form-label">Avukat</label>
            <input  class="form-control" id="advocateinp2" placeholder="Avukat" v-model="case_data.defendant.advocate">
          </div>

          <div class="mb-3">
            <label for="adresinput2" class="form-label">Adres</label>
            <textarea class="form-control" id="adresinput2" rows="3" v-model="case_data.defendant.address"></textarea>
          </div>

          <div class="mb-3">
            <label for="mailinp2" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="mailinp2" placeholder="E-mail" v-model="case_data.defendant.email">
          </div>

          <div class="mb-3">
            <label for="hukum" class="form-label">Hukum</label>
            <input type="email" class="form-control" id="hukum" placeholder="Hukum" v-model="case_data.defendant.hukum">
          </div>

          <div class="mb-3">
            <label for="icra" class="form-label">Icra</label>
            <input type="email" class="form-control" id="icra" placeholder="Icra" v-model="case_data.defendant.icra">
          </div>

          <div class="mb-3">
            <label for="taksit_orani" class="form-label">Taksit Orani:</label>
            <input type="email" class="form-control" id="taksit_orani" placeholder="Taksit Orani" v-model="case_data.defendant.taksit_orani">
          </div>

          <div class="mb-3">
            <label for="hapislik" class="form-label">Hapislik emri</label>
            <input type="email" class="form-control" id="hapislik" placeholder="Hapislik emri" v-model="case_data.defendant.hapislik">
          </div>

          <div class="mb-3">
            <label for="phoneinp2" class="form-label">Telefon</label>
            <input type="email" class="form-control" id="phoneinp2" placeholder="Telefon" v-model="case_data.defendant.phone_number">
          </div>
        </div>

      </div>




    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CaseForm",
  data(){
    return {
      case_data:{
        case_date:'',
        case_no: '',
        location:'',
        defendant:{
          name:'',
          email:'',
          advocate:'',
          phone_number:'',
          address:'',
          icra:'',
          hukum:'',
          hapislik:'',
          taksit_orani:'',

        },
        prosecutor:{
          name:'',
          email:'',
          advocate:'',
          phone_number:'',
          address:'',
        }
      },
      date: new Date,
      selectedDate: '',

    };
  },
  methods:{
    saveCase(){
      if (this.isFormValid){
        this.$store.dispatch('saveCase', this.case_data)
            .then( response =>{
              this.$store.dispatch('updateHome')
              // this.$store.dispatch('updateList')
              this.$swal({
                position: 'center',
                icon: 'success',
                title: 'Kayit Basarili!',
                showConfirmButton: false,
                timer: 1500
              });
             return response;

            }, error => {
              console.log(error);
            })
      }else{
        this.$swal({
          position: 'center',
              icon: 'error',
            title: 'Gerekli Alanlari Doldurunuz, En az bir davali,davaci adi, ve dava numarasi girilmelidir!',
            showConfirmButton: true,
            timer: 2500
        });
      }

    },
    clearForm(){
      this.case_data = {
        case_date:'',
        case_no: '',
        location:'',
        defendant:{
          name:'',
          email:'',
          advocate:'',
          phone_number:'',
          address:'',
          icra:'',
          hukum:'',
          hapislik:'',
          taksit_orani:'',

        },
        prosecutor:{
          name:'',
          email:'',
          advocate:'',
          phone_number:'',
          address:'',
        }
      };

      this.selectedDate = ''
    },
  },
  computed:{
    isFormValid(){
      return this.case_data.case_no !== '' && this.case_data.defendant.name !== '' && this.case_data.prosecutor.name !== '';
    },
  }
}
</script>

<style scoped>
.davali-header{
  color: #5c5ee8;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 32px;
}

.davaci-header{
  margin-bottom: 25px;
  color: #5c5ee8;
  font-weight: bold;
  font-size: 32px;
}

.davali-column{
  padding-right: 20px;
}
</style>