<template>
  <Page>
    <ActionBar>
      <Label text="Home!!!" />
    </ActionBar>

    <GridLayout>
      <Label class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; " />
          <Span :text="message" />
        </FormattedString>
      </Label>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from "nativescript-vue";

const data = [
  "rendzi"
]
export default Vue.extend({
  computed: {
    message() {
      return "Blank {N}-Vue app";
    }
  }
});
</script>

<style scoped lang="scss">
.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
