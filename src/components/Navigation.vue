<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-navbar-brand to="/">{{ brand }}</b-navbar-brand>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item-dropdown text="Registry">
          <b-dropdown-item :to="{ name: 'RegistryIndex' }">Index</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    data() {
      return {
        brand: process.env.VUE_APP_TITLE,
      }
    }
  }
</script>
