import {AxiosRequestConfig, AxiosResponse} from "axios";
import {ipcRenderer} from 'electron';
import {v4} from 'uuid';
import {resultToPromise} from "./PromiseResult";

/** @deprecated */
const backendHttpRequest = <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> => {
    return new Promise<R>((resolve, reject) => {
        const requestId = v4();

        ipcRenderer.send('backend-http-request', config, requestId);

        ipcRenderer.on(`backend-http-request-response__${requestId}`, (event, responsePromiseResult) => {
            resultToPromise(responsePromiseResult)
                .then(resolve)
                .catch(reject);
        });
    });
};

export default backendHttpRequest;