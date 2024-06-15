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

<style scoped>
header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
}

nav a {
  color: #fff;
  margin-right: 1rem;
  text-decoration: none;
}

main {
  padding: 1rem;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
