<template>
    <main class="wrapper-edata wrapper-edataMenu bg-branco paddingMainDefault comModal">
      <div class="bar-tit1 bar-tit-header wrapper-margin-min">
        <a class="bth bt-voltar" href="javascript:history.back();"></a>
        <h2 class="tit1">Editar Cliente</h2>
      </div>
  
      <section class="padT12 wrapper-margin">
        <h2 class="tit2">Edite um registro de cliente</h2>
        <div class="formEdata1">
          <form>
            <fieldset>
              <label>Nome</label>
              <input v-model="name"
                      type="text"
                      autocomplete="off"
                      :is-valid="nameValid">
            </fieldset>
            <fieldset>
              <label>Sobrenome</label>
              <input v-model="lastName"
                      type="text"
                      autocomplete="off"
                      :is-valid="lastNameValid">
            </fieldset>
            <fieldset>
              <label>Email</label>
              <input v-model.trim="email"
                      type="text"
                      autocomplete="off"
                      :is-valid="emailValid">
            </fieldset>
            <fieldset>
              <label>CPF</label>
              <input 
                v-model="cpf"
                type="text"
                autocomplete="off"
                :is-valid="cpfValid">
            </fieldset>
            <fieldset class="focused">
              <label>Data de Nascimento</label>
              <input v-model="birthDate"
                  type="date"
                  :is-valid="birthDateValid">
            </fieldset>
            <fieldset>
              <a  type="button" class="btAdd1 flexCenterCenter" @click="updateClient()">Salvar</a>
            </fieldset>
          </form>
        </div>
      </section>
      <BitzarModal
        :showModal="showModal"
        :message="message"
        :apiResult="messageError"
        :title="'Erro'"
        :closeFunction="() => { closeModal(); }"
      />
    </main>
  </template>
  
  <script>
  import clientService from "../../../services/client.service";
  import userService from "../../../helpers/user.service";
  import BitzarModal from "../../BitzarModal/BitzarModal.vue";
  import helperService from "../../../helpers/helper.service";
  import store from "../../../store";
  import {inputs} from "../../../assets/js/main"
  
  require("../../../theme/reset.css");
  require("../../../theme/ui-elements.css");
  require("../../../theme/ui-fonts.css");
  require("../../../theme/ui-colors.css");
  require("../../../theme/ui-interface.css");
  require("../../../theme/fonts.google.css");
  
  export default {
    data() {
      return {
        client: null,
        clientId: null,
        name: '',
        lastName: '',
        cpf: '',
        email: '',
        birthDate: '',
        message: '',     
        errors: [],
        nameValid: false,
        lastNameValid: false,
        birthDateValid: false, 
        cpfValid: false,
        emailValid: false,
        messageError: null,
        showModal: false,
        isMobile: false,
        loadTime: false,
        invalid: false
      };
    },
    name: "editClient",
    components: {
      BitzarModal
    },
    methods: {
      async getClientById() {
        try {
            let client;
            client = await clientService.getClientById(this.clientId);
            this.client = client.Data;
        } catch (e) {
            store.commit("addToaster", {
            text: e.message,
            type: "error",
            });
        }
      },
      async setDados(){
        this.name = this.client.name;
        this.lastName = this.client.lastName;
        this.cpf = this.client.cpf;
        this.email = this.client.email;
        this.birthDate = this.client.birthDate.replace("T00:00:00", "");
        $('input,select').parents('fieldset').addClass('focused');
      },
      async updateClient() {
        try {
          this.loadTime = true;
          if(!this.validarCampos()){
            const result = await clientService.updateClient(this.clientId, this.name, this.lastName, this.cpf, this.email,
              this.birthDate);
            if(result.Success){
                store.commit("addToaster", {
                    text: "Cadastrado com Sucesso.",
                    type: "success",
                  });
                
                this.$router.push("/clientes");
            }else{
              this.showModal = true;
              this.messageError = result;
            }
          }
        } catch (e) {
          store.commit("addToaster", {
            text: "Um erro ocorreu ao cadastrar o cliente, entre em contato com o suporte.",
            type: "error",
          });
        } finally {
          this.loadTime = false;
        }
      },
      validarCampos() {
          this.invalid = false;
  
          if(!this.nameValid){
            this.errors = [];
            this.invalid = true;
            this.message = "Nome é obrigatório";
            this.showModal = true;
            this.nameValid = false;
            this.errors.push({ message: "Esse campo é requerido!" });
            return true;                    
          }
  
          if(!this.lastNameValid){
            this.errors = [];
            this.invalid = true;
            this.message = "Sobrenome é obrigatório";
            this.showModal = true;
            this.lastNameValid = false;
            this.errors.push({ message: "Esse campo é requerido!" });
            return true;                    
          }
  
          if(!this.cpfValid){
            this.errors = [];
            this.invalid = true;
            this.showModal = true;
            this.message = "CPF inválido";
            this.cpfValid = false;
            this.errors.push({ message: "Esse campo é requerido!" });
            return true;                    
          }
  
          if(!this.birthDate){
            this.errors = [];
            this.invalid = true;
            this.showModal = true;
            this.message = "Data de Nascimento é obrigatório";
            this.birthDateValid = false;
            this.errors.push({ message: "Esse campo é requerido!" });
            return true;                    
          }
  
          if(!this.emailValid){
            this.errors = [];
            this.invalid = true;
            this.showModal = true;
            this.message = "Email é obrigatório";
            this.emailValid = false;
            this.errors.push({ message: "Esse campo é requerido!" });
            return true;                    
          }
  
          return this.invalid;
      },
      async closeModal() {
        this.showModal = false;
      },
    },
    async mounted() {
      if(!userService.isAuthenticated()) {
        this.$router.push("/autenticacao/login");
      }else{
        this.loadTime = true;
        inputs();
        this.clientId = this.$route.params.id;
        await this.getClientById();
        this.setDados();
        this.isMobile = helperService.isResponsive();
        this.loadTime = false;
      }
    },
    watch: {
      name() {
        if (this.name.length > 3 ) this.nameValid = true;
        else this.nameValid = false;
      },
      lastName() {
        if (this.lastName.length > 3 ) this.lastNameValid = true;
        else this.lastNameValid = false;
      },
      cpf() {
        if (helperService.validarCPFExistente(this.cpf))
          this.cpfValid = true;
        else 
          this.cpfValid = false;
      },
      birthDate() {
        if (this.birthDate != null)
          this.birthDateValid = true;
        else 
          this.birthDateValid = false;
      },
      email() {
        if (helperService.validateMail(this.email))
          this.emailValid = true;
        else 
          this.emailValid = false;
      }
    },
  };
  </script>
  