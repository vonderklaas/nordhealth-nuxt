export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: "nordhealth-nuxt-signup",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Sign up for our product with this easy form",
        },
        { name: "theme-color", content: "#0063af" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://nordcdn.net/ds/provetcloud/css/1.1.0/provet.min.css",
          integrity:
            "sha384-1oPScOelquAHG7S9/NvXjf0pzu2XCqVDlTcdBiODTq4frAn/By0t8LStOJuHCN1i",
          crossorigin: "anonymous",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "https://nordcdn.net/ds/icons/1.9.0/assets/provet-p.svg",
        },
      ],
      script: [
        {
          src: "https://nordcdn.net/ds/provetcloud/web-components/1.3.3/index.js",
          type: "module",
          integrity:
            "sha384-KDN832iCw/B3PvEG7/f8pjlBYkAwdpfbhtq4NBRnYaQvIijaSrtqQ23YqIRDKhvI",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    },
  },
});
