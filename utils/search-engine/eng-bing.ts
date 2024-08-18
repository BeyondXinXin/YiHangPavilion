import fetchJsonp from 'fetch-jsonp'

function objToQuery(obj: { [key: string]: any }): string {
  const queryString = Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')

  return queryString
}

function target(wd: string) {
  return `https://www.bing.com/search?mkt=zh-cn&q=${encodeURIComponent(wd)}`
}

function complete(wd: string, callback: Function) {
  const query = objToQuery({ type: 'cb', q: wd })
  fetchJsonp(`https://api.bing.com/qsonhs.aspx?${query}`, {
    jsonpCallback: 'cb',
  })
    .then(res => res.json())
    .then((data) => {
      const asRes = data.AS.Results
      let list
      if (!asRes) {
        list = []
      }
      else {
        list = asRes.map((r: any) => r.Suggests)
          .reduce(
            (sa1: any, sa2: any) => sa1.concat(sa2),
            [],
          )
          .sort(
            (s1: any, s2: any) => (s1.Sk > s2.Sk) ? 1 : -1,
          )
          .map((s: any) => s.Txt)
      }

      callback({
        eng: 'bing',
        wd: data.AS.Query,
        list,
      })
    })
    .catch(error => console.error(error))
}

export default {
  target,
  complete,
}
