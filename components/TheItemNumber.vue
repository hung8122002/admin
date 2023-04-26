<template>
  <div class="number">
    <div>
      <slot></slot>
    </div>
    <div>
      <h3>{{ i }}</h3>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["number", "text"],
  data() {
    return {
      i: 0,
    };
  },
  methods: {
    myLoop() {
      setTimeout(() => {
        this.i++;
        if (this.i < this.number) {
          this.myLoop();
        }
      }, 10);
    },
  },
  watch: {
    number() {
      this.myLoop();
    },
  },
};
</script>

<style>
.number {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #97a2d2;
  border: 1px solid #353570;
  border-radius: 6px;
  background: #1d1d42;
}
</style>