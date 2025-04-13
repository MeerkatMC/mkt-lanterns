import { world, BlockComponentPlayerInteractEvent } from "@minecraft/server";
import { BlockStateSuperset } from "@minecraft/vanilla-data";

const LIGHT_CONTROL_COMPONENT = "mkt:light_control_simple";
const LIGHT_CONTROL_STATE = "mkt:light_is_on";

world.beforeEvents.worldInitialize.subscribe((ievent) => {
  ievent.blockComponentRegistry.registerCustomComponent(LIGHT_CONTROL_COMPONENT, {
    onPlayerInteract: (event: BlockComponentPlayerInteractEvent) => {
      let block = event.block;
      const perm = block.permutation;
      const light_is_on = perm.getState(LIGHT_CONTROL_STATE as keyof BlockStateSuperset);
      block.setPermutation(perm.withState(LIGHT_CONTROL_STATE as keyof BlockStateSuperset, !light_is_on));
    },
  });
});
