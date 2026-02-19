import { createFileRoute } from '@tanstack/react-router'
import { useAction, useMutation, useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/convex')({
  component: RouteComponent,
})

function RouteComponent() {
  const todos = useQuery(api.todo.list)
  const create = useMutation(api.todo.create)
  const createRandom = useAction(api.todo.createRandomAction)

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2">
        <Button onClick={() => create({ text: 'New item' })}>Add Item</Button>
        <Button variant="outline" onClick={() => createRandom()}>
          Add Random
        </Button>
      </div>
      <ul className="list-disc list-inside space-y-1">
        {todos?.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}
