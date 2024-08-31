import engBaidu from './eng-baidu'
import engGoogle from './eng-google'
import engBing from './eng-bing'

const ENGINES = {
  Baidu: engBaidu,
  Google: engGoogle,
  Bing: engBing,
}

export type SearchEngine = keyof typeof ENGINES
function target(eng: SearchEngine, wd: string) {
  return ENGINES[eng].target(wd)
}

function complete(eng: SearchEngine, wd: string, callback: Function) {
  return ENGINES[eng].complete(wd, callback)
}

export default {
  target,
  complete,
}
