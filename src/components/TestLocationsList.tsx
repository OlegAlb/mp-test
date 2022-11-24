import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { storeContext } from "../store";
import { TestLocationForm } from "./TestLocationForm/TestLocationForm";


export const TestLocationsList = observer(() => {
    const store = useContext(storeContext);
  
    const handleAddLocationClick = () => {
        store.addTestLocation();
    }

    const handleLogLocationsClick = () => {
      // quick solution to avoid proxies
      console.log(store.testLocations.map(location => ({...location})))
    }

    useEffect(() => {
      store.fetchData();
    }, [])

    return (
      <>
        {store.testLocations.map((location, index) => (
          <TestLocationForm key={`location-${index}`} location={location}/>
        ))}
        <button onClick={handleAddLocationClick} disabled={!store.isLoaded}>
          Добавить тестовую локацию
        </button>
        <button onClick={handleLogLocationsClick}>
          Вывести результат в консоль
        </button>
      </>
    );
  });