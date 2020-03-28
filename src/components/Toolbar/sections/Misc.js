import React, { useState, useEffect } from "react"

import createSection from "./createSection.js"
import image from "src/assets/images/view-on-github.png"
import { languages, defaultLang } from "src/config/strings.js"
import getSearchParam from "src/utils/getSearchParam.js"

const Misc = () => {
    const [langCode, setLangCode] = useState(getSearchParam("lang") || defaultLang)
    const [showReloadAdvice, setShowReloadAdvice] = useState(false)

    const handleApplyLanguage = () => {
        window.location.href = `${window.location.origin}?lang=${langCode}`
    }

    useEffect(() => {
        if(langCode === getSearchParam("lang") || (!getSearchParam("lang") && langCode === defaultLang)) {
            setShowReloadAdvice(false)
        } else {
            setShowReloadAdvice(true)
        }
    }, [langCode])

    return (
        <>
            <div>
                <a href="https://github.com/Tracer1337/DynaSys" target="_blank" className="github-link" rel="noopener noreferrer">
                    <img src={image} alt="View on Github"/>    
                </a>
            </div>

            <select value={langCode} onChange={event => setLangCode(event.target.value)}>
                {Object.entries(languages).map(([code, {Name}], i) => (
                    <option value={code} key={i}>{Name}</option>
                ))}
            </select>

            {showReloadAdvice && (
                <button onClick={handleApplyLanguage}>{languages[langCode]["Misc.ApplyLanguage"]}</button>
            )}
        </>
    )
}

export default createSection(Misc, {
    className: "misc"
})