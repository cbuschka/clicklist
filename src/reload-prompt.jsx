import React from 'react'
import './reload-prompt.css'

import {useRegisterSW} from 'virtual:pwa-register/react'
import {pwaInfo} from 'virtual:pwa-info'
import classNames from "classnames";
import {Anchor} from "./anchor.jsx";

const RECHECK_INTERVAL_MS = 20_000;

console.log("PWA info: %o", pwaInfo)

export const ReloadPrompt = () => {
    const buildDate = '__BUILD_TIMESTAMP__';

    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW: (swUrl, r) => {
            console.log('SW at %s registered.', swUrl);
            r && setInterval(() => {
                console.log('Checking for SW update at %o, current is %s.', new Date(), buildDate)
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