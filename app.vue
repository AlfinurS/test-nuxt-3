<template>
  <div>
    <header>
      <h1>My Nuxt 3 Application</h1>
      <nav>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/character">About</nuxt-link>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import './assets/scss/styles.scss';
@import './assets/scss/_variables.scss';
</style>
