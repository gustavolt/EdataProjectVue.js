<template>
  <div class="c-app">

    <CWrapper>
      <div class="c-body">
        <main class="c-main background-body">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <TheFooter/>
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  components: {
    TheFooter
  }
}
</script>
