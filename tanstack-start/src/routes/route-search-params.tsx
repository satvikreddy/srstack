import { Button } from '@/components/ui/button'
import { createFileRoute, useRouter } from '@tanstack/react-router'

const fetchTrips = async ({ type }: { type: string }) => {
  console.log(`fetchTrips called for ${type}`)

  // wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const random = String(Math.round(Math.random() * 100))

  return {
    trips: [
      { id: 1, name: 'Trip 1', seed: type },
      { id: 2, name: 'Trip 2', seed: type },
      { id: 3, name: 'Trip 3', seed: random },
    ],
  }
}

export const Route = createFileRoute('/route-search-params')({
  validateSearch: (search) => ({
    type: search.type ?? 'self',
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    return fetchTrips({
      type: deps.type as 'self' | 'market',
    })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { trips } = Route.useLoaderData()
  const router = useRouter()

  return (
    <div className="space-y-4 p-4">
      <div>Search params and loader data caching.</div>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id + trip.seed}>
            {trip.name} {trip.seed}
          </li>
        ))}
      </ul>
      <Button
        variant="outline"
        onClick={() => {
          router.navigate({
            to: '/route-search-params',
            search: {
              type: 'self',
            },
          })
        }}
      >
        Self trips
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          router.navigate({
            to: '/route-search-params',
            search: {
              type: 'market',
            },
          })
        }}
      >
        Market trips
      </Button>
    </div>
  )
}
