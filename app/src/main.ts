import "~/lib/scss/main.scss";

import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import * as swiper from "swiper/element/bundle";
import { createApp } from "vue";
import { createHead } from "@unhead/vue";
import router from "~/router";
import App from "~/App.vue";
import { errorHandler } from "~/lib/utils";

fontawesome.library.add(faArrowLeft, faChevronLeft, faChevronRight);

swiper.register();

const app = createApp(App);

const head = createHead();

app.use(head);

app.use(router);

app.config.errorHandler = errorHandler(router);

app.mount(document.body);