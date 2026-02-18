import AppButton from '@/components/app-button'
import { createServerFn_uiCallable } from '@/utils/serverFn.util'
import { createFileRoute } from '@tanstack/react-router'

const serverFn = createServerFn_uiCallable().handler(async () => {
  throw new Error('Data not found in DB')
})

export const Route = createFileRoute('/error')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4">
      <div className="text-sm">
        <div>logEvent for button_click on client</div>
        <div>logError for error_function_unknown on server</div>
      </div>
      <AppButton
        label="Server Fn Error"
        onClick={async () => {
          await serverFn()
        }}
      />
    </div>
  )
}
