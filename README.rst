.. image:: https://badge.fury.io/js/vue-yandex-metrika.svg
    :target: https://badge.fury.io/js/vue-yandex-metrika

.. image:: https://travis-ci.org/vchaptsev/vue-yandex-metrika.svg?branch=master
    :target: https://travis-ci.org/vchaptsev/vue-yandex-metrika

Vue Yandex Metrika
=======================

.. image:: https://i.imgur.com/iu7VdZ7.png
    :target: https://github.com/vchaptsev/vue-yandex-metrika

**vue-yandex-metrika** allows you to send data about visited pages to `Yandex Metrika`_.

----


Installation
------

Install with yarn_::

  $ yarn add vue-yandex-metrika

Install with npm::

  $ npm install vue-yandex-metrika --save


Usage
------

Pass the VueRouter instance to the plugin and let it handle everything for you::

    // your main.js

    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import VueYandexMetrika from 'vue-yandex-metrika'

    const router = new VueRouter({
      router: // your routes
    })

    Vue.use(VueYandexMetrika, {
        id: XXXXXXXX,
        router,
        ignoreRoutes: []
    })


**Options**:

+---------------------+------------+-------------------------------+
| Name                | Required   | Description                   |
+=====================+============+===============================+
| id                  | True       | Your tracking id              |
+---------------------+------------+-------------------------------+
| router              | True       | VueRouter object              |  
+---------------------+------------+-------------------------------+
| ignoreRoutes        | False      | List of ignored router names  |
+---------------------+------------+-------------------------------+


.. _`Yarn`: https://yarnpkg.com
.. _`Yandex Metrika`: https://metrika.yandex.ru
