import React, { useState, useEffect } from "react"
import { Select, MenuItem, Button, withStyles } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import GithubIcon from "@material-ui/icons/GitHub"
import LanguageIcon from "@material-ui/icons/Language"

import IconButton from "../components/IconButton.js"

import createSection from "./createSection.js"
import { languages, defaultLang } from "src/config/strings.js"
import getSearchParam from "src/utils/getSearchParam.js"
import Dialog from "../../Dialog/Dialog.js"
import Strings from "src/config/strings.js"

const styles = {
    select: {
        marginLeft: 8
    }
}

const Misc = ({classes}) => {
    const [langCode, setLangCode] = useState(getSearchParam("lang") || defaultLang)
    const [showReloadAdvice, setShowReloadAdvice] = useState(false)

    const handleApplyLanguage = () => {
        const url = new URL(window.location.href)
        url.searchParams.set("lang", langCode)
        window.location.href = url.href
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
            <IconButton
                onClick={Dialog.settings}
                icon={SettingsIcon}
                label={Strings["Settings"]}
            />

            <IconButton
                onClick={() => window.open("https://github.com/Tracer1337/DynaSys", "_blank")}
                icon={GithubIcon}
                label={Strings["Misc.Github"]}
            />


            <IconButton
                icon={LanguageIcon}
                customLabel={() => (
                    <Select 
                        value={langCode} 
                        onChange={event => setLangCode(event.target.value)}
                        className={classes.select}
                    >
                        {Object.entries(languages).map(([code, { Name }], i) => (
                            <MenuItem value={code} key={i}>{Name}</MenuItem>
                        ))}
                    </Select>
                )}
            />

            {showReloadAdvice && (
                <Button onClick={handleApplyLanguage}>{languages[langCode]["Misc.ApplyLanguage"]}</Button>
            )}
        </>
    )
}

const Styled = withStyles(styles)(Misc)

export default createSection(Styled, {
    className: "misc"
})