<template>
  <div id="app">
    <section class="section">
        <div class="container p-5" style="text-align: center;">
            <div class="content">
                <h2 class="title">เราคาดการณ์ว่าอาการ <!--{{problem.context}}--></h2>
                    <h4 class="subtitle">อาจมีปัญหาตรง <!--{{problem.answer}}--></h4>
                    <router-link to="/shoprecomment" class="button is-primary">หาศูนย์บริการ</router-link>

            </div>
        </div>
    </section>
  </div>
</template>

<script>
export default {
    problems:[]
}
</script>

<style>

</style>