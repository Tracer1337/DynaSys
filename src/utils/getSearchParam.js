const url = new URL(window.location.href)

export default key => url.searchParams.get(key)