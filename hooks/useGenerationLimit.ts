"use client"

import { useCallback, useMemo, useSyncExternalStore } from "react"
import { FEATURES } from "@/lib/config/features"

const STORAGE_KEY = "salarydaddy_free_generations_v1"

type Stored = {
  count: number
  dayKey?: string
  hourKey?: string
}

/** Stable reference — required for useSyncExternalStore server snapshot & unlimited tier */
const EMPTY_SNAPSHOT: Stored = { count: 0 }

function getStore(): Storage | null {
  if (typeof window === "undefined") return null
  return FEATURES.freeTier.resetPeriod === "session"
    ? sessionStorage
    : localStorage
}

function readStored(): Stored {
  const store = getStore()
  if (!store) return EMPTY_SNAPSHOT
  try {
    const raw = store.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_SNAPSHOT
    return JSON.parse(raw) as Stored
  } catch {
    return EMPTY_SNAPSHOT
  }
}

function getDayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function getHourKey(): string {
  return new Date().toISOString().slice(0, 13)
}

function normalizeStored(data: Stored): Stored {
  const limit = FEATURES.freeTier.generationLimit
  const reset = FEATURES.freeTier.resetPeriod

  if (limit === null) return EMPTY_SNAPSHOT

  if (reset === "daily") {
    const today = getDayKey()
    if (data.dayKey !== today) return { count: 0, dayKey: today }
    return { count: data.count, dayKey: data.dayKey ?? today }
  }

  if (reset === "hourly") {
    const hour = getHourKey()
    if (data.hourKey !== hour) return { count: 0, hourKey: hour }
    return { count: data.count, hourKey: data.hourKey ?? hour }
  }

  return { count: data.count }
}

function storedEqual(a: Stored, b: Stored): boolean {
  return a.count === b.count && a.dayKey === b.dayKey && a.hourKey === b.hourKey
}

let clientSnapshotCache: Stored = EMPTY_SNAPSHOT

function getSnapshot(): Stored {
  const next = normalizeStored(readStored())
  if (storedEqual(next, clientSnapshotCache)) {
    return clientSnapshotCache
  }
  clientSnapshotCache = next
  return clientSnapshotCache
}

function getServerSnapshot(): Stored {
  return EMPTY_SNAPSHOT
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) callback()
  }
  window.addEventListener("storage", onStorage)
  window.addEventListener("salarydaddy-gen-limit", callback)
  return () => {
    window.removeEventListener("storage", onStorage)
    window.removeEventListener("salarydaddy-gen-limit", callback)
  }
}

export function useGenerationLimit() {
  const limit = FEATURES.freeTier.generationLimit

  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const normalized = useMemo(() => normalizeStored(stored), [stored])

  const remaining =
    limit === null ? null : Math.max(0, limit - normalized.count)

  const hasReachedLimit = limit !== null && normalized.count >= limit

  const increment = useCallback(() => {
    if (limit === null) return
    const store = getStore()
    if (!store) return

    const current = normalizeStored(readStored())
    const next: Stored =
      FEATURES.freeTier.resetPeriod === "daily"
        ? { count: current.count + 1, dayKey: getDayKey() }
        : FEATURES.freeTier.resetPeriod === "hourly"
          ? { count: current.count + 1, hourKey: getHourKey() }
        : { count: current.count + 1 }

    store.setItem(STORAGE_KEY, JSON.stringify(next))
    clientSnapshotCache = next
    window.dispatchEvent(new Event("salarydaddy-gen-limit"))
  }, [limit])

  return { remaining, increment, hasReachedLimit, used: normalized.count, limit }
}
