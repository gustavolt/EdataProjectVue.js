<template>
  <CModal
    centered
    :title="title"
     @update:show="() => { closeFunction(); }"
     :show="showModal"
     :close-on-backdrop="false"
  >
    {{getMessage()}}
    <template #footer>
      <CButton
        color="px-4 bt1 bt-cta1"
        @click="() => { closeFunction(); }"
      >
        Voltar
      </CButton>
    </template>
  </CModal>
</template>

<script>
export default {
  props: [
    'showModal',
    'apiResult',
    'message',
    'title',
    'successMessage',
    'closeFunction'
  ],
  data() {
    return {};
  },
  name: "BitzarModal",
  methods: {
    getMessage() {
      if(!this.apiResult) {
        if(this.message)
          return this.message
        else
          return 'Resultado não encontrado.'
      }

      if(this.apiResult.Success) {
        return this.successMessage ?? (this.apiResult.Message ? this.apiResult.Message : 'Ação efetuada com sucesso.');
      } else {
        return this.apiResult.Message ? this.apiResult.Message : 'Não foi possível efetuar a ação.';
      }
    }
  },
};
</script>