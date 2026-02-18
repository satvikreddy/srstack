import { Button } from '@/components/ui/button'
import { logEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { ReactFormExtendedApi } from '@tanstack/react-form'

type AppFormProps<TFormData> = {
  className?: string
  form: ReactFormExtendedApi<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >
  children: React.ReactNode
}

export const AppForm = <TFormData,>({
  className,
  form,
  children,
}: AppFormProps<TFormData>) => {
  return (
    <form
      className={cn('flex-1 space-y-4 overflow-y-auto pb-20', className)}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
    >
      {children}
    </form>
  )
}

type AppFormSubscribeProps<TFormData> = {
  form: ReactFormExtendedApi<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >
  children: (args: { isSubmitDisabled: boolean }) => React.ReactNode
}

export const AppFormSubscribe = <TFormData,>({
  form,
  children,
}: AppFormSubscribeProps<TFormData>) => {
  return (
    <form.Subscribe
      selector={(state: any) => [
        state.canSubmit,
        state.isSubmitting,
        state.isPristine,
      ]}
      children={([canSubmit, isSubmitting, isPristine]) =>
        children({
          isSubmitDisabled: isPristine || !canSubmit || isSubmitting,
        })
      }
    />
  )
}

export const AppFormSubmitButton = (props: {
  label: string
  isSubmitDisabled: boolean
  onClick: () => void
}) => {
  return (
    <Button
      type="submit"
      variant="outline"
      onClick={() => {
        logEvent({
          event: 'form_submit_button_clicked',
          data: {
            buttonLabel: props.label,
          },
        })
        props.onClick()
      }}
    >
      {props.label}
    </Button>
  )
}
