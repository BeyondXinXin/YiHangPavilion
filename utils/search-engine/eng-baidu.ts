import fetchJsonp from 'fetch-jsonp'

function objToQuery(obj: { [key: string]: any }): string {
  const queryString = Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')

  return queryString
}

function target(wd: string) {
  return `https://www.baidu.com/s?wd=${encodeURIComponent(wd)}`
}

function complete(wd: string, callback: Function) {
  const query = objToQuery({ prod: 'wise', wd })
  fetchJsonp(`https://www.baidu.com/sugrec?${query}`)
    .then(res => res.json())
    .then((data) => {
      callback({
        eng: 'baidu',
        wd: data.q,
        list: data.g
          ? data.g.map((g: any) => g.q)
          : [],
      })
    })
    .catch(error => console.error(error))
}

export default {
  target,
  complete,
}
