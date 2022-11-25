export const useFetchData = () => {
    const _default_header = {
        'content-type': 'application/json',
        accept: 'application/json',
    }

    let _header = null

    function initHeader() {
        if (!_header) _header = _default_header
    }
    function getHeader() {
        return _header
    }
    function addHeader(new_header) {
        for (const [i, v] of Object.entries(new_header)) {
            _header[i] = v
        }
    }
    function newHeader(new_header) {
        _header = null
        for (const [i, v] of Object.entries(new_header)) {
            _header[i] = v
        }
    }

    function clearHeader() {
        _header = null
    }
    function resetHeader() {
        _header = _default_header
    }

    function setTokenToHeader(token) {
        initHeader()
        _header['Authorization'] = `Bearer ${token}`
    }

    async function getData(url) {
        initHeader()
        if (!url) return { error: 'url required' }

        let output = await fetch(url, {
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: _header,
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            referrer: 'no-referrer', // *client, no-referrer
        })

        output = await output.json()
        return output
    }

    async function postData(url, data = {}) {
        initHeader()

        if (!url) return { error: 'url required' }
        if (!data) return { error: 'data required' }

        let output = await fetch(url, {
            body: JSON.stringify(data),
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: _header,
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            referrer: 'no-referrer', // *client, no-referrer
        })
        output = await output.json()
        return output
    }

    return {
        getHeader,
        addHeader,
        newHeader,
        clearHeader,
        resetHeader,

        setTokenToHeader,

        getData,
        postData,
    }
}
