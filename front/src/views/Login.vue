<template>
  <div class="container wrapper mt-5">
    <div class="login">
      <login />
    </div>
  </div>
</template>

<script>
import login from '@/components/auth/Login';
export default {
  components: {
    login,
  },
};
</script>
