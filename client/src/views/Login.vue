<template>
  <h1>LOGIN HERE</h1>
  <v-img
    src="../assets/popcorn.png"
    alt="GastroDelights Image"
    class="mx-auto"
  />
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="firstName"
        :rules="firstNameRules"
        label="First name"
      ></v-text-field>

      <v-text-field
        v-model="lastName"
        :rules="lastNameRules"
        label="Last name"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    firstName: "",
    firstNameRules: [
      (value) => {
        if (value?.length > 3) return true;

        return "First name must be at least 3 characters.";
      },
    ],
    lastName: "123",
    lastNameRules: [
      (value) => {
        if (/[^0-9]/.test(value)) return true;

        return "Last name can not contain digits.";
      },
    ],
  }),
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
}

.v-sheet {
  margin-top: 20px;
}

.v-img {
  width: 250px;
  height: auto;
}

.v-btn {
  background-color: brown;
  color: white;
}
</style>
