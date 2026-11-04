<template>
  <div class="mx-auto flex min-h-0 w-full max-w-[860px] flex-1 flex-col py-6">
    <header class="mb-5 flex shrink-0 flex-wrap items-baseline justify-between gap-2">
      <h1 class="text-22px font-medium">
        收藏
      </h1>
      <span v-if="savedAtText" class="text-13px op-50">
        缓存于 {{ savedAtText }}
      </span>
    </header>

    <section class="shrink-0 rounded-lg bg-c_bg_navigation p-4">
      <div class="flex flex-wrap items-center gap-3">
        <input
          v-model="passphrase"
          type="text"
          placeholder="输入口令"
          class="h-9 min-w-[160px] flex-1 rounded-md border border-gray-600 bg-c_bg_input px-3 text-14px outline-none focus:border-blue-500"
          @keydown.enter="handleDownloadClick"
        >

        <button
          class="h-9 rounded-md bg-blue-600 px-4 text-14px text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:op-50"
          :disabled="uploading"
          @click="handleUploadClick"
        >
          {{ uploading ? '上传中…' : '上传数据' }}
        </button>

        <button
          class="h-9 rounded-md bg-blue-600 px-4 text-14px text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:op-50"
          :disabled="downloading"
          @click="handleDownloadClick"
        >
          {{ downloading ? '下载中…' : '下载数据' }}
        </button>
      </div>

      <p v-if="status" class="mt-3 text-13px" :class="status.kind === 'ok' ? 'text-green-400' : 'text-red-400'">
        {{ status.text }}
      </p>
    </section>

    <section class="mt-4 flex h-[440px] flex-col overflow-hidden rounded-lg bg-c_bg_navigation">
      <div class="flex shrink-0 items-center justify-between border-b border-white/8 px-4 py-2.5 text-13px op-60">
        <span>收藏夹</span>
        <span v-if="linkCount">{{ linkCount }} 个链接</span>
      </div>

      <div v-if="rows.length" class="min-h-0 flex-1 overflow-y-auto p-1.5">
        <template v-for="row in rows" :key="row.key">
          <button
            v-if="row.kind === 'folder'"
            class="flex h-8 w-full items-center gap-1.5 rounded-md bg-transparent text-left text-14px transition-colors"
            :class="{ 'cursor-pointer hover:bg-white/5': row.hasChildren }"
            :style="{ paddingLeft: `${8 + row.depth * 16}px` }"
            @click="toggleFolder(row)"
          >
            <div
              v-if="row.hasChildren"
              class="i-mdi:chevron-right shrink-0 text-18px op-50 transition-transform"
              :class="{ 'rotate-90': row.expanded }"
            />
            <div v-else class="w-18px shrink-0" />
            <div :class="row.expanded ? 'i-mdi:folder-open' : 'i-mdi:folder'" class="shrink-0 text-16px op-70" />
            <span class="truncate">{{ row.name }}</span>
          </button>

          <a
            v-else
            :href="row.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex h-8 items-center gap-1.5 rounded-md text-14px transition-colors hover:bg-white/5"
            :style="{ paddingLeft: `${32 + row.depth * 16}px`, paddingRight: '8px' }"
          >
            <div class="i-mdi:link-variant shrink-0 text-15px op-30" />
            <span class="truncate group-hover:text-c_highlight">{{ row.name }}</span>
            <span class="ml-auto shrink-0 pl-3 text-12px op-30">{{ row.host }}</span>
          </a>
        </template>
      </div>

      <div v-else-if="html" class="min-h-0 flex-1 overflow-y-auto p-4">
        <p class="mb-3 text-13px op-50">
          未识别出收藏链接，以下是云端保存的原始内容：
        </p>
        <pre class="whitespace-pre-wrap break-all text-12px op-80">{{ html }}</pre>
      </div>

      <div v-else class="flex flex-1 items-center justify-center text-14px op-40">
        暂无收藏备份，点击「下载数据」从云端获取。
      </div>
    </section>

    <input
      ref="fileInputRef"
      type="file"
      accept=".html,.htm,text/html"
      class="hidden"
      @change="handleFileChange"
    >
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSettingStore } from '~/store/setting'
import { fetchBookmarkHtml, pushBookmarkHtml } from '~/utils/api'
import { countBookmarkLinks, parseBookmarkHtml, type BookmarkNode } from '~/utils/bookmark-html'

const CACHE_KEY = 'bookmark_html_cache'

type Row = {
  key: string
  kind: 'folder' | 'link'
  name: string
  url: string
  host: string
  depth: number
  expanded?: boolean
  hasChildren?: boolean
}

type Status = {
  kind: 'ok' | 'error'
  text: string
}

