

export function sortByTimestamp(docs, direction = 'asc') {
  return docs.sort((a, b) => {
    const t1 = a.timestamp?.toMillis?.() || a.timestamp || 0
    const t2 = b.timestamp?.toMillis?.() || b.timestamp || 0
    return direction === 'desc' ? t2 - t1 : t1 - t2
  })
}