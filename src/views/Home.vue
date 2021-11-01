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
      <ion-list>
        <ion-item v-for="medTaken in recentMedsTaken" :key="medTaken.date">
          <ion-label>{{medTaken.dateTime}}</ion-label>
          <p><span>{{medTaken.leftOrRight}}</span> - <span>{{medTaken.place}}</span></p>
        </ion-item>
      </ion-list>
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
  IonList,
} from "@ionic/vue";
import { orderBy } from "lodash";
import { Storage } from "@ionic/storage";
import moment from 'moment';
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
    IonList,
  },
  data() {
    return {
      dateTime: `${moment().format()}`,
      leftOrRight: "",
      place: "",
      recentMedsTaken: [],
    };
  },
  async mounted() {
    await storage.create();
    this.getMedsTaken();
  },
  methods: {
    async getMedsTaken() {
      const medsTaken = await storage.get("medsTaken");

      this.sortRecentMedsTaken(medsTaken);
    },

    sortRecentMedsTaken(medsTaken) {
      this.recentMedsTaken = orderBy(medsTaken, "dateTime", "desc").slice(0,3);
    },

    async saveMedTaken() {
      const currentMedTaken = {
        dateTime: moment(this.dateTime).format("D MMMM YYYY, HH:mm"),
        leftOrRight: this.leftOrRight,
        place: this.place,
      };

      await storage.get("medsTaken").then( (res) => {
        const medsTaken = res ? res : [];
        medsTaken.push(currentMedTaken);
        storage.set("medsTaken", medsTaken);
        this.sortRecentMedsTaken(medsTaken);
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