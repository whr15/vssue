<template>
  <transition
    name="fade"
    mode="out-in"
    appear
  >
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'TransitionFade'
}
</script>

<style lang="stylus" scoped>
.fade-enter-active
.fade-appear-active
  transition all .3s ease

.fade-leave-active
  transition all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.fade-enter
.fade-leave-to
.fade-appear
  opacity: 0
</style>
