const API_URL = 'https://api.beyondxin.top/api/yihang/data'

function createApiUrl(passphrase: string) {
  const url = new URL(API_URL)
  url.searchParams.set('passphrase', passphrase)
  return url
}

export async function pushBookmarkHtml(passphrase: string, html: string): Promise<void> {
  const response = await fetch(createApiUrl(passphrase), {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
    body: html,
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }
}

export async function fetchBookmarkHtml(passphrase: string): Promise<string | null> {
  const response = await fetch(createApiUrl(passphrase), { cache: 'no-store' })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(await response.text())
  }

  const html = await response.text()
  return html || null
}
