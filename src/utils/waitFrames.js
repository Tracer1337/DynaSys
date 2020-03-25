const waitFrames = (fn, n) => {
    if (n === 0) fn()
    else requestAnimationFrame(() => waitFrames(fn, n - 1))
}

export default waitFrames