import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as swiper from "swiper/element/bundle";
import { createApp } from "vue";
import router from "@/router";
import App from "@/App.vue";
import { errorHandler } from "@/lib/utils";

fontawesome.library.add(faArrowLeft);

swiper.register();

const app = createApp(App);

app.use(router);

app.config.errorHandler = errorHandler(router);

app.mount("#root");