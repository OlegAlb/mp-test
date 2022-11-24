import { makeAutoObservable, runInAction } from "mobx";

import { createContext } from "react";
import sample from "./data.json";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Location {
  locationID: number;
  name: string;
}

export interface Env {
  envID: number;
  name: string;
}

export interface Server {
  serverID: number;
  name: string;
  locationID: number;
  envID: number;
}

export interface TestLocation {
  id: number;
  locationID: number;
  envID: number;
  hint: string
}

export class Store {
  isLoaded = false;
  locations: Location[] = [];
  envs: Env[] = [];
  servers: Server[] = [];

  testLocations: TestLocation[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchData = async () => {
    await sleep(3000);
    runInAction(() => {
      this.locations = sample.locations;
      this.envs = sample.envs;
      this.servers = sample.servers;
      this.isLoaded = true;
    });
  };

  addTestLocation = () => {
    runInAction(() => {
      const testLocation = {
        id: Math.round(Math.random() * 1000),
        envID: store.envs[0].envID,
        locationID: store.locations[0].locationID,
        hint: ''
      };

      this.testLocations = [...this.testLocations, testLocation];
    });
  }

  editTestLocation = (id: TestLocation['id'], data: Partial<TestLocation>) => {
    runInAction(() => {
      this.testLocations = this.testLocations.map(testLocation => testLocation.id === id ? {...testLocation, ...data} : testLocation);
    });
  }
}

export const store = new Store();
export const storeContext = createContext(store);
