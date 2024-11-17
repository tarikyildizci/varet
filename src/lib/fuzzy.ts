type FuzzyResult<T> = {
  item: T
  score: number
}

function fuzzy<T>(
  items: T[],
  query: string,
  getKey: (item: T) => string = (item) => item as unknown as string,
): FuzzyResult<T>[] {
  const results: FuzzyResult<T>[] = []

  for (const item of items) {
    const key = getKey(item).toLowerCase()
    const score = calculateFuzzyScore(key, query.toLowerCase())
    if (score > 0) {
      results.push({ item, score })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

function calculateFuzzyScore(text: string, query: string): number {
  let score = 0
  let textIndex = 0
  let queryIndex = 0

  while (textIndex < text.length && queryIndex < query.length) {
    if (text[textIndex] === query[queryIndex]) {
      score += 1 // Match found
      queryIndex++
    }
    textIndex++
  }

  // If all query characters were matched, calculate score
  if (queryIndex === query.length) {
    score += query.length * 2 // Bonus for complete query match
  } else {
    score = 0 // No match
  }

  return score
}

export default fuzzy
