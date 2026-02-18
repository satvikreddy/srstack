import {
  AppForm,
  AppFormSubmitButton,
  AppFormSubscribe,
} from '@/components/form/app-form'
import { SwitchField } from '@/components/form/switch-field'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/form')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      isRequired: false,
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value))
    },
  })

  return (
    <div>
      <AppForm className="flex-1 space-y-4 overflow-y-auto pb-20" form={form}>
        <form.Field name="isRequired">
          {(field) => <SwitchField field={field} label="Mandatory" />}
        </form.Field>
      </AppForm>

      <AppFormSubscribe
        form={form}
        children={({ isSubmitDisabled }) => (
          <AppFormSubmitButton
            label="Save"
            isSubmitDisabled={isSubmitDisabled}
            onClick={() => form.handleSubmit()}
          />
        )}
      />
    </div>
  )
}
