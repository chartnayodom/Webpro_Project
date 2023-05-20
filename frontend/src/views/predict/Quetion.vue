<template>
    <div id="app">
         <section class="section" style="text-align: center;">
        <h2 class="title">คำถาม</h2>
            <div class="content">
                <div class="pt-4" ><!--v-for="problem in problems" :key="problem.id"-->
                    <router-link to="/predict/result" class="button is-primary"><!--{{problem.context}}-->ตัวเลือก</router-link>
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