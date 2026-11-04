export interface BookmarkLink {
  type: 'link'
  name: string
  url: string
}

export interface BookmarkFolder {
  type: 'folder'
  name: string
  children: BookmarkNode[]
}

export type BookmarkNode = BookmarkLink | BookmarkFolder

const HTTP_URL = /^https?:\/\//i

export function parseBookmarkHtml(source: string): BookmarkNode[] {
  if (!source.includes('<DL')) {
    return []
  }

  const doc = new DOMParser().parseFromString(source, 'text/html')
  const root = doc.querySelector('dl')
  return root ? parseGroup(root) : []
}

export function countBookmarkLinks(nodes: BookmarkNode[]): number {
  return nodes.reduce((total, node) => total + (node.type === 'link' ? 1 : countBookmarkLinks(node.children)), 0)
}

function parseGroup(group: Element): BookmarkNode[] {
  const nodes: BookmarkNode[] = []

  for (const item of Array.from(group.children)) {
    if (item.tagName === 'DT') {
      const heading = item.querySelector(':scope > h3')
      if (heading) {
        const nested = item.querySelector(':scope > dl')
        nodes.push({
          type: 'folder',
          name: normalizeName(heading.textContent, '未命名文件夹'),
          children: nested ? parseGroup(nested) : [],
        })
        continue
      }

      const anchor = item.querySelector(':scope > a')
      if (anchor) {
        const url = anchor.getAttribute('href')?.trim() ?? ''
        if (HTTP_URL.test(url)) {
          nodes.push({
            type: 'link',
            name: normalizeName(anchor.textContent, url),
            url,
          })
        }
        continue
      }

      const nested = item.querySelector(':scope > dl')
      if (nested) {
        nodes.push(...parseGroup(nested))
      }
    } else if (item.tagName === 'DL') {
      nodes.push(...parseGroup(item))
    }
  }

  return nodes
}

function normalizeName(value: string | null, fallback: string) {
  return value?.replace(/\s+/g, ' ').trim() || fallback
}
