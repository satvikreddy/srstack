import {
  AppForm,
  AppFormSubmitButton,
  AppFormSubscribe,
} from '@/components/form/app-form'
import { PriceField } from '@/components/form/price-field'
import { SwitchField } from '@/components/form/switch-field'
import { TextField } from '@/components/form/text-field'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/form')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      name: '',
      salary: null,
      isRequired: false,
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value))
    },
  })

  return (
    <div>
      <AppForm className="flex-1 space-y-4 overflow-y-auto pb-20" form={form}>
        <form.Field name="superOrgId">
          {(field) => <TextField field={field} label="Name" />}
        </form.Field>
        <form.Field name="isRequired">
          {(field) => <SwitchField field={field} label="Mandatory" />}
        </form.Field>
        <form.Field name="salary">
          {(field) => <PriceField field={field} label="Salary" />}
        </form.Field>
      </AppForm>

      <AppFormSubscribe
        form={form}
        children={({ isSubmitDisabled, isTouched }) => (
          <AppFormSubmitButton
            label="Save"
            isSubmitDisabled={isSubmitDisabled}
            isTouched={isTouched}
            onClick={() => form.handleSubmit()}
          />
        )}
      />
    </div>
  )
}
