import fetchJsonp from 'fetch-jsonp'

function objToQuery(obj: { [key: string]: any }): string {
  const queryString = Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')

  return queryString
}

function target(wd: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(wd)}`
}

function complete(wd: string, callback: any) {
  const query = objToQuery({ client: 'psy-ab', hl: 'zh-CN', q: wd })
  fetchJsonp(`https://suggestqueries.google.com/complete/search?${query}`)
    .then(res => res.json())
    .then((data) => {
      callback({
        eng: 'google',
        wd: data[0],
        list: data[1].map((a: any) => a[0]),
      })
    })
    .catch(error => console.error(error))
}

export default {
  target,
  complete,
}
