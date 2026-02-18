import { createFileRoute, useRouter } from '@tanstack/react-router'

const fetchTrips = async () => {
  // wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log('fetchTrips called')

  const seed1 = Math.round(Math.random() * 100)
  const seed2 = Math.round(Math.random() * 100)
  const seed3 = Math.round(Math.random() * 100)

  return {
    trips: [
      { id: 1, name: 'Trip 1', seed: seed1 },
      { id: 2, name: 'Trip 2', seed: seed2 },
      { id: 3, name: 'Trip 3', seed: seed3 },
    ],
  }
}

export const Route = createFileRoute('/route-pendingComponent')({
  loader: async () => {
    return fetchTrips()
  },
  pendingComponent: () => <div>Loading...</div>,
  pendingMs: 100,
  component: RouteComponent,
})

function RouteComponent() {
  const { trips } = Route.useLoaderData()
  const router = useRouter()

  return (
    <div className="space-y-4 p-4">
      <div>
        pendingComponent is shown
        <div>- if loader took more than pendingMs during client navigation</div>
      </div>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id + trip.seed}>
            {trip.name} {trip.seed}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          router.invalidate()
        }}
      >
        Update trip
      </button>
    </div>
  )
}
