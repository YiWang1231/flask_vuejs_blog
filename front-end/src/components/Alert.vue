<template>
    <div class="alert" role="alert" v-bind:class="'alert' + variant">
      {{message}}
    </div>
</template>

<script>
    // 子组件Alert.vue可以接受父组件传递的数据利用props
    export default {
      props: ['variant', 'message']
    }
</script>

