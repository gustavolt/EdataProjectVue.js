<template>
  <main class="wrapper-edata wrapper-edataMenu bg-branco paddingMainDefault comModal">
    <div class="bar-tit1 bar-tit-header wrapper-margin-min">
      <h2 class="tit1">Clientes</h2>
    </div>

    <section class="wrapper-margin-min">
      <h2 class="tit2">Gerencie os clientes</h2>
      <a class="btAdd1 flexCenterCenter" @click="$router.push('/cadastro-cliente')">Adicionar Cliente</a>
    </section>

    <section class="padT12">
      <ul class="font-default wrapper-margin-min">
        <li v-for="client, index in optionsClients" :key="index"  class="carduser bg-light radius-default flexBet pad15 boderBox">
          <div class="bar-text">
            <div>
              <strong class="strong colorblack block">{{client.name}} {{client.lastName}}</strong>
              <span class="preco font-medium">{{client.email}}</span>
            </div>
            <ul class="bar-bts-filtros">
              <li><a class="bt-act-pd bt-editar" @click="$router.push(`/editar-cliente/${client.id}`)">Editar</a></li>
              <li><a class="bt-act-pd bt-excluir" @click="deleteClient(client.id)">Excluir</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import userService from "../../helpers/user.service";
import store from "../../store";
import homeClientService from "../../services/homeClient.service";
require ("../../theme/theme.css");
require("../../theme/reset.css");
require("../../theme/ui-elements.css");
require("../../theme/ui-fonts.css");
require("../../theme/ui-colors.css");
require("../../theme/ui-interface.css");
require("../../theme/fonts.google.css");

export default {
  data(){
    return{
      optionsClients: null
    }
  },
  name: 'Clients',
  components: {
  },
  methods: {
    async getClients() {
      try {
        let clientsOptions;
        clientsOptions = await homeClientService.getClients();
        this.optionsClients = clientsOptions.Data;
      } catch (e) {
        store.commit("addToaster", {
          text: e.message,
          type: "error",
        });
      }
    },
    async deleteClient(id) {
      try {
       await homeClientService.deleteClient(id);
        store.commit("addToaster", {
          text: "Excluído com sucesso",
          type: "success",
        });
        await this.getClients();
      } catch (e) {
        store.commit("addToaster", {
          text: e.message,
          type: "error",
        });
      }
    },
  },
  async mounted() {
    if(!userService.isAuthenticated()) {
      this.$router.push("/autenticacao/login");
    }else{
      await this.getClients();
    }
  },
}
</script>
