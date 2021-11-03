declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    ADVICESLIP_API: string;
    ADVICE_MIN_ENTRIES: number;
    ADVICE_MAX_ENTRIES: number;
    LIBRETRANSLATE_API: string;
  }
}
