<p align="center">
    <img src="https://i.imgur.com/iu7VdZ7.png" />
    <br>
    <br>
    <a href="https://badge.fury.io/js/vue-yandex-metrika">
        <img src="https://badge.fury.io/js/vue-yandex-metrika.svg" />
    </a>
    <a href="https://travis-ci.org/vchaptsev/vue-yandex-metrika">
        <img src="https://travis-ci.org/vchaptsev/vue-yandex-metrika.svg?branch=master" />
    </a>
</p>


# Vue Yandex Metrika

**vue-yandex-metrika** allows you to send data about visited pages to [Yandex Metrika](https://metrika.yandex.ru).

## Installation

Install with [yarn](https://yarnpkg.com):

  ```bash
  $ yarn add vue-yandex-metrika
  ```

Install with npm:

  ```bash
  $ npm install vue-yandex-metrika --save
  ```


## Usage

Pass the VueRouter instance to the plugin and let it handle everything for you:

    // your main.js

    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import VueYandexMetrika from 'vue-yandex-metrika'

    const router = new VueRouter({...}) // your routes

    Vue.use(VueYandexMetrika, {
        id: XXXXXXXX,
        router: router,
        ignoreRoutes: [],
        skipSamePath: false
    })



**Options**:

| Name                | Required   | Description                                                       |
| ------------------- | ---------- | ----------------------------------------------------------------- |
| id                  | True       | Your tracking id                                                  |
| router              | True       | VueRouter object                                                  |  
| ignoreRoutes        | False      | List of ignored routes names                                      |
| skipSamePath        | False      | Do not track a page visit if previous and next routes URLs match  |
