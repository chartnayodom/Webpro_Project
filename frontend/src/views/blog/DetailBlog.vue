<template>
    <div id="app">
    <section class="section" id="article">
        <!-- card แสดงบทความ -->
        <div class="container is-two-third" >
            <router-link to="/" class="button is-primary">Back to All article</router-link>
            <h1 class="title is-size-1"><!--{{blog.title}}--></h1>
            <h6 class="subtitle is-size-5"><!--{{blog.writer}}--></h6>
            <figure class="image is-900x600">
                <img src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg" alt="รุปปกบทความ">
            </figure>
        </div>
        <div class="container mt-6">
            
            <p class="is-size-5"><!--{{blog.text}}--></p>
        </div>

    </section>
    </div>
</template>
<script>
export default {
    data(){
        return{
            blogs:[]
        }
    }
}
</script>