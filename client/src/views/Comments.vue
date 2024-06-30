<template>
  <div>
    <CommentSection :id="id" />
  </div>
</template>

<script>
import CommentSection from "@/components/CommentSection.vue";

export default {
  components: {
    CommentSection,
  },
  props: ["id"],
};
</script>
