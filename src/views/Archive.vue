<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Overzicht</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="medTaken in recentMedsTaken" :key="medTaken.date">
          <ion-label>{{ medTaken.dateTime }}</ion-label>
          <p>
            <span>{{ medTaken.leftOrRight }}</span> -
            <span>{{ medTaken.place }}</span>
          </p>
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
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { orderBy } from "lodash";
import { Storage } from "@ionic/storage";
const storage = new Storage();
export default {
  name: "Tab2",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
  },

  data() {
    return {
      recentMedsTaken: [],
    };
  },
  async ionViewWillEnter() {
    await storage.create();
    this.getMedsTaken();
  },
  methods: {
    async getMedsTaken() {
      const medsTaken = await storage.get("medsTaken");

      this.sortRecentMedsTaken(medsTaken);
    },

    sortRecentMedsTaken(medsTaken) {
      this.recentMedsTaken = orderBy(medsTaken, "dateTime", "desc");
    },
  },
};
</script>