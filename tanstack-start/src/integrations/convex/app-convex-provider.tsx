import { ConvexProvider } from 'convex/react'
import { convex } from './convex'

export function AppConvexProvider({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
