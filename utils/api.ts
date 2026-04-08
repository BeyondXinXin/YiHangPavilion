import { useBookmarkStore } from '~/store/bookmarks'
import { useSettingStore } from '~/store/setting'
import type { Domain } from '~/utils/types'

const API_URL = 'https://api.beyondxin.top/api/yihang/data'

function createApiUrl(passphrase: string) {
  const url = new URL(API_URL)
  url.searchParams.set('passphrase', passphrase)
  return url
}

async function parseError(response: Response) {
  try {
    return await response.text()
  } catch {
    return response.statusText
  }
}

export async function pushDataToServer() {
  const bookmarkStore = useBookmarkStore()
  const settingStore = useSettingStore()

  try {
    const response = await fetch(createApiUrl(settingStore.passphrase), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookmarkStore.customData),
    })

    if (!response.ok) {
      throw new Error(await parseError(response))
    }
  } catch (error) {
    console.error('Error pushing data to server:', error)
  }
}

export async function retrieveDataFromServer() {
  const bookmarkStore = useBookmarkStore()
  const settingStore = useSettingStore()

  try {
    const response = await fetch(createApiUrl(settingStore.passphrase))

    if (!response.ok) {
      throw new Error(await parseError(response))
    }

    const data = await response.json() as Domain[]
    bookmarkStore.customData = data
  } catch (error) {
    console.error('Error retrieving data from server:', error)
  }
}
