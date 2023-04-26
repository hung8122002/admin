<template>
  <div @click.self="$emit('closeDetail')" class="detail-layout">
    <div :style="confirm ? 'width: 400px' : ''" class="detail">
      <slot></slot>
      <div v-show="!hideFooter" class="detail-footer">
        <v-btn @click="$emit('closeDetail')">Cancel</v-btn>
        <v-btn
          @click="$emit('submit')"
          class="text-white"
          :disabled="dialog"
          :loading="dialog"
          :style="`background-color: ${bgc}`"
          >{{ text }}
        </v-btn>
      </div>
    </div>
    <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
      <v-card
        :color="isSuccess ? (dialogText ? 'yellow' : '#498374') : 'primary'"
      >
        <v-card-text v-show="isSuccess">
          {{ dialogText ? dialogText : "Save successfully" }}
          <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
        </v-card-text>

        <v-card-text v-show="!isSuccess">
          Loading... Please wait in few seconds
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: [
    "isValid",
    "success",
    "isChanged",
    "confirm",
    "text",
    "bgc",
    "hideFooter",
  ],
  data() {
    return {
      dialog: false,
      isSuccess: false,
      dialogText: "",
    };
  },
  watch: {
    isSuccess() {
      setTimeout(() => {
        this.dialog = false;
        this.isSuccess = false;
        this.dialogText = "";
        this.$emit("closeDetail");
      }, 1000);
    },

    isChanged() {
      this.dialog = this.isValid;
      this.isSuccess = this.success;
    },
  },
};
</script>

<style scoped>
.detail-layout {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(20, 20, 50, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.detail {
  padding: 20px;
  width: 800px;
  border: 1px solid #353570;
  border-radius: 6px;
  background: #1d1d42;
}

.detail-footer {
  display: flex;
  justify-content: space-between;
}
</style>