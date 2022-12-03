import {ipcMain} from "electron";
import axios from "axios";
import {PromiseResultState, promiseToResult} from "./PromiseResult";
import nodeConsole from "../nodeConsole";

/** @deprecated */
const listenBackendHttpRequests = (): void => {
    ipcMain.on('backend-http-request', (event, config, requestId) => {
        const responsePromise = axios.request(config);

        promiseToResult(responsePromise)
            .then((promiseResult) => {
                if (promiseResult.state === PromiseResultState.FULFILLED) {
                    delete promiseResult.value.config;
                    delete promiseResult.value.request;
                }

                nodeConsole.log({promiseResult, data: (promiseResult as any).value.data});
                nodeConsole.log({promiseResultJson: JSON.stringify(promiseResult)});
                event.sender.send(`backend-http-request-response__${requestId}`, promiseResult);
            });
    });
};

export default listenBackendHttpRequests;