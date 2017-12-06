<p align="center">
    <img src="https://i.imgur.com/iu7VdZ7.png" />
    <br>
    <br>
    <a href="https://badge.fury.io/js/vue-yandex-metrika">
        <img src="https://badge.fury.io/js/vue-yandex-metrika.svg" />
    </a>
    <a href="https://www.npmjs.com/package/vue-yandex-metrika">
        <img src="https://img.shields.io/npm/dm/vue-yandex-metrika.svg" />
    </a>
    <br>
    <a href="https://travis-ci.org/vchaptsev/vue-yandex-metrika">
        <img src="https://travis-ci.org/vchaptsev/vue-yandex-metrika.svg?branch=master" />
    </a>
    <a href='https://coveralls.io/github/vchaptsev/vue-yandex-metrika?branch=master'>
        <img src='https://coveralls.io/repos/github/vchaptsev/vue-yandex-metrika/badge.svg?branch=master' />
    </a>
</p>


# Vue Yandex Metrika

**vue-yandex-metrika** allows you to send data about visited pages to [Yandex Metrika].

## Installation

Install with [yarn]:

  ```bash
  $ yarn add vue-yandex-metrika
  ```

Install with npm:

  ```bash
  $ npm install vue-yandex-metrika --save
  ```


## Usage

#### Autotracking

Pass the VueRouter instance to the plugin and let it handle everything for you ([Metrika API] is also aviable):

    // your main.js

    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import VueYandexMetrika from 'vue-yandex-metrika'                               

    const router = new VueRouter({...}) // your routes

    Vue.use(VueYandexMetrika, {
        id: XXXXXXXX,
        router: router,
        env: process.env.NODE_ENV
        // other options
    })



#### Manual tracking

Works without router: [Metrika API]

    // your main.js

    import Vue from 'vue'
    import VueYandexMetrika from 'vue-yandex-metrika'                               

    Vue.use(VueYandexMetrika, {
        id: XXXXXXXX,
        env: process.env.NODE_ENV
        // other options
    })

    =====================================================

    // your code

    this.$metrika.hit(path)


#### Options:

| Name           | Description                                                                          | Required | Default       |
| -------------- | ------------------------------------------------------------------------------------ | -------- | ------------- |
| id             | Your tracking id                                                                     | True     | null          |
| router         | **Autotracking** if the router is passed, otherwise: **manual tracking**             | False    | null          |
| env            | "production" or "development"                                                        | False    | "development" |
| productionOnly | Run in **DEBUG mode** (API calls replaced by console.log) if env is not "production" | False    | true          |
| skipSamePath   | Do not track a page visit if previous and next routes URLs match                     | False    | true          |
| ignoreRoutes   | List of ignored routes names                                                         | False    | []            |



[Yandex Metrika]: https://metrika.yandex.ru
[yarn]: https://yarnpkg.com
[Metrika API]: https://yandex.ru/support/metrika/objects/method-reference.html
