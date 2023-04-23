<template>
  <div class="container is-widescreen">
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
                <a class="navbar-item" href="predict.html">คาดการณ์ปัญหา</a>
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
    <section class="section">
        <div class="container p-5" style="text-align: center;">
            <div class="content">
                <h2 class="title">สวัสดี</h2>
                    <h4 class="subtitle">คุณรู้สึกว่ารถของคุณมีอาการแปลกๆใช่มั้ย</h4>
                    <a class="button is-primary is-rounded" href="predict2.html">เริ่มการวิเคราะห์</a>
                    <h3>หลังจากเริ่มการวิเคราะห์เราจะมีคำถามให้คุณเลือกตอบจนกว่าจะวิเคราะห์ได้</h3>
                    <h6>(ผลการสิเคราะห์อาจไม่ตรง 100%)</h6>
            </div>
        </div>
    </section>
  </div>
</template>