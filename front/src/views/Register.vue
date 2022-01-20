<template>
  <div class="register">
    <register />
  </div>
</template>
<script>
import register from '@/components/auth/Register';
export default {
  components: {
    register,
  },
  mounted() {
    if (localStorage.getItem('jwt') != null) {
      this.$router.push('/transactions');
    }
  },
};
</script>
