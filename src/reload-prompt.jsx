import React from 'react'
import './reload-prompt.css'

import {useRegisterSW} from 'virtual:pwa-register/react'
import {pwaInfo} from 'virtual:pwa-info'
import classNames from "classnames";
import {Anchor} from "./anchor.jsx";
import BUILD_COMMITISH from 'virtual:commit-hash';

const RECHECK_INTERVAL_MS = 20_000;

console.log("PWA info: %o, current version: %s", pwaInfo, BUILD_COMMITISH)

export const ReloadPrompt = () => {

    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW: (swUrl, r) => {
            console.log('SW at %s registered.', swUrl);
            r && setInterval(() => {
                console.log('%s: Checking for SW update, current version: %s', new Date().toISOString(), BUILD_COMMITISH);
                r.update()
            }, RECHECK_INTERVAL_MS);
        },
        onRegisterError: (error) => {
            console.log('SW registration failed.', error);
        },
    })

    const reload = (ev) => {
        ev.preventDefault();
        console.log("Updating SW...");
        updateServiceWorker(true);
        location.reload();
    }

    const ignore = (ev) => {
        ev.preventDefault();
        console.log("Ignoring updated SW.");
        setOfflineReady(false);
        setNeedRefresh(false);
    }

    return (
        <div
            className={classNames("ReloadPrompt", needRefresh ? "" : "ReloadPrompt__hidden")}>
            <Anchor className="ReloadPrompt__choice" onClick={reload}>Reload</Anchor>
            <Anchor className="ReloadPrompt__choice" onClick={ignore}>Ignore</Anchor>
        </div>
    )
}