export const documentByPath = import.meta.glob<unknown>('./post/*.md', {
  eager: true,
  import: 'default',
})

export const frontmatterByPath = import.meta.glob<unknown>('./post/*.md', {
  eager: true,
  import: 'frontmatter',
})
