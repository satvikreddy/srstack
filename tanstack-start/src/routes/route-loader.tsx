import { Button } from '@/components/ui/button'
import { createServerFn_uiCallable } from '@/utils/serverFn.util'
import {
  createFileRoute,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'

const fetchTripsServerFn = createServerFn_uiCallable().handler(
  async ({ data }) => {
    console.log('fetchTripsServerFn called')

    await new Promise((resolve) => setTimeout(resolve, 2000))

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
  },
)

export const Route = createFileRoute('/route-loader')({
  loader: async () => {
    console.log(`loader called`)
    return fetchTripsServerFn()
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { trips } = Route.useLoaderData()
  const router = useRouter()

  const isFetchingData = useRouterState({
    select: (s) =>
      s.matches.some((match) => match.routeId === Route.id && match.isFetching),
  })

  return (
    <div className="space-y-4 p-4">
      <div className="text-sm">
        loader is called
        <div>
          - on server during SSR (i.e. when route is directly opened in browser)
        </div>
        <div>- on client during client navigation</div>
        <div>- on client if router.invalidate</div>
        if loader throw error, it is shown in UI
      </div>
      <hr></hr>
      {isFetchingData && <div>Fetching data...</div>}
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
          router.invalidate()
        }}
      >
        Update trip (router.invalidate)
      </Button>
    </div>
  )
}
