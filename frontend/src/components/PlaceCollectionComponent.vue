<template>
  <v-flex only-xs12 sm4 v-on:click="detail">
      <v-card hover class="grey lighten-4">
        <v-img :src="place.logo || require('@/assets/default_place.png')"
               height="200px"
               name="place-image">
        </v-img>
        <v-card-title primary-title name="place-name">
          <h3 class="headline mb-0 text-md-center one-line-place-name">
            {{ place.name }}
          </h3>
        </v-card-title>
      </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'PlaceCollectionComponent',
  props: {
    place: {
      type: Object,
      default() {
        return {
          name: '',
          logo: '',
          description: '',
          id: '',
        };
      },
    },
  },
  methods: {
    detail() {
      this.$router.push({
        name: 'placeDetail', params: { id: this.place.id },
      });
    },
  },
};
</script>

<style scoped>
.one-line-place-name {
  clear: both;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}
</style>
