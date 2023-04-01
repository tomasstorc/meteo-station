import IData from "../interface/Data";
import Data from "../model/Data";

export default function dbSeed(): void {
    for(let i = 0; i < 10; i++) {
        let data = new Data<IData>({
            deviceid: 
        })
    }
}