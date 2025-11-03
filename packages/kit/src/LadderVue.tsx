// LadderVue.tsx
import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";
import type { ILadder } from "@ladder/common";
import { createLadderKit, type LadderKitOptions } from "./kit";

export const LadderVue = defineComponent({
  name: "LadderVue",
  props: {
    data: { type: Object as () => ILadder, required: true },
    options: { type: Object as () => LadderKitOptions, required: false },
  },
  setup(props, { slots, expose }) {
    const container = ref<HTMLDivElement | null>(null);
    const core = createLadderKit();

    onMounted(() => {
      if (container.value) {
        core.mountCanvas(container.value);
        core.draw(props.data, props.options);
      }
    });

    watch(
      () => [props.data, props.options],
      () => {
        core.draw(props.data, props.options);
      },
      { deep: true }
    );

    onBeforeUnmount(() => core.destroy());

    expose({
      redraw: (data?: ILadder, options?: LadderKitOptions) =>
        core.draw(data ?? props.data, options ?? props.options),
      getCanvas: () => core.getCanvasEl(),
    });

    return () =>
      h("div", { class: "ladder-vue" }, [
        h("div", { ref: container }),
        slots.default?.(),
      ]);
  },
});
