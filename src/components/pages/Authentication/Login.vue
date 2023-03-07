<template>
  <main class="wrapper-edata FullHeight bg-brand1 login">
    <BitzarLoading :isLoading="isLoading" />
    <div class="wrapper-boxlogin flexXYCenter wrapper-margin">
      <div class="box-login">
        <div class="logo">
          <img src="../../../assets/img/white-logo.png">
        </div>
        <div class="formEdata1 formEdataLogin">
          <form>
            <fieldset>
              <label>E-mail</label>
              <input autocomplete="username email"
                    v-model.trim="email"
                    v-on:keydown.13="keyValidade" type="text">
            </fieldset>
            <fieldset>
              <label>Senha</label>
              <input type="password"
                    autocomplete="curent-password"
                    v-model="password"
                    v-on:keydown.13="keyValidade">
            </fieldset>
            <fieldset>
              <button type="button" class="bt1 bt-login" @click="Login()">Entrar</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>

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
import { mapState } from "vuex";
import store from "../../../store";
import AuthenticationService from "../../../services/authentication.service";
import BitzarLoading from "../../BitzarLoading/SplashScreen.vue";
import BitzarModal from "../../BitzarModal/BitzarModal.vue";
import {inputs} from "../../../assets/js/main"
require("../../../theme/reset.css");
require("../../../theme/ui-elements.css");
require("../../../theme/ui-fonts.css");
require("../../../theme/ui-colors.css");
require("../../../theme/ui-interface.css");
require("../../../theme/fonts.google.css");
require("../../../theme/theme.css");

export default {
  data() {
    return {
      email: null,
      password: null,
      isLogin: false,
      loginResult: Object,
      showModal: false,
      successResult: false,
      isLoading: true,
      message: '',
      messageError: null
    };
  },
  name: "LoginComponent",
  components: {
    BitzarLoading,
    BitzarModal,
  },
  methods: {
    async Login() {
      try {
        this.showModal = false;
        this.isLogin = true;
        this.loginResult = await AuthenticationService.Login(
          this.email,
          this.password
        );
        this.successResult = this.loginResult.Success;

        if (!this.loginResult.Success) {
          this.showModal = true;
          this.messageError = this.loginResult;
        } else {
          this.showModal = false;
          this.$router.push("/");
        }
      } catch (e) {
        store.commit("addToaster", {
          text: e.message,
          type: "error",
        });
      } finally {
        this.isLogin = false;
      }
    },
    closeModal() {
      this.showModal = false;
    },
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
    }),
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    inputs()
  },
};
</script>