<template>
    <div id="app">
        <nav class="navbar is-danger">
        <div class="nav-brand">
            <a class="navbar-item" href="index.html">LOGO</a>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                data-target="navbarBasicExample" v-on:click="showNav = !showNav"
                v-bind:class="{ 'is-active' : showNav }">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
            <div class="navbar-start"></div>
            <div class="navbar-end">
                <a class="navbar-item" href="article.html">บทความ</a>
                <a class="navbar-item" href="shop_recommend.html">ร้านแนะนำ</a>
                <!-- <a class="navbar-item" href="#">อื่นๆ </a> -->
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">อื่นๆ</a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item" href="add_article.html">เขียนบทความ</a>
                        <a class="navbar-item" href="add_rec_shop.html">แนะนำร้าน</a>
                        <a class="navbar-item" href="problem.html">แจ้งปัญหารถเบื้องต้น</a>
                    </div>
                </div>
                <div class="navbar-item">
                    <a class="button is-primary" href="#login.html">Login</a>
                </div>
            </div>
        </div>
    </nav>
    <section class="section" id="article">
        <!-- card แสดงบทความ -->
        <div class="container is-two-third" >
            <router-link to="/" class="button is-primary">Back to All article</router-link>
            <h1 class="title is-size-1">{{article.article_title}}</h1>
            <h6 class="subtitle is-size-5">By WHo?</h6>
            <figure class="image is-900x600">
                <img src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg" alt="รุปปกบทความ">
            </figure>
        </div>
        <div class="container mt-6">
            
            <p class="is-size-5">{{article.article_text}}</p>
        </div>

    </section>
    </div>
</template>
<script>
export default {
    data(){
        return{
            article:[]
        }
    }
}
</script>