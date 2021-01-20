class MarvelAPI {

  //Format for MARVEL API fetching of data
  static getCharacters(origOptions = {}) {

    const defaultOptions = { page: 0, count: 20, name: '', nameStartsWith: '' }
    const options = Object.assign(defaultOptions, origOptions)

    const URI = '/v1/public/characters'
    const timeStamp = '1'
    const hash = '86506e567ccc816be3ca059ed148fed1'
    const apiKey = '83b4f07452e659e7a762c047de28caf3'
    const baseUrl = `${window.location.protocol || 'http'}//gateway.marvel.com:80`

    let params = `?apikey=${apiKey}&ts=${timeStamp}&hash=${hash}&limit=30`

    if (options.name) {
      params = params.concat(`&name=${options.name}`)
    }
    if (options.nameStartsWith) {
      params = params.concat(`&nameStartsWith=${options.nameStartsWith}`)
    }
    const url = `${baseUrl}${URI}${params}`


    return fetch(url)
  }

  static getComicsByCharacter(characterId) {

    const URI = `/v1/public/characters/${characterId}/comics`
    const timeStamp = '1'
    const hash = '86506e567ccc816be3ca059ed148fed1'
    const apiKey = '83b4f07452e659e7a762c047de28caf3'
    const baseUrl = `${window.location.protocol || 'http'}//gateway.marvel.com:80`

    const params = `?apikey=${apiKey}&ts=${timeStamp}&hash=${hash}&limit=10`
    const url = `${baseUrl}${URI}${params}`

    return fetch(url)
  }
  static getSeriesByCharacter(characterId) {

    const URI = `/v1/public/characters/${characterId}/series`
    const timeStamp = '1'
    const hash = '86506e567ccc816be3ca059ed148fed1'
    const apiKey = '83b4f07452e659e7a762c047de28caf3'
    const baseUrl = `${window.location.protocol || 'http'}//gateway.marvel.com:80`

    const params = `?apikey=${apiKey}&ts=${timeStamp}&hash=${hash}&limit=10`
    const url = `${baseUrl}${URI}${params}`

    return fetch(url)
  }
  static getStoriesByCharacter(characterId) {

    const URI = `/v1/public/characters/${characterId}/stories`
    const timeStamp = '1'
    const hash = '86506e567ccc816be3ca059ed148fed1'
    const apiKey = '83b4f07452e659e7a762c047de28caf3'
    const baseUrl = `${window.location.protocol || 'http'}//gateway.marvel.com:80`

    const params = `?apikey=${apiKey}&ts=${timeStamp}&hash=${hash}&limit=10`
    const url = `${baseUrl}${URI}${params}`

    return fetch(url)
  }
}

export default MarvelAPI