<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Advisor </q-toolbar-title>
        <q-select
          v-model="locale"
          :options="localeOptions"
          label="Select Language"
          dark
          dense
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 150px"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    const $q = useQuasar();
    watch(locale, async (val) => {
      // dynamic import, so loading on demand only
      await import(
        /* webpackInclude: /(en-US|pl)\.js$/ */
        'quasar/lang/' + val
      ).then((lang) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        $q.lang.set(lang.default);
      });
    });

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'pl', label: 'Polskie' },
      ],
    };
  },
});
</script>