const settingStore = useSettingStore()
const passphrase = ref('')
const fileInputRef = ref<HTMLInputElement>()
const html = ref('')
const savedAt = ref(0)
const uploading = ref(false)
const downloading = ref(false)
const status = ref<Status | null>(null)
const expandedKeys = ref<Set<string>>(new Set())

const tree = computed(() => (html.value ? parseBookmarkHtml(html.value) : []))
const rows = computed(() => {
  const result: Row[] = []
  appendRows(tree.value, 0, 'root', result)
  return result
})
const linkCount = computed(() => countBookmarkLinks(tree.value))
const savedAtText = computed(() => (savedAt.value ? new Date(savedAt.value).toLocaleString('zh-CN', { hour12: false }) : ''))

function appendRows(nodes: BookmarkNode[], depth: number, parentKey: string, result: Row[]) {
  nodes.forEach((node, index) => {
    const key = `${parentKey}.${index}`

    if (node.type === 'folder') {
      const expanded = expandedKeys.value.has(key)
      result.push({
        key,
        kind: 'folder',
        name: node.name,
        url: '',
        host: '',
        depth,
        expanded,
        hasChildren: node.children.length > 0,
      })

      if (expanded) {
        appendRows(node.children, depth + 1, key, result)
      }
      return
    }

    result.push({ key, kind: 'link', name: node.name, url: node.url, host: getHost(node.url), depth })
  })
}

function toggleFolder(row: Row) {
  if (!row.hasChildren) {
    return
  }

  const next = new Set(expandedKeys.value)
  if (next.has(row.key)) {
    next.delete(row.key)
  } else {
    next.add(row.key)
  }
  expandedKeys.value = next
}

function getHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) {
      return
    }

    const parsed = JSON.parse(raw) as { html?: string; savedAt?: number }
    if (typeof parsed.html === 'string') {
      html.value = parsed.html
    }
    if (typeof parsed.savedAt === 'number') {
      savedAt.value = parsed.savedAt
    }
  } catch {
    // 缓存损坏时按空数据处理
  }
}

function writeCache(content: string) {
  html.value = content
  savedAt.value = Date.now()
  expandedKeys.value = new Set()

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ html: content, savedAt: savedAt.value }))
    return true
  } catch {
    return false
  }
}

async function hashPassphrase(value: string) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('当前环境不支持口令加密，请使用 HTTPS 访问')
  }

  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return btoa(String.fromCharCode(...new Uint8Array(digest))).substring(0, 12)
}

async function resolvePassphraseHash() {
  const value = passphrase.value.trim()
  if (value) {
    const hash = await hashPassphrase(value)
    settingStore.passphrase = hash
    return hash
  }

  if (settingStore.isSynchronization && settingStore.passphrase) {
    return settingStore.passphrase
  }

  status.value = { kind: 'error', text: '请先输入口令' }
  return null
}

function handleUploadClick() {
  status.value = null
  if (!passphrase.value.trim() && !(settingStore.isSynchronization && settingStore.passphrase)) {
    status.value = { kind: 'error', text: '请先输入口令' }
    return
  }

  fileInputRef.value?.click()
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) {
    return
  }

  uploading.value = true
  status.value = null

  try {
    const content = await file.text()
    if (!content.includes('NETSCAPE-Bookmark-file')) {
      status.value = { kind: 'error', text: '不是浏览器导出的收藏 HTML 文件' }
      return
    }

    const hash = await resolvePassphraseHash()
    if (!hash) {
      return
    }

    await pushBookmarkHtml(hash, content)
    settingStore.isSynchronization = true
    const cached = writeCache(content)
    status.value = {
      kind: 'ok',
      text: cached ? '上传成功，已更新本地缓存' : '上传成功，但本地缓存失败（文件过大）',
    }
  } catch (error) {
    console.error('上传收藏失败：', error)
    const reason = error instanceof Error && error.message.includes('HTTPS') ? error.message : '上传失败，请稍后重试'
    status.value = { kind: 'error', text: reason }
  } finally {
    uploading.value = false
  }
}

async function handleDownloadClick() {
  if (downloading.value) {
    return
  }

  downloading.value = true
  status.value = null

  try {
    const hash = await resolvePassphraseHash()
    if (!hash) {
      return
    }

    const content = await fetchBookmarkHtml(hash)
    if (content === null) {
      status.value = { kind: 'error', text: '云端暂无数据' }
      return
    }

    settingStore.isSynchronization = true
    const cached = writeCache(content)
    status.value = {
      kind: 'ok',
      text: cached ? '下载成功，已更新本地缓存' : '下载成功，但本地缓存失败（文件过大）',
    }
  } catch (error) {
    console.error('下载收藏失败：', error)
    const reason = error instanceof Error && error.message.includes('HTTPS') ? error.message : '下载失败，请稍后重试'
    status.value = { kind: 'error', text: reason }
  } finally {
    downloading.value = false
  }
}

onMounted(readCache)
</script>
