<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form>
        <fieldset>
          <label for="date">Date</label>
          <input type="date" name="date" id="date">
        </fieldset>
        <fieldset>
          <label for="time">Time</label>
          <input type="time" name="time" id="time">
        </fieldset>
      </form>
      <ion-button>Add new entry</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default  {
  name: 'Home',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
}
</script>

<style scoped>
fieldset {
  all: inherit;
}
</style>