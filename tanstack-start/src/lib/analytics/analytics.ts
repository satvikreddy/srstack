import { isServer } from '@/utils/env.util'

export async function logEvent(opts: LogEventArgs<EventName>) {
  if (isServer()) {
    const { logEventServer } = await import('./analytics.server')
    return logEventServer(opts)
  } else {
    const { logEventClient } = await import('./analytics.client')
    return logEventClient(opts)
  }
}

export async function logError(opts: LogErrorArgs<ErrorName>) {
  if (isServer()) {
    const { logErrorServer } = await import('./analytics.server')
    return logErrorServer(opts)
  } else {
    const { logErrorClient } = await import('./analytics.client')
    return logErrorClient(opts)
  }
}
