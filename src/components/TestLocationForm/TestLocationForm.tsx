import { observer } from "mobx-react-lite";
import { ChangeEvent, useContext } from "react";
import { storeContext, TestLocation } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faLeaf } from '@fortawesome/free-solid-svg-icons'
import styles from './TestLocationForm.module.css';
import Input from "../Input";
import Select from "../Select";

interface TestLocationFormProps {
    location: TestLocation
}

export const TestLocationForm = observer(({location}: TestLocationFormProps) => {
    const store = useContext(storeContext);

    const handleLocationSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        store.editTestLocation(location.id, {locationID: Number(event.target.value)})
    }

    const handleEnvSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        store.editTestLocation(location.id, {envID: Number(event.target.value)})
    }

    const handleHintTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        store.editTestLocation(location.id, {hint: event.target.value})
    }

    if (!store.isLoaded) {
        return <div>Данные не загружены</div>;
    }

    return (
        <div className={styles.wrap}>
            <h3>Тестовая локация {location.id}</h3>
            
            <div className={styles.row}>
                <Select icon={<FontAwesomeIcon icon={faMapMarker}/>} className={styles.select} title="Локация" options={store.locations.map(({locationID, name})=>({id: locationID, name}))} onChange={handleLocationSelectChange}/>
                <Select icon={<FontAwesomeIcon icon={faLeaf}/>} className={styles.select} title="Среда" options={store.envs.map(({envID, name})=>({id: envID, name}))} onChange={handleEnvSelectChange}/>
                <div className={styles.servers}>
                    <span className={styles.title}>Серверы</span>
                    {store.servers.filter(({locationID, envID}) => locationID === location.locationID && envID === location.envID).map(server => server.name).join(",")}
                </div>
            </div>

            <div className={styles.row}>
                <Input title="Подсказка" onInput={handleHintTextChange} placeholder="Комментарий по локации"/>
            </div>
        </div>
    );
});