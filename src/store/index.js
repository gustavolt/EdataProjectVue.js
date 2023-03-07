import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    asideShow: false,
    darkMode: false,
    toasts : [],
    userSelect: []
}

const mutations = {
    toggleSidebarDesktop(state) {
        const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state) {
        const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set(state, [variable, value]) {
        state[variable] = value
    },
    toggle(state, variable) {
        state[variable] = !state[variable]
    },
    addToaster(state, data) {
        this._vm.$swal({toast: true,
            position: 'top-end',
            showConfirmButton: data.confirm ?? false,
            showCancelButton: data.cancel ?? false,
            confirmButtonColor: '#00B633',
            cancelButtonColor: '#FF0000',
            confirmButtonText: data.textConfirm ?? false,
            cancelButtonText: data.textCancel ?? false,
            timer: 3000,
            icon: data.type ?? "info",
            title: data.title,
            text: data.text
        })
    },
    setUserSelect(state,data){
        let userData = data;
        state.userSelect.push(userData);
    }
}

export default new Vuex.Store({
    state,
    mutations,
    modules: {}
})
