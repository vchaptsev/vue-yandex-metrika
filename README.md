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

Pass the VueRouter instance to the plugin and let it handle everything for you:

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


**Options**:

| Name           | Description                                                       | Required | Default                                          |
| -------------- | ----------------------------------------------------------------- | -------- | ------------------------------------------------ |
| id             | Your tracking id                                                  | True     | null                                             |
| router         | VueRouter object                                                  | True     | null                                             |
| env            | "production" or "development"                                     | False    | "development"                                    |
| productionOnly | Do not track a page visit if env is not "production"              | False    | true                                             |
| skipSamePath   | Do not track a page visit if previous and next routes URLs match  | False    | true                                             |
| ignoreRoutes   | List of ignored routes names                                      | False    | []                                               |


You are also able to use [Metrika API] wherever you want to:

    this.$metrika.hit('path')


[Yandex Metrika]: https://metrika.yandex.ru
[yarn]: https://yarnpkg.com
[process.env.NODE_ENV]: https://forum.vuejs.org/t/checking-development-or-production-mode-in-browser/8650
[Metrika API]: https://yandex.ru/support/metrika/objects/method-reference.html
