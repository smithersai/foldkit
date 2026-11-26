export const persistedTodoCases: ReadonlyArray<
  ReadonlyArray<{
    readonly id: string
    readonly text: string
    readonly completed: boolean
    readonly createdAt: number
  }>
> = [
  [],
  [
    {
      id: 'one',
      text: 'Write "notes"\ncarefully',
      completed: false,
      createdAt: 0,
    },
  ],
  [{ id: 'done', text: '', completed: true, createdAt: 42 }],
]
