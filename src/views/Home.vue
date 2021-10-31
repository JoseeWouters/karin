<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label>Datum</ion-label>
        <ion-datetime
          display-format="DD MMMM YYYY"
          v-model="dateTime"
        ></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label>Tijd</ion-label>
        <ion-datetime display-format="H:mm" v-model="dateTime"></ion-datetime>
      </ion-item>
      <ion-radio-group v-model="leftOrRight">
        <ion-item>
          <ion-label>Links</ion-label>
          <ion-radio value="links"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Rechts</ion-label>
          <ion-radio value="rechts"></ion-radio>
        </ion-item>
      </ion-radio-group>
      <ion-radio-group v-model="place">
        <ion-item>
          <ion-label>Buik</ion-label>
          <ion-radio value="buik"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Been</ion-label>
          <ion-radio value="been"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Flank</ion-label>
          <ion-radio value="flank"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Arm</ion-label>
          <ion-radio value="arm"></ion-radio>
        </ion-item>
      </ion-radio-group>
      <ion-button @click="saveMedTaken">Toevoegen</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonDatetime,
  IonLabel,
  IonItem,
  IonRadio,
  IonRadioGroup,
} from "@ionic/vue";
import { Storage } from "@ionic/storage";
const storage = new Storage();
export default {
  name: "Home",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonDatetime,
    IonLabel,
    IonItem,
    IonRadio,
    IonRadioGroup,
  },
  data() {
    return {
      dateTime: `${new Date()}`,
      leftOrRight: "",
      place: "",
    };
  },
  async mounted() {
    await storage.create();
  },
  methods: {
    async saveMedTaken() {
      const currentMedTaken = {
        dateTime: this.dateTime,
        leftOrRight: this.leftOrRight,
        place: this.place,
      };
      await storage.get("medsTaken").then( (res) => {
        const medsTaken = res ? res : [];
        medsTaken.push(currentMedTaken);
        storage.set("medsTaken", medsTaken);
      });
    },
  },
};
</script>

<style scoped>
ion-radio-group {
  display: flex;
  flex-wrap: wrap;
}
</style>