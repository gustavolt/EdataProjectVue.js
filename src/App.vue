<template>
    <div id="app">
        <router-view/>
        <CToaster
        v-for="(toaster, toasterKey) in toasters"
        :position="toasterKey"
        :key="'toaster' + toasterKey"
        >
            <template v-for="(toast, key) in toaster">
                <CToast
                    :key="'toast' + key"
                    :show="true"
                    v-bind="toast"
                    :style="{backgroundColor: toast.type}"
                >
                    {{ toast.body }}
                </CToast>
            </template>
        </CToaster>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toasts: this.$store.state.toasts,
        }
    },
    computed : {
        toasters () {
            return this.toasts.reduce((toasters, toast) => {
                toasters[toast.position] = toasters[toast.position] || []
                toasters[toast.position].push(toast)
                return toasters
            }, {});
        }
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
    // Import Main styles for this application
    @import 'assets/scss/style';
</style>
<style>
    .backgroud-load{
        opacity: 0.3;
    }
    input{
        height: 40px !important;
    }
    .card-option-table{
        margin-bottom: 15px;
        margin-top: 15px;
    }
    thead tr {
        background-color: white !important;
    }
    .loader-page-all{
        opacity: 0.6 !important;
        position: absolute;
        left: 51%;
        top: 30%;
        z-index: 99999;
    }
</style>
